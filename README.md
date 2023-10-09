## Section5 Class

・クラスの修飾子の使い方。(public, private, protected, readonly)

⇒ フィールドを追加しなくても、コンストラクター関数で簡略して書くことができる。

・static メソッド：外部からアクセスできるプロパティ。インスタンス化が不要

・abstract クラス：abstract 部分はオーバーライドを強制する。abstract クラス自体はインスタンス化できない。継承のために使われる。

・シングルトーンパターンについて

・interface とは？

## Section6 高度な型

・交差型：オブジェクトの場合結合。Union 型の場合共通部分になる違いあり。

・型ガード

①typeof: Javascript で使用できる型（string, number, boolean など。TypeScript 独自のクラスの中身には使えない

※これは、型ガードが実行されるランタイムの時にチェックされるため、JavaScript そのもので理解できる内容でないとダメ

②[key] in object : 使いたいプロパティが Object に存在するかを確認。ただしこれは Key の部分のタイポなどの懸念あり

③ [object] instanceof [Class] : 現在の Object が指定のクラスから生成されたインスタンス化をチェックする。そのため、Interface や、Custom 型(type)などには使用できない。

④ 判別型可能な Union にする : すべての対象型の中に同じプロパティ（例：type）を持たせて、Switch 文で分岐させる。

・型キャスト： 最後に as [型名]　で指定できる。Html の Input エレメントなど、特定のプロパティをその後使いたいときに縛っておくと便利

・関数オーバーロード：アロー関数には使えず関数宣言のみ。複数の型の引数/返値になる場合、そのあとの処理では型が特定できずにプロパティを使用できない。そのため、あるパターンの時は返値が何かを関数宣言の上に同じ関数名で記載することでオーバーロードできる。

## Section7 Generic 型

・柔軟性と型の安全性を提供するための機能

・何が入ってくるかわからないが、ある型 T が入ってきた際に、そのあとの処理としても T であることを保証するときなどに使う。

・object であることを強制するときは、「T extends {}」のように記載する。

## Section8 デコレータ

・tsconfig.json で、「①ES6②experimentdecorateor true」になっている必要あり。

・デコレーターは Class が定義された際に実行される。インスタンス化した際に実行するようにしたい場合は、デコレーターの中で新しいクラスを返すことで実施で来る。

・Autobind、Validation のデコレータ例を作成。正直よくわからない。

## Section9 Drag & Drop

・Drag & Drop の基礎が入っている

・Object 指向で、クラスを使用している

・Project が追加された、場所を変更された状態を管理する方法が上手い。レンダリングできるように Listener として関数を Constructor の中で渡しておいて、再度走るようにしている

## Section10 namespace & ES module

🔸namespace

・namespace では同じ App という namespace でくくってあげることによって、export した関数や変数クラスなどを利用できる。

・依存関係の登録には [/// <reference path="ファイル名"/>]でインポートしてあげる。これは Typescript 独自が理解できる

・分割した namespace は Typescript でのみ理解されるため、Js コンパイル時には１つのファイルにバンドルする必要がある。

そのため、tsconfig.json の「outFile」を On にして階層、ファイルを指定すること。

また、module を"amd"にすること。

・Object 指向で、クラスを使用している

・Project が追加された、場所を変更された状態を管理する方法が上手い。レンダリングできるように Listener として関数を Constructor の中で渡しておいて、再度走るようにしている

🔸ESmodule

・ES6 の export/import で定義

・tsconfig の設定。「①module: ES2015 ②outFile の設定は Off にして、src と同じフォルダ構成」

・html の src タグの属性に「type= "module"」を設定。これは ES6 の export/import モジュールを使用するために。

## Section11 webpack

・特徴「① バンドルの生成で、HTTP リクエストを少なくする。② ミニファイされたコードになる ③ ビルドステップを簡単にカスタマイズ。例えば開発サーバーなど」

・インストールしたもの「webpack / webpack-cli / webpack-dev-server / typescript / ts-loader 」

・webpach.config.js を package.json と同じ階層に置く。

・生成されたファイルはディスクではなく、メモリに一時的に保存されるため、更新しても新しい bundle ファイルを見に行けない。そのため publicpath を指定する。

## Section12 3rd-party-library

・Js のライブラリーをインストールしても typescript はその定義がどこにあるか見つけることができない。例）npm i lodash

・型定義がされている 3rd-party-library をインストールする必要があり、「type lodash」などで調べて誰かが型定義ファイル（.d.ts）を作っていないかを確認する。

・Global 変数などを読み込みたい際は、強制的に、「declare」で typescript に伝えることができる。

・classValidate はめっちゃくちゃ強力。デコレータを設定するだけで、あらゆるバリデーションができる。usage は github 上に公開されている。
