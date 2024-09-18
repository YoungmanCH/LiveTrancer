# 1. ベースイメージを指定（Python 3.9を使用）
FROM python:3.12.4

# 2. 作業ディレクトリを設定
WORKDIR /app

# 3. 必要なパッケージをインストール（例: libpq-devなど）
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 4. 依存関係（requirements.txt）をコンテナにコピー
COPY requirements.txt .

# 5. 依存関係をインストール
RUN pip install --no-cache-dir -r requirements.txt

# 6. アプリケーションコードをコンテナにコピー
COPY . .

# 7. gunicornの設定を追加
RUN pip install gunicorn

# 8. ポートを指定（デフォルトは5000）
EXPOSE 5000

# 9. gunicornを使用してアプリを起動（w: ワーカー数、b: バインドするアドレス）
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
