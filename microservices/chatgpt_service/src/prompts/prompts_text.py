DEFAULT_PROMPT = (
    "「{}」を、専門用語を使わずに簡単に説明してください。音声出力をしたいので、余計な応答や「」は不要です。"
    "最大で3文以内にまとめてください。音声出力用に適しています。"
)

REGISTER_PROMPT = (
    "自動販売レジとしてお客様の音声対応をしています。「{}」をお客様に分かりやすいよう言い直してください。音声出力をしたいので、余計な応答や「」は不要です。"
    "最大で3文以内にまとめてください。音声出力用に適しています。"
)

CALLCENTER_PROMPT = (
    "あなたはコールセンターでお客様の対応をしています。「{}」をお客様相手に相応しい言葉遣いに言い直してください。音声出力をしたいので、余計な応答や「」は不要です。"
    "最大で3文以内にまとめてください。音声出力用に適しています。"
)

COLLEGE_LECTURE_PROMPT = (
    '大学の講義中です。意味合いはあまり変えないまま、「{}」を、各用語を嚙み砕きつつ高校一年生にも分かりやすいように言い直してください。音声出力をしたいので、余計な応答や「」は不要です。'
    "最大で3文以内にまとめてください。音声出力用に適しています。"
)

BUISINESS_CONFERENCE_PROMPT = (
    'ビジネス会議の最中です。字数や意味合いはあまり変えないまま、「{}」をあまりビジネス用語の詳しくない人でもわかるように言い換えてください。音声出力をしたいので、余計な応答や「」は不要です。'
    "最大で3文以内にまとめてください。音声出力用に適しています。"
)

    # '字数はあまり変えないまま、「{text}」を、専門用語を噛み砕きつつ高校生にも分かりやすいよう言い直してください。音声出力をしたいので、余計な応答や「」は不要です。',
    # '字数や意味合いはあまり変えないまま、「{text}」を、聞き手の気分をあまり害さないように言い直してください。音声出力をしたいので、余計な応答や「」は不要です。',
    # 'ビジネス会議の最中です。字数や意味合いはあまり変えないまま、「{text}」をあまりビジネス用語の詳しくない人でもわかるように言い換えてください。音声出力をしたいので、余計な応答や「」は不要です。',
    # 'とある講義中です。意味合いはあまり変えないまま、「{text}」を、各用語を嚙み砕きつつ高校一年生にも分かりやすいように言い直してください。音声出力をしたいので、余計な応答や「」は不要です。',
    # '友人との会話中です。字数や意味合いはあまり変えないまま、「{text}」の難しい言葉を噛み砕きつつ高校生にも分かりやすいように言い直してください、音声出力をしたいので、余計な応答や「」は不要です。'
