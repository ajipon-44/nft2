# ブロックチェーンベースの銀行アプリ

## 目次

1. [使用技術](#使用技術)
2. [環境](#環境)
3. [システム構成](#システム構成)
4. [デプロイ先](#デプロイ先)

<a href="https://github.com/ajipon-44/nft2/blob/main/docs/README.md">
  English README
</a>
<!-- プロジェクトについて -->

## プロジェクトについて

ブロックチェーンベースの銀行アプリ

<!-- プロジェクトの概要を記載 -->

NFT を所持している人だけが，送金，預入，引き出し機能を使用できる．<br>
NFT を所持していない人はお金の受け取りは可能だが，他の処理はできない．

## 使用技術

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

### フロントエンド

| 言語・フレームワーク・ライブラリ | バージョン |
| -------------------------------- | ---------- |
| Node.js                          | 21.1.0     |
| TypeScript                       | 5.2.2      |
| React                            | 18         |
| Next.js                          | 14.0.4     |
| ethers                           | 5.6.9      |

### バックエンド

| 言語・フレームワーク | バージョン |
| -------------------- | ---------- |
| Solidity             | 0.8.9      |
| hardhat              | 2.9.9      |

### インフラ

| 使用技術        | バージョン |
| --------------- | ---------- |
| Vercel          |            |
| Sepolia Network |            |

### CI / CD

| 使用技術       | 使用用途 |
| -------------- | -------- |
| Github Actions | CI       |
| Vercel         | CD       |

## システム構成

<img src="docs/system_schema.png" width="50%">

## デプロイ先

https://nft2-d3r7smpuy-ajipon-44s-projects.vercel.app/
