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

MEETING_MINUTES_PROMPT = {
    "meeting_theme": (
        "会議のテーマ：RAGや生成AIに関する具体的な要件、技術的な仕様、及び活用方法について。"
    ),
    "purpose": (
        "目的：生成AIを活用したソリューションや、RAGによる検索・回答精度の向上を検討するため、クライアントのニーズに沿った議事録を作成。"
    ),
    "transcription_target": (
        "文字起こし対象："
        "\n- 技術用語：生成AI（Generative AI）、RAG（Retrieval-Augmented Generation）、LLM（Large Language Model）、知識グラフ、文書検索、質問応答システム等。"
        "\n- クライアントの要望や要件定義、技術的な質問、特定の使用ケース（Use Case）、ターゲットユーザー層に関する内容。"
    ),
    "format": (
        "フォーマット："
        "\n- 発言者ごとの区分け（例：「担当者A：…」「クライアントB：…」）"
        "\n- 重要なポイント、アクションアイテム、質問と回答は強調表示"
    ),
    "important_points": (
        "重要なポイントの記載："
        "\n- クライアントのニーズ、目標、具体的なRAGまたは生成AIの適用領域"
        "\n- 技術的な課題、懸念事項、期待される効果"
        "\n- 次回の会議に向けたアクションアイテム"
    ),
    "transcription_guidelines": (
        "文字起こしの留意事項："
        "\n- 専門用語や業界固有の用語を正確に書き起こし、適切な訳語を使用"
        "\n- クライアントの発言のニュアンスを維持し、意図が誤解されないよう配慮"
        "\n- 確認が必要な場合は、「要確認」と明記"
    )
}
