---
title: Neural Machine Translation
category: Machine Learning
date: 2018-06-19
sidebar: auto
---


&nbsp;

# Neural Machine Translation
이 글은 최고 수준([state-of-the-art](https://en.wikipedia.org/wiki/State_of_the_art))의 NMT 모델을 만들기 까지의 과정을 차례대로 알아보는 것을 목표로 합니다.


#### Neural Machine Translation(NMT)이 무엇이고 왜 사용하나요?
[NMT](https://en.wikipedia.org/wiki/Neural_machine_translation)는 [인공 신경망](https://en.wikipedia.org/wiki/Artificial_neural_network)을 사용해서 [기계 번역](https://en.wikipedia.org/wiki/Machine_translation)을 하는 방법 입니다. 자연어는 너무나 다양한 변형과 예외가 있어 [규칙 기반](https://en.wikipedia.org/wiki/Machine_translation#Rule-based)으로 처리하는 데 한계가 있고, 이후 등장한 [SMT(Statistical Machine Translation)](https://en.wikipedia.org/wiki/Statistical_machine_translation#Challenges_with_statistical_machine_translation)는 문장 구조가 다른 언어간의 번역이 어렵고, [OOV(Out Of Vocabulary)](https://en.wikipedia.org/wiki/Statistical_machine_translation#Out_of_vocabulary_(OOV)_words)등의 문제가 있었습니다. NMT는 이러한 문제들을 어느 정도 완화하며 기존의 방식들을 뛰어넘는 성능을 보여줍니다.


## Basics
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

1. 문장의 각 요소가 서로 영향을 받습니다.
2. 문장이 가변 길이 입니다.

이러한 문제를 해결하고 sequence형태의 데이터를 처리하기 위해 RNN이 적절한 선택일 수 있습니다. (RNN과 LSTM에 관해서는 이 [아름다운 글](http://colah.github.io/posts/2015-08-Understanding-LSTMs/)을 읽어보세요)


#### Beam Search
RNN decoder의 출력은 [softmax](https://developers.google.com/machine-learning/crash-course/glossary#softmax)를 거쳐서 각 timestep $t$에서 $y_t$가 될 수 있는 토큰들의 확률 분포가 됩니다. 이제 우리는 최적의 문장을 완성하기 위한 토큰을 선택할 알고리즘이 필요합니다. 여기서 최적의 문장은 source 문장 $x=(x_1, ... , x_T)$가 target 문장 $y = (y_1, ... , y_{T'})$로 번역될 확률 $p(y|x)$가 가장 높은 $y$를 말합니다.

위 문제는 깊이가 $T'$이고 각 노드에서 vocab size $n$만큼 분기하는 탐색 트리에서 가중치(토큰이 등장할 확률)의 곱이 가장 큰 경로를 찾는 문제가 됩니다. 탐색 범위가 $n^{T'}$으로 매우 크기 때문에 탐욕적인 방법으로 탐색을 하는 것이 바람직해 보입니다.

단순한 방법부터 살펴보면 각 timestep에서 가장 높은 확률을 가진(argmax) 토큰을 뽑아 문장을 완성하는 방법이 있고, 이러한 방법을 greedy decoding이라고 합니다.

<center><img src="/images/nmt/greedy.jpg" width="50%" /></center>
<center>그림 2. Greedy decoding (<a href="https://www.tensorflow.org/tutorials/seq2seq#inference_%E2%80%93_how_to_generate_translations">Neural Machine Translation (seq2seq) Tutorial</a>)</center>

더 높은 품질을 얻고 싶다면 [beam search](https://en.wikipedia.org/wiki/Beam_search)를 사용하게 됩니다. Beam search는 beam size $B$개의 후보를 유지하며 최적의 경로를 탐색하는 알고리즘 입니다. NMT에서 Beam search는 다음과 같이 동작합니다.

1. $p(y_t|x, y_1, ... , y_{t-1})$가 높은 순서대로 $B$개의 노드(토큰)를 선택합니다.
2. 선택한 노드로부터 가지를 뻗어나가 다시 $p(y_{t+1}|x, y_1, ... , y_t)$가 높은 $B$개의 토큰을 선택하고 유망하지 않은 경로는 탐색에서 제외합니다.
3. 2번 과정을 반복하면 마지막에 $B$개의 경로(문장)가 완성되며 이 중에서 가장 높은 확률을 갖는 문장을 최종적으로 출력합니다.

[이 영상](https://coursera.org/learn/nlp-sequence-models/lecture/4EtHZ/beam-search)에서 더 자세한 설명을 보실 수 있습니다.


## Models
이제 대표적인 NMT 모델들을 살펴보겠습니다.


### LSTM
처음 소개할 모델은 [Sutskever et al. (2014)](https://arxiv.org/pdf/1409.3215.pdf)에서 제안한 LSTM을 사용한 sequence to sequence 모델 입니다.


#### 어떻게 만드나요?
<center><img src="/images/nmt/seq2seq.png" width="80%" /></center>
<center>그림 3. Model architecture (<a href="https://arxiv.org/pdf/1409.3215.pdf">Sutskever et al. 2014</a>)</center>

'\<EOS\>'는 문장의 끝(end of sentence)을 구분하기 위해 사용하는 토큰입니다. '\<EOS\>'토큰을 사용으로 가변 길이의 문장을 처리할 수 있게 됩니다.

'\<EOS\>'토큰이 입력되기 직전까지가 encoder 입니다. encoder는 source 토큰 $x_t$와 이전 timestep의 hidden state $h_{t-1}$을 입력으로 받아 새로운 hidden state $h_t$를 출력합니다. encoder의 마지막 hidden state $h_T$가 바로 source 문장의 의미를 함축한 $z$ 입니다.

'\<EOS\>'토큰이 입력되는 부분 부터가 decoder 입니다. decoder는 이전 timestep의 target 토큰 $y_{t'-1}$과 이전 timestep의 hidden state $h_{t'-1}$를 입력으로 받아 target 토큰 $y_{t'}$를 출력합니다. decoder의 초기 hidden state는 $z$이고, '\<EOS\>'토큰을 출력하면 종료합니다.

논문에서는 deep LSTMs가 shallow LSTMs보다 뛰어난 성능을 보이기 때문에 4개의 LSTM layer를 사용했고, 입력 문장의 토큰 순서를 뒤집어서 성능을 향상시켰다고 합니다.


### Bidirectional RNN + Attention Mechanism
다음으로 소개할 모델은 [Bahdanau et al. (2014)](https://arxiv.org/pdf/1409.0473.pdf)에서 제안한 모델입니다.


#### Attention이 뭔가요?
"The cat is on the mat"이라는 문장을 번역해 봅시다. 우리는 높은 확률로 "고양이가..."라는 말로 번역을 시작할 것입니다. 이 때 "고양이가"라는 단어를 선택한 이유는 무엇인가요? 당연하게도 "The cat", "is"등의 단어가 원문에 등장했기 때문이고, "the mat"과 같은 단어는 "고양이가"라는 단어를 만드는 데 거의 영향을 주지 않을 것입니다. 다시 말하면 우리는 어떤 문장의 일부분을 번역할 때 문장 전체에 균등하게 관심을 보이는 게 아니라 문장의 일부분에 집중하게 됩니다.

NMT로 돌아와서 생각해 보면 고정 길이의 벡터 $z$에 문장 전체의 정보를 우겨넣고 다시 거기서 부터 번역 문장 전체를 만드는 방법은 합리적이지 않아 보입니다. 그래서 위에서 살펴본 것과 같이 번역문을 만들어 나갈 때 중요한 부분만 주목해서 보겠다는 것이 attention mechanism의 아이디어 입니다.

Attention에 대해 더 자세히 알고 싶으신 분은 이 [영롱한 글](https://distill.pub/2016/augmented-rnns/)을 읽어보시기 바랍니다.


#### 어떻게 만드나요?
<center><img src="/images/nmt/bidirectional.png" width="40%" /></center>
<center>그림 4. Model architecture (<a href="https://arxiv.org/pdf/1409.0473.pdf">Bahdanau et al. 2014</a>)</center>

Decoder는 이전 timestep에서 출력한 토큰 $y_{i-1}$과 hidden state $s_{i-1}$, 그리고 문맥 정보 $c_i$를 입력받아 $y_i$를 출력합니다.

Decoder의 hidden state $s_i$는 [nonlinear function](https://en.wikipedia.org/wiki/Nonlinear_system) $f$에 decoder input을 입력으로 하여 얻습니다.
$$s_i=f(s_{i-1}, y_{i-1}, c_i)$$

$c$는 주목해서 봐야 할 문맥 정보 입니다. $c_i$는 encoder hidden state들의 가중합으로 계산합니다.
$$c_i=\sum_{j=1}^{T_x}\alpha_{ij}h_j$$

$\alpha$가 바로 문장의 어느 부분을 얼마나 집중해서 봐야 할 지를 정하는 attention weight 입니다. $\alpha_{ij}$는 다음과 같이 계산합니다.
$$\alpha_{ij}=\frac{exp(e_{ij})}{\sum_{k=1}^{T_x}exp(e_{ik})}$$
$$e_{ij}=a(s_{i-1}, h_j)$$
$a$는 임의의[feedforward neural network](https://en.wikipedia.org/wiki/Feedforward_neural_network)입니다.

Encoder는 forward RNN과 backward RNN을 결합해서 만든 bidirectional RNN(biRNN)입니다. BiRNN에서 각 timestep의 hidden state $h_j$는 forward RNN의 hidden state $\overrightarrow{h_j}$와 backward RNN의 hidden state $\overleftarrow{h_j}$를 이어붙여서(concatenate) 만들어집니다.
$$h_j=\Big[\overrightarrow{h_j};\overleftarrow{h_j}\Big]$$
이렇게 하는 이유는 $h_t$에 앞뒤 문맥 정보가 모두 담기도록 하기 위함 입니다.


### Transformer
마지막으로 소개할 모델은 state-of-the-art라고 할 수 있는 Transformer로 [Vaswani et al. (2017)](https://arxiv.org/pdf/1706.03762.pdf)에서 제안했습니다.


#### 어떻게 만드나요?
<center><img src="/images/nmt/transformer.png" width="50%" /></center>
<center>그림 5. Model architecture (<a href="https://arxiv.org/pdf/1706.03762.pdf">Vaswani et al. 2017</a>)</center>

Encoder는 multi-head self-attention과 feed-forward network로 구성된 N개의 층을 쌓아 올린 형태 입니다. Decoder는 encoder와 유사한 구조에 encoder output을 바라보는 attention을 추가한 형태 입니다.

<center><img src="/images/nmt/transformer_attention.png" width="60%" /></center>
<center>그림 6. Scaled dot-product attention(왼쪽), multi-head attention(오른쪽) (<a href="https://arxiv.org/pdf/1706.03762.pdf">Vaswani et al. 2017</a>)</center>

Multi-head attention은 $h$개의 scaled dot-product attention을 병렬로 연결합니다. Scaled dot-product attention은 다음과 같이 계산합니다.

$$Attention(Q, K, V)=softmax\Big(\frac{QK^T}{\sqrt{d_k}}\Big)V$$

Dot-product attention은 어떤 memory(key-value store)에서 query를 통해 값을 얻어내는 과정으로 설명할 수 있습니다. 먼저 이산적인 memory를 생각해보면 query와 같은 key에 해당하는 value를 얻어오게 됩니다. 예를 들어 memory를 행렬로 표현한다면 query에 해당하는 key를 one-hot 벡터로 표현하고, memory 행렬에 곱해서 원하는 주소(row)의 value를 얻을 수 있습니다.

Dot-product attention도 이와 비슷하지만, memory가 연속적이고 key를 one-hot 벡터가 아닌 어떤 분포로 표현한다는 점이 다릅니다. 그리고 query와 유사도가 높은 key가 query에 해당하는 key가 되는데, 두 벡터의 dot-product로 유사도를 나타낼 수 있습니다(두 벡터가 이루는 각도가 0에 가까울 수록 dot-product는 커집니다). 따라서 $softmax\Big(\frac{QK^T}{\sqrt{d_k}}\Big)$가 곧 우리가 원하는 분포가 됩니다.

dot-product를 $\sqrt{d_k}$로 나누어주는 이유는 softmax의 입력에 아주 큰 값이 사용되면 분포가 지나치게 뾰족해져서 gradient가 제대로 흐르지 못할 수 있기 때문입니다.

Multi-head attention은 N개의 dot-product attention을 concatenate한 것입니다. Multi-head attention은 Transformer에서 다음의 3가지 다른 형태로 사용됩니다.

1. Encoder-decoder attention
    * Queries는 한 층 아래의 decoder layer로부터, keys와 values는 encoder layer로부터 얻습니다.
2. Encoder-encoder attention
    *  $Q$, $K$, $V$ 모두 이전 층의 encoder layer로부터 얻습니다.
3. Decoder-decoder attention
    * Encoder-encoder attention과 비슷하게 $Q$, $K$, $V$ 모두 이전 층의 decoder layer로부터 얻습니다.
    * Decoder는 이전 timestep의 decoder output만을 알아야 합니다. 하지만 학습시에 우리는 모든 timestep의 decoder output $y$를 알고 있기 때문에 masking을 통해 정보를 제한해야 합니다.

RNN과 달리 self-attention은 각 토큰들 사이의 순서나 위치(position)에 관한 정보를 갖고있지 않습니다. 그래서 추가된 개념이 positional encoding 입니다.

Positional encoding(PE)은 다음과 같이 계산됩니다.

$$PE(pos, 2i) = sin(pos/10000^{2i/d_{model}})$$
$$PE(pos, 2i+1) = cos(pos/10000^{2i/d_{model}})$$

pos는 위치, i는 차원을 나타냅니다. 결국 PE는 각 위치에 대한 정보를 encode한 결과이고, input/output embedding에 더해져서 위치 정보를 반영합니다.


#### 왜 이렇게 만들었나요?
Transformer는 RNN을 사용한 sequence to sequence 모델의 문제를 해결하고자 헀습니다. RNN을 사용한 모델은 다음과 같은 한계를 가지고 있습니다.

1. 모든 연산은 순차적으로(sequential) 행해져야 합니다.
2. Path length가 sequence의 길이에 비례해서 늘어납니다.
    * 긴 path length에는 정보의 손실이 따릅니다. (long-range dependencies 문제)

Transformer는 RNN대신 self-attention을 사용하여 위의 문제를 해결합니다. Self-attention을 통해 연산의 많은 부분이 병렬화 가능하게 되었고, path length는 sequence의 길이에 의존하지 않는 고정 길이를 갖게 되었습니다.


#### 이게 최선인가요?
Transformer가 현재까지 가장 좋은 성능을 보여주고 있지만, 개선의 여지는 있습니다. Inference시에는 여전히 이전 출력에 대한 의존성 때문에 순차적인 연산을 해야 하고, 학습을 위한 양질의 parallel corpora는 구하기 어렵다는 문제가 있습니다.


#### 더 자세히 알고 싶어요
* [명쾌한 해설 영상](https://www.youtube.com/watch?v=iDulhoQ2pro)
* [친절한 그림과 설명](https://mchromiak.github.io/articles/2017/Sep/12/Transformer-Attention-is-all-you-need/)
* [구현체](https://github.com/tensorflow/tensor2tensor)


## References
1. Sequence to Sequence Learning with Neural Networks [[pdf]](https://arxiv.org/pdf/1409.3215.pdf)  
   Ilya Sutskever, Oriol Vinyals, Quoc V. Le, 2014. [arXiv:1409.3215](https://arxiv.org/abs/1409.3215).
2. Neural Machine Translation by Jointly Learning to Align and Translate [[pdf]](https://arxiv.org/pdf/1409.0473.pdf)  
   Dzmitry Bahdanau, Kyunghyun Cho, Yoshua Bengio, 2014. [arXiv:1409.0473](https://arxiv.org/abs/1409.0473).
3. Attention is All You Need [[pdf]](https://arxiv.org/pdf/1706.03762.pdf)  
   Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin, 2017. [arXiv:1706.03762](https://arxiv.org/abs/1706.03762).
4. Neural Machine Translation (seq2seq) Tutorial [[link]](https://www.tensorflow.org/tutorials/seq2seq)[[github]](https://github.com/tensorflow/nmt/)  
   Thang Luong, Eugene Brevdo, Rui Zhao.
