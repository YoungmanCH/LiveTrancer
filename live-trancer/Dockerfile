# ベースイメージを指定
FROM node:18

# アプリケーションの作業ディレクトリを作成
WORKDIR /usr/src/app

# 依存関係のインストール
COPY package*.json ./
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# Next.jsアプリケーションをビルド
RUN npm run build

# アプリケーションのエクスポートポート
EXPOSE 3000

# アプリケーションの起動コマンド
CMD ["npm", "start"]
