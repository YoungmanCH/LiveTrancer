'use client';

        {/* DEMOページ*/}
//         2. デモエリア（Try Nowセクション）
// リアルタイムデモ: ユーザーが音声をアップロードまたはマイクから録音して、リアルタイムで音声がテキストに変換され、加工されたテキストをもとに音声に戻して返答する機能を提供。
// インタラクティブなUIで「話す」ボタンと「聞く」ボタンを設置し、ユーザーが簡単に試せるように。
// デモの結果をリアルタイムで表示する領域を設け、ユーザーに変換されたテキストと音声を確認させる。


import styles from './modeSelection.module.css';
import { useRouter } from 'next/router';

interface ModeSelectionProps {
    isChoosen: boolean;
    setIsChoosen: (value: boolean) => void;
    isMildTranslation: boolean;
    setIsMildTranslation: (value: boolean) => void;
}

export default function ModeSelection({
    setIsChoosen,
    setIsMildTranslation
}: ModeSelectionProps) {
    const router = useRouter();
    const trialChoosen = () => {
        setIsChoosen(true);
        setIsMildTranslation(false);
        router.push('/trial');
    }
    return (
        <div className={styles.container}>
            <p className={styles.title}>デモンストレーションのモードを選択</p>
            <div className={styles.buttonContainer}>
                <div className={styles.trialContainer}>
                    <h2>trial</h2>
                    <p>IT用語、専門用語など 知識ゼロの状態でも理解出来るように 分かりやすく要約して翻訳してくれる機能。使いながら専門用語の意味を学べる！</p>
                    <button className={styles.trialButton} onClick={trialChoosen}>
                        さっそく使ってみる
                    </button>
                </div>
            </div>
        </div>
    );
}

