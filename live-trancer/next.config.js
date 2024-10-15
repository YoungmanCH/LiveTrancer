const isProd = process.env.NODE_ENV === "production";

module.exports = {
  output: "export", // 静的サイトエクスポートを有効化
  assetPrefix: isProd ? "/LiveTrancer/" : "",
  images: {
    unoptimized: true, // GitHub Pagesは画像最適化非対応のため
  },
};
