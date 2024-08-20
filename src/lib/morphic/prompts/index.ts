type ImageEvaluationPromptFormatProps = {
  tweetUrl: string;
}

export const imageEvaluationPromptFormat = ({tweetUrl}:ImageEvaluationPromptFormatProps) => `今から送るXポストリンクに貼られている画像について、問います。 
スピードよりクオリティー重視してください。

#回答方法 
画像なしの場合： 「なし」と一言だけ。余計な解説は不要です。

貼られている場合：
画像に書かれている文字と、画像を見て受ける印象。 文字がない場合、印象のみでOKです。 
印象というのは、全体的にパッと見たときどう思うか。です。 

対象リンク：${tweetUrl}

リンクを正しく読み込めなかったら再挑戦してください。

画像の正確性をできるだけ高く担保してください。`;
