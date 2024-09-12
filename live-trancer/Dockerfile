# ベースイメージとしてNode.js v18を使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコンテナ内にコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install --production

# アプリケーションのソースコードをコンテナ内にコピー
COPY . .

# 必要であればNext.jsのビルドプロセスを実行（開発中のビルドキャッシュを無効化）
RUN npm run build

# ポートを指定（Next.jsはデフォルトで3000番ポートを使用）
EXPOSE 3000

# 環境変数を設定（デフォルトで本番モードに）
ENV NODE_ENV=production

# アプリケーションの起動コマンド
CMD ["npm", "start"]
