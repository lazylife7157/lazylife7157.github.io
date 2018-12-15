(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{161:function(t,e,r){"use strict";r.r(e);var a=r(0),s=Object(a.a)({},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"content"},[t._m(0),r("h1",{attrs:{id:"hello-rust"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#hello-rust","aria-hidden":"true"}},[t._v("#")]),r("center",[t._v("Hello, Rust!")])],1),r("h6",{attrs:{id:"el-cho-kakao"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#el-cho-kakao","aria-hidden":"true"}},[t._v("#")]),r("center",[t._v("el.cho@kakao")])],1),r("hr"),t._m(1),t._m(2),r("p",[t._v("Rust is a systems programming language with a focus on safety, especially safe concurrency, supporting both functional and imperative paradigms.")]),r("hr"),t._m(3),t._m(4),r("p",[t._v("안전하고, 동시적이며, 실용적인 시스템 언어를 설계하고 구현하는 것이 Rust 프로젝트의 목표입니다.")]),r("hr"),t._m(5),t._m(6),t._m(7),r("hr"),t._m(8),r("hr"),t._m(9),t._m(10),t._m(11),r("hr"),t._m(12),t._m(13),t._m(14),r("hr"),t._m(15),t._m(16),t._m(17),r("hr"),t._m(18),r("hr"),t._m(19),r("ul",[r("li",[t._v("CWE/SANS TOP 25\n"),r("ul",[r("li",[r("a",{attrs:{href:"http://cwe.mitre.org/data/definitions/120.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Buffer Copy without Checking Size of Input"),r("OutboundLink")],1)]),r("li",[r("a",{attrs:{href:"http://cwe.mitre.org/data/definitions/131.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Incorrect Calculation of Buffer Size"),r("OutboundLink")],1)]),r("li",[r("a",{attrs:{href:"http://cwe.mitre.org/data/definitions/134.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Uncontrolled Format String"),r("OutboundLink")],1)])])]),r("li",[t._v("Other Vulnerabilities\n"),r("ul",[r("li",[r("a",{attrs:{href:"https://cwe.mitre.org/data/definitions/415.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Double Free"),r("OutboundLink")],1)]),r("li",[r("a",{attrs:{href:"https://cwe.mitre.org/data/definitions/416.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Use After Free"),r("OutboundLink")],1)]),r("li",[r("a",{attrs:{href:"https://cwe.mitre.org/data/definitions/476.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("NULL Pointer Dereference"),r("OutboundLink")],1)]),r("li",[r("a",{attrs:{href:"https://cwe.mitre.org/data/definitions/590.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Free of Memory not on the Heap"),r("OutboundLink")],1)]),r("li",[t._v("...")])])])]),r("hr"),t._m(20),t._m(21),t._m(22),r("hr"),t._m(23),t._m(24),r("p",[t._v("Rust는 Ownership개념을 통해서 메모리 할당과 해제를 관리하기 때문에 dangling pointer의 존재 자체가 불가능 합니다.")]),r("p",[t._v("또한 Ownership의 확인은 compile-time에 일어나므로 run-time의 성능에도 전혀 영향이 없습니다.")]),r("hr"),t._m(25),t._m(26),t._m(27),r("hr"),t._m(28),r("hr"),t._m(29),t._m(30),r("p",[t._v("악의 근원은 mutable shared variable 입니다.")]),r("p",[t._v("Rust에서 mutable reference는 동시에 하나만 존재할 수 있습니다.")]),r("p",[t._v("따라서 Rust에서 mutable shared variable이 존재하는(data race가 가능한) 코드는 컴파일조차 할 수 없습니다!")]),r("hr"),t._m(31),t._m(32),t._m(33),r("hr"),t._m(34),t._m(35),r("ul",[r("li",[r("a",{attrs:{href:"https://doc.rust-lang.org/book/",target:"_blank",rel:"noopener noreferrer"}},[t._v("The Book"),r("OutboundLink")],1)]),r("li",[r("a",{attrs:{href:"https://doc.rust-lang.org/stable/rust-by-example/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Rust By Example"),r("OutboundLink")],1)]),r("li",[r("a",{attrs:{href:"https://doc.rust-lang.org/std/index.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("The Standard Library"),r("OutboundLink")],1)]),r("li",[r("a",{attrs:{href:"https://rust-lang-nursery.github.io/cli-wg/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Command Line Book"),r("OutboundLink")],1)]),r("li",[r("a",{attrs:{href:"https://rustwasm.github.io/book/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Webassembly Book"),r("OutboundLink")],1)]),r("li",[r("a",{attrs:{href:"https://www.rust-lang.org/learn",target:"_blank",rel:"noopener noreferrer"}},[t._v("And more..."),r("OutboundLink")],1)])]),r("hr"),t._m(36),t._m(37),t._m(38),r("hr"),t._m(39),r("hr"),t._m(40),t._m(41),r("p",[t._v("Several components of the Dropbox core file-storage system were written in Rust as one step in part of a larger project to pursue greater datacenter efficiency. It’s currently used by all Dropbox storage today, serving >500 million users.")]),r("p",[r("a",{attrs:{href:"https://www.wired.com/2016/03/epic-story-dropboxs-exodus-amazon-cloud-empire/",target:"_blank",rel:"noopener noreferrer"}},[t._v("The Epic Story of Dropbox's Exodus From the Amazon Cloud Empire"),r("OutboundLink")],1)]),r("hr"),t._m(42),t._m(43),r("p",[t._v("Yelp has developed a framework in Rust for real-time A/B testing. It’s used across all Yelp websites and apps, and experiment subjects range from UX to internal infrastructure. Rust was chosen because it’s as fast as C (cheap to run) and safer than C (cheap to maintain).")]),r("p",[r("a",{attrs:{href:"https://www.youtube.com/watch?v=u6ZbF4apABk",target:"_blank",rel:"noopener noreferrer"}},[t._v("How to write Rust instead of C, and get away with it (yes, it's a Python talk)"),r("OutboundLink")],1)]),r("hr"),t._m(44),t._m(45),r("hr"),t._m(46),t._m(47),t._m(48),r("hr"),t._m(49),r("h1",{attrs:{id:"감사합니다"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#감사합니다","aria-hidden":"true"}},[t._v("#")]),r("center",[t._v("감사합니다.")])],1)])},[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"cuddlyferris.png",alt:"center 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"the-rust-programming-language"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#the-rust-programming-language","aria-hidden":"true"}},[this._v("#")]),this._v(" The Rust Programming Language")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"goals"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#goals","aria-hidden":"true"}},[this._v("#")]),this._v(" Goals")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"non-goals"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#non-goals","aria-hidden":"true"}},[this._v("#")]),this._v(" Non-Goals")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("극단적인 최신 기술을 도입하기보다는 검증된 기술을 사용합니다.")]),e("li",[this._v("표현력, 미니멀리즘, 우아함 등은 중요하지만 다른 목표들보다 우선하지는 않습니다.")]),e("li",[this._v("어떤 다른 언어의 "),e("strong",[this._v("모든")]),this._v(" feature-set을 커버하는 것은 목표가 아닙니다.")]),e("li",[this._v("100% static, 100% safe, 100% reflective를 목표로 하지 않습니다. 언제나 trade-off는 있습니다.")]),e("li",[this._v("Rust는 세상의 모든 플랫폼에서 동작하는것을 목표로 하지 않습니다. 하지만 결국에는 대부분의 HW/SW 플랫폼에서 동작하게 될 것입니다.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"why-rust"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#why-rust","aria-hidden":"true"}},[this._v("#")]),this._v(" Why Rust?")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"why-rust-performance"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#why-rust-performance","aria-hidden":"true"}},[this._v("#")]),this._v(" Why Rust? - Performance")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Rust is "),e("strong",[this._v("blazingly fast and memory-efficient: with no runtime or garbage collector")]),this._v(", it can power performance-critical services, run on embedded devices, and easily integrate with other languages.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"benchmarks"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#benchmarks","aria-hidden":"true"}},[this._v("#")]),this._v(" Benchmarks")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("https://benchmarksgame-team.pages.debian.net/benchmarksgame/faster/rust.html")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"why-rust-reliability"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#why-rust-reliability","aria-hidden":"true"}},[this._v("#")]),this._v(" Why Rust? - Reliability")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Rust’s rich type system and ownership model "),e("strong",[this._v("guarantee memory-safety and thread-safety")]),this._v(" — and enable you to "),e("strong",[this._v("eliminate many classes of bugs at compile-time.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"memory-safety"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#memory-safety","aria-hidden":"true"}},[this._v("#")]),this._v(" Memory Safety")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"다른-언어들의-해결-방법"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#다른-언어들의-해결-방법","aria-hidden":"true"}},[this._v("#")]),this._v(" 다른 언어들의 해결 방법")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("개발자에게 시큐어 코딩을 가르칩니다. (C, C++, ...)\n"),e("ul",[e("li",[this._v("근본적인 해결책이 아닙니다.")])])]),e("li",[this._v("GC (Garbage Collector) 를 도입합니다. (Java, C#, Python, ...)\n"),e("ul",[e("li",[this._v("GC가 동작하는 동안 프로그램이 멈추므로 성능 문제가 있습니다.")]),e("li",[this._v("Null pointer dereference는 여전히 runtime-error를 발생시킵니다.")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"rust의-해결-방법-ownership"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#rust의-해결-방법-ownership","aria-hidden":"true"}},[this._v("#")]),this._v(" Rust의 해결 방법 - Ownership")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"rust의-해결-방법-ownership-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#rust의-해결-방법-ownership-2","aria-hidden":"true"}},[this._v("#")]),this._v(" Rust의 해결 방법 - Ownership")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ol",[e("li",[this._v("Each value in Rust has a variable that’s called its owner.")]),e("li",[this._v("There can only be one owner at a time.")]),e("li",[this._v("When the owner goes out of scope, the value will be dropped.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"thread-safety"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#thread-safety","aria-hidden":"true"}},[this._v("#")]),this._v(" Thread Safety")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"rust의-해결-방법"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#rust의-해결-방법","aria-hidden":"true"}},[this._v("#")]),this._v(" Rust의 해결 방법")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"why-rust-productivity"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#why-rust-productivity","aria-hidden":"true"}},[this._v("#")]),this._v(" Why Rust? - Productivity")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Rust has "),e("strong",[this._v("great documentation")]),this._v(", "),e("strong",[this._v("a friendly compiler with useful error messages")]),this._v(", and top-notch tooling — an "),e("strong",[this._v("integrated package manager and build tool, smart multi-editor support with auto-completion and type inspections, an auto-formatter, and more.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"great-documentation"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#great-documentation","aria-hidden":"true"}},[this._v("#")]),this._v(" Great Documentation")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"friendly-tools"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#friendly-tools","aria-hidden":"true"}},[this._v("#")]),this._v(" Friendly Tools")])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ul",[r("li",[t._v("Rustc\n"),r("ul",[r("li",[t._v("Rust compiler, 친절한 오류 메세지")])])]),r("li",[t._v("Rustup\n"),r("ul",[r("li",[t._v("Rust toolchain installer")])])]),r("li",[t._v("Cargo\n"),r("ul",[r("li",[t._v("Rust package manager")])])]),r("li",[t._v("RLS (Rust Language Server)\n"),r("ul",[r("li",[t._v("다양한 편집기를 지원하는 IDE backend")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"friends-of-rust"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#friends-of-rust","aria-hidden":"true"}},[this._v("#")]),this._v(" Friends of Rust")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"dropbox"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#dropbox","aria-hidden":"true"}},[this._v("#")]),this._v(" Dropbox")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"yelp"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#yelp","aria-hidden":"true"}},[this._v("#")]),this._v(" Yelp")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ul",[r("li",[t._v("Mozilla : Building the Servo browser engine, integrating into Firefox, other projects.")]),r("li",[t._v("SmartThings : Memory-safe embedded applications on our SmartThings Hub and supporting services in the cloud.")]),r("li",[t._v("Canonical : Everything from server monitoring to middleware!")]),r("li",[t._v("npm, Inc : Replacing C and rewriting performance-critical bottlenecks in the registry service architecture.")]),r("li",[t._v("Sentry : JavaScript, Java and iOS event processing and the command-line client for the Sentry API.")]),r("li",[t._v("LINE, Atlassian, Coursera, Zeplin, "),r("s",[t._v("Autumn")]),t._v(" ...")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"rust-logo-512x512-blk.png",alt:"bg 32%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"references"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#references","aria-hidden":"true"}},[this._v("#")]),this._v(" References")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("https://www.rust-lang.org")]),e("li",[this._v("http://www.rustacean.net/")]),e("li",[this._v("https://en.wikipedia.org/wiki/Rust_(programming_language)")]),e("li",[this._v("https://www.sans.org/top25-software-errors")]),e("li",[this._v("https://cwe.mitre.org/")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:"cuddlyferris.png",alt:"center 32%"}})])}],!1,null,null,null);e.default=s.exports}}]);