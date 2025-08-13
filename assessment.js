
//厳格モードの仕様
'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

//エンターキーが押された時のイベント設定
userNameInput.addEventListener(
  'keydown',
  (event) => {
    //以下を追加。日本語入力(IME)などの変換によるEnterは無視するようにする
    if (event.isComposing) return;

    if (event.code === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)

//診断するのボタンがクリックされた時のイベント設定
assessmentButton.addEventListener(
  'click',
  () => {
    console.log('ボタンが押されました');

    const userName = userNameInput.value;
    if (userName.length === 0) {
      console.log('入力が空でした');
      return;
    }

    //診断結果表示エリアの作成 (最初に初期化)
    //resultDivision.innerText = ''; でも可能

    while (resultDivision.firstChild) {
      //resultDivisionに子要素があれば削除し続ける
      resultDivision.removeChild(resultDivision.firstChild);
    }

    const heading = document.createElement('h3');
    heading.innerText = '診断結果';
    resultDivision.appendChild(heading);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivision.appendChild(paragraph);

    //ツイートエリアの作成
    while (tweetDivision.firstChild) {
      tweetDivision.removeChild(resultDivision.firstChild);
    }

    const anchor = document.createElement('a');
    // https の部分はURIのスキーム, twitter.comの部分はホスト名
    // /intent/tweetの部分はリソース名, ?以降の部分はクエリ
    // encodeURIComponentで文字列をURIエンコードに変換してから渡す
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
      + encodeURIComponent('とりガチャ') + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #とりガチャ';

    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js')

    tweetDivision.appendChild(script);
  }
);

const answers = [
  '###userName###へのおすすめは『アオゲラ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『アオサギ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『アオジ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『アオバト』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『アカゲラ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『アカショウビン』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『アカハラ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『イスカ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『イソヒヨドリ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ウグイス』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ウソ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『エナガ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『オオルリ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『オナガ』だよ！さっそく描いてみよう！！',

  '###userName###へのおすすめは『カケス』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『カモメ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『カワセミ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『カワラヒワ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『キクイタダキ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『キジ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『キジバト』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『キセキレイ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『キビタキ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『キレンジャク』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『クロツグミ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ゴイサギ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『コウノトリ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『コゲラ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ゴジュウカラ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『コジュケイ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『コチドリ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『コノハズク』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『コマドリ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『コルリ』だよ！さっそく描いてみよう！！',

  '###userName###へのおすすめは『サンコウチョウ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『シジュウカラ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『シメ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ジョウビタキ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『スズメ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『セイタカシギ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『セグロセキレイ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『センダイムシクイ』だよ！さっそく描いてみよう！！',

  '###userName###へのおすすめは『ダイサギ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『タシギ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『タゲリ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『タマシギ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ツグミ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ツバメ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『トキ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ドバト』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『トラフズク』だよ！さっそく描いてみよう！！',

  '###userName###へのおすすめは『ノビタキ』だよ！さっそく描いてみよう！！',

  '###userName###へのおすすめは『ハクセキレイ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ハシブトカラス』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ハシボソカラス』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ヒクイナ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ヒバリ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ヒヨドリ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ブッポウソウ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ベニマシコ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ホオジロ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ホトトギス』だよ！さっそく描いてみよう！！',

  '###userName###へのおすすめは『ミソサザイ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ミユビシギ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ムクドリ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『メジロ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『モズ』だよ！さっそく描いてみよう！！',

  '###userName###へのおすすめは『ヤイロチョウ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ヤマガラ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ヤマセミ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ヤンバルクイナ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ヨシキリ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ヨシゴイ』だよ！さっそく描いてみよう！！',

  '###userName###へのおすすめは『ライチョウ』だよ！さっそく描いてみよう！！',
  '###userName###へのおすすめは『ルリビタキ』だよ！さっそく描いてみよう！！',
];

/*
以下コメントはSDocと呼ばれる形式で書かれたもの
最初の行は関数の処理内容を説明している
@paramは引数(parameter)を表している
@returnは返り値(return value)を表している
{string}は値の方が文字列型であることを表している
*/

/*
* 名前の文字列を渡すと診断結果を返す関数
* @param {string} userName ユーザーの名前
* @return {string} 診断結果
*/

function assessment(userName) {
  /* ロジック */
  //名前の全ての文字の文字コード番号の整数値を足す
  //足した結果を診断結果のパターンの数で割った余りを取得する
  //余りを診断結果の配列の添字として、診断結果の文字列を取得する

  //追加：現在時刻(ミリ秒)を1000000で割った値×日付も足す(1000秒おきに変わる)

  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    //文字列.charCodeAt(添え字);で文字列のi+1番目の文字のコードを取得
    sumOfCharCode += userName.charCodeAt(i);
  }

  const now_time = new Date();
  //Math.floor()とすることで整数除数(C言語の/的な)にできる
  sumOfCharCode += (Math.floor(Date.now() / 1000000) * now_time.getDate());

  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  //'元の全体の文字列'.replaceAll('置き換える前の文字列', '置き換えた後の文字列');
  result = result.replaceAll('###userName###', userName)
  return result;
}

//console.log(answers.length);