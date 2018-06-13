---
title: Neural Machine Translation
category: Draft
date: 2018-06-13
sidebar: auto
---


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">


&nbsp;

# Neural Machine Translation
이 글은 최고 수준([state-of-the-art](https://en.wikipedia.org/wiki/State_of_the_art))의 NMT 모델을 만들기 까지의 과정을 차례대로 짚어보는 것을 목표로 합니다.


#### Neural Machine Translation(NMT)이 무엇이고 왜 사용하나요?
[NMT](https://en.wikipedia.org/wiki/Neural_machine_translation)는 [인공 신경망](https://en.wikipedia.org/wiki/Artificial_neural_network)을 사용해서 [기계 번역](https://en.wikipedia.org/wiki/Machine_translation)을 하는 방법 입니다. 자연어는 너무나 다양한 변형과 예외가 있어 [규칙 기반](https://en.wikipedia.org/wiki/Machine_translation#Rule-based)으로 처리하는 데 한계가 있고, 이후 등장한 [SMT(Statistical Machine Translation)](https://en.wikipedia.org/wiki/Statistical_machine_translation#Challenges_with_statistical_machine_translation)는 문장 구조가 다른 언어간의 번역이 어렵고, [OOV(Out Of Vocabulary)](https://en.wikipedia.org/wiki/Statistical_machine_translation#Out_of_vocabulary_(OOV)_words)등의 문제가 있었습니다. NMT는 이러한 문제들을 어느 정도 완화하며 기존의 방식들을 뛰어넘는 성능을 보여줍니다.


## Step by Step NMT
우리가 하고 싶은 일은 source 언어로 된 문장인 $x$ 를 입력으로 주면 $x$와 같은 의미를 갖는 target 언어로 된 문장 $y$를 출력하는 시스템을 만드는 일입니다. 이를 위해 먼저 NMT에 사용되는 주요 개념들을 알아본 후 대표적인 모델들을 살펴보도록 하겠습니다.


### Tokenization
가장 먼저 해야 할 일은 자연어 문장을 기계가 계산할 수 있는 형태로 바꾸는 일입니다. 가장 단순한 방법 중 하나는 [one-hot encoding](https://developers.google.com/machine-learning/crash-course/glossary#one-hot_encoding)을 사용하는 것입니다. 이 때 vocabulary 크기를 합리적인 수준으로 만들고, OOV를 줄이기 위해 문장을 적절한 토큰 단위로 쪼개는 작업이 필요합니다.

단순히 공백을 기준으로 토큰을 나눈다면 단어의 변형(복수형, 시제, 한국어의 조사 등)들이 모두 고유한 토큰이 되어 vocabulary 크기가 지나치게 커집니다(=계산량 증가). 문자 단위로 토큰을 나누는 경우 vocabulary 크기도 작고 OOV 문제도 없겠지만, 토큰들이 고유한 의미를 갖지 못하므로 모호성이 문제가 됩니다.

최근 NMT에서 좋은 성능을 보이고 있는 방법은 고정된 vocabulary 크기의 sub-word 단위로 토큰을 만드는 것입니다. ([Sennrich et al. (2016)](http://www.aclweb.org/anthology/P16-1162), [Kudo. (2018)](https://arxiv.org/pdf/1804.10959.pdf))


### Encoder-Decoder Architecture
전처리가 끝났으면 이제 모델을 만들 차례입니다. 우리는 사람이 문장을 읽고, 이해하고, 번역하는 과정을 따라하기 위해 encoder와 decoder를 사용할 것입니다.

<center><img src="/images/nmt/encdec.jpg" width="80%" /></center>
<center>그림 1. Encoder-decoder architecture (<a href="https://www.tensorflow.org/tutorials/seq2seq#background_on_neural_machine_translation">Neural Machine Translation (seq2seq) Tutorial</a>)</center>



#### Encoder
Encoder는 sequence $x$를 입력으로 받고 code $z$를 출력으로 내보냅니다. (문장을 읽고 이해하기)  
$z$는 $x$의 정보를 함축하고 있는 고정 길이 벡터가 됩니다. (문장의 의미)


#### Decoder
Decoder는 code $z$를 입력으로 받고 sequence $y$를 출력으로 내보냅니다. (이해한 내용을 바탕으로 번역문 만들기)


#### RNN
Encoder와 decoder는 다양한 형태의 신경망 조각일 수 있지만 다음과 같은 이유로 단순한 [fully connected layer (dense layer)](https://developers.google.com/machine-learning/crash-course/glossary#fully_connected_layer)는 encoder와 decoder로 사용하기에 적합하지 않습니다.
1. 문장의 각 요소가 서로 영향을 받는다.
2. 문장이 가변 길이이다.

이러한 문제를 해결하고 sequence형태의 데이터를 처리하기 위해 RNN이 적절한 선택일 수 있습니다. (RNN과 LSTM에 관해서는 이 [아름다운 글](http://colah.github.io/posts/2015-08-Understanding-LSTMs/)을 읽어보세요)


#### Beam Search
RNN decoder의 출력은 [softmax](https://developers.google.com/machine-learning/crash-course/glossary#softmax)를 거쳐서 각 timestep $t$에서 $y_t$가 될 수 있는 토큰들의 확률 분포가 됩니다. 이제 우리는 최적의 문장을 완성하기 위한 토큰을 선택할 알고리즘이 필요합니다. 여기서 최적의 문장은 source 문장이 $(x_1, ... , x_T)$일 때 $p(y_1, ..., y_{T'}|x_1, ... , x_T)$가 최대인 target 문장 $(y_1, ... , y_{T'})$을 말합니다.

위 문제는 깊이가 $T'$이고 각 노드에서 vocab size $n$만큼 분기하는 탐색 트리에서 가중치(토큰이 등장할 확률)의 곱이 가장 큰 경로를 찾는 문제가 됩니다. 탐색 범위가 $n^{T'}$으로 매우 크기 때문에 탐욕적인 방법으로 탐색을 하는 것이 바람직해 보입니다.

가장 단순한 방법은 각 timestep에서 가장 높은 확률을 가진(argmax) 토큰을 뽑아 문장을 완성하는 방법이고, 이걸 greedy search라고 합니다.

<center><img src="/images/nmt/greedy.jpg" width="50%" /></center>
<center>그림 2. Greedy decoding (<a href="https://www.tensorflow.org/tutorials/seq2seq#inference_%E2%80%93_how_to_generate_translations">Neural Machine Translation (seq2seq) Tutorial</a>)</center>

더 높은 품질을 얻고 싶다면 [beam search](https://en.wikipedia.org/wiki/Beam_search)를 사용하게 됩니다. Beam search는 beam size $B$개의 후보를 유지하며 최적의 경로를 탐색하는 알고리즘 입니다. NMT에서 Beam search는 다음과 같이 동작합니다.


1. $p(y_t|x, y_1, ... , y_{t-1})$가 높은 순서대로 $B$개의 노드(토큰)를 선택합니다.
2. 선택한 노드로부터 가지를 뻗어나가 다시 $p(y_{t+1}|x, y_1, ... , y_t)$가 높은 $B$개의 토큰을 선택하고 유망하지 않은 경로는 탐색에서 제외합니다..
3. 2번 과정을 반복하면 마지막에 $B$개의 경로(문장)가 완성되며 이 중에서 가장 높은 확률을 갖는 문장을 최종적으로 출력합니다.

[이 영상](https://coursera.org/learn/nlp-sequence-models/lecture/4EtHZ/beam-search)에서 더 자세한 설명을 보실 수 있습니다.


## Models
이제 대표적인 NMT 모델들을 살펴보겠습니다.


### LSTM
이 장에서는 [Sutskever et al. (2014)](https://arxiv.org/pdf/1409.3215.pdf)에서 제안한 모델을 소개합니다.

처음 소개할 모델은 일반적인 RNN을 사용한 sequence to sequence 모델 입니다. encoder와 decoder로 LSTM을 사용한 이 모델의 목표는 input sentence가 $(x_1, ... , x_T)$이고, outpu sentence가 $(y_1, ... , y_{T'})$일 때 조건부 확률 $p(y_1, ... , y_{T'}|x_1, ... , x_T)$를 구하는 것입니다.

모델의 구조는 다음과 같습니다.

<center></center>
<center><img src="/images/nmt/seq2seq.png" width="80%" /></center>
<center>그림 3. "ABC"를 입력받아 "WXYZ"를 출력하는 예시 (<a href="https://arxiv.org/pdf/1409.3215.pdf">Sutskever et al. 2014</a>)</center>

'\<EOS\>'는 문장의 끝(end of sentence)을 구분하기 위해 사용하는 토큰입니다. '\<EOS\>'토큰을 사용으로 가변 길이의 문장을 처리할 수 있게 됩니다.

'\<EOS\>'토큰이 입력되기 직전까지가 encoder 입니다. encoder는 source 토큰 $x_t$와 이전 timestep의 hidden state $h_{t-1}$을 입력으로 받아 새로운 hidden state $h_t$를 출력합니다. encoder의 마지막 hidden state $h_T$가 바로 source 문장의 의미를 함축한 $z$ 입니다.

'\<EOS\>'토큰이 입력되는 부분 부터가 decoder 입니다. decoder는 이전 timestep의 target 토큰 $y_{t'-1}$과 이전 timestep의 hidden state $h_{t'-1}$를 입력으로 받아 target 토큰 $y_{t'}$를 출력합니다. decoder의 초기 hidden state는 $z$이고, '\<EOS\>'토큰을 출력하면 종료합니다.

논문에서는 deep LSTMs가 shallow LSTMs보다 뛰어난 성능을 보이기 때문에 4개의 LSTM layer를 사용했고, 입력 문장의 토큰 순서를 뒤집어서 성능을 향상시켰다고 합니다.


### Bidirectional RNN + Attention Mechanism
이 장에서는 [Bahdanau et al. (2014)](https://arxiv.org/pdf/1409.0473.pdf)에서 제안한 모델을 소개합니다.

TODO...

### Transformer
이 장에서는 [Vaswani et al. (2017)](https://arxiv.org/pdf/1706.03762.pdf)에서 제안한 모델을 소개합니다.

TODO...


## References
1. Sequence to Sequence Learning with Neural Networks [[pdf]](https://arxiv.org/pdf/1409.3215.pdf)  
   Ilya Sutskever, Oriol Vinyals, Quoc V. Le, 2014. [arXiv:1409.3215](https://arxiv.org/abs/1409.3215).
2. Neural Machine Translation by Jointly Learning to Align and Translate [[pdf]](https://arxiv.org/pdf/1409.0473.pdf)  
   Dzmitry Bahdanau, Kyunghyun Cho, Yoshua Bengio, 2014. [arXiv:1409.0473](https://arxiv.org/abs/1409.0473).
3. Attention is All You Need [[pdf]](https://arxiv.org/pdf/1706.03762.pdf)  
   Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin, 2017. [arXiv:1706.03762](https://arxiv.org/abs/1706.03762).
4. Neural Machine Translation (seq2seq) Tutorial [[link]](https://www.tensorflow.org/tutorials/seq2seq)[[github]](https://github.com/tensorflow/nmt/)  
   Thang Luong, Eugene Brevdo, Rui Zhao.
