# 手順書

<p align="center">
<img src="https://img.shields.io/badge/python-3.13.0-blue">
</p>

## セットアップ

既にセットアップが完了している場合は、飛ばしてください。

<br />

1. まず、`git clone GitHubのレポジトリ`を実行し、レポジトリをダウンロードします。

   （git がインストールされていない場合は、先にインストールして下さい）<br />
   [Gitのインストール方法](URL "https://ar-aca.tech/posts/git-installation-guide/")

<br />

2. clone 後、`cd GitHubのレポジトリ`を実行し、ディレクトリ内に移動します。

<br />

3. 次に、`venv`を用いて仮想環境を作成します。以下のコマンドを実行してください。
   <br />
   （Python がインストールされていない場合は、先にインストールして下さい）
   <br />
   [Pythonのインストール方法(Linux/Mac)](URL "https://blog.pyq.jp/entry/python_install_241030_mac")
   <br />
   [Pythonのインストール方法(Windows)](URL "https://blog.pyq.jp/entry/python_install_241030_win")

   (Linux/Mac OS の場合)

   ```
   python3 -m venv venv
   . venv/bin/activate
   ```

   (Windwos OS の場合、python を実行。)

   ```
   python -m venv venv
   venv\Scripts\activate
   ```

<br />

4. 仮想環境を作成したら、ライブラリをインストールします。

   (Linux/Mac OS の場合)

   ```
    pip3 install -r requirements.txt
   ```

   (Windwos OS の場合)

   ```
   pip install -r requirements.txt
   ```

<br />

5. これでセットアップは完了です。

<br />
<br />

##  others. pip環境をアップロードする

```
pip3  freeze > requirements.txt
```

<br />

```
pip  freeze > requirements.txt
```