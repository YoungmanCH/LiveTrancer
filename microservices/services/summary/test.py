# from langchain_openai import ChatOpenAI
# from langchain.prompts import PromptTemplate
import textTrancer_GPT as textTrancer_GPT


text_transer = textTrancer_GPT.Term_Transer_GPT()

print('Test is started.')

# sample_text = "Buildxを使うことで、異なるアーキテクチャ（例：linux/arm64 や linux/ppc64le など）に向けたイメージもビルド可能で、クロスプラットフォームのビルドに特化しています。"
    # 0.50~1.25秒くらい

sample_text = "Buildxを使うことで、"
text_transer.get_translation(sample_text)

sample_text = "異なるアーキテクチャ（例：linux/arm64 や linux/ppc64le など）に向けたイメージもビルド可能で、"
text_transer.get_translation(sample_text)

sample_text = "クロスプラットフォームのビルドに特化しています。"
text_transer.get_translation(sample_text)

# sample_text = "EC2とECSとECRとDockerを使った仮想環境ベースのアプリケーションの環境構築をしようとしているのだが、EC2サーバーのインスタンスを立ち上げるときに、高スペックのGPUを使用したい場合、サービスクォータにてどれくらいのクォータを呼び出すべきなのか、しっかりと議論したい。"
    # 0.50~0.75秒くらい
# sample_text = "FirestoreはNoSQLデータベースで、ドキュメントとコレクションの形式でデータを保存します。スケーラブルで、柔軟な構造を持ち、アプリのデータが階層的（親子関係）である場合に適しています。" #
    # 0.45~0.75秒くらい
# sample_text = "GSI（グローバルセカンダリインデックス）は、DynamoDBでパーティションキーとソートキー以外の属性に対してクエリを実行するために使用されるインデックスです。通常のインデックスと異なり、別のパーティションテーブルとして管理され、書き込み時に自動で更新されます。これにより、特定のアクセスパターンや検索条件に対してクエリ性能を大幅に向上させます。RDBのセカンダリインデックスに似ていますが、スケーラビリティとパフォーマンスが最適化されています。"
    # 0.50~1.10秒くらい
# sample_text = "GSI（グローバルセカンダリインデックス）は、"
# text_transer.get_translation_stream(sample_text)

# sample_text = "DynamoDBでパーティションキーとソートキー以外の属性に対してクエリを実行するために使用されるインデックスです。"
# text_transer.get_translation_stream(sample_text)

# sample_text = "通常のインデックスと異なり、"
# text_transer.get_translation_stream(sample_text)

# sample_text = "別のパーティションテーブルとして管理され、"
# text_transer.get_translation_stream(sample_text)

# sample_text = "書き込み時に自動で更新されます。"
# text_transer.get_translation_stream(sample_text)

# sample_text = "これにより、特定のアクセスパターンや検索条件に対してクエリ性能を大幅に向上させます。RDBのセカンダリインデックスに似ていますが、スケーラビリティとパフォーマンスが最適化されています。"
# text_transer.get_translation_stream(sample_text)

