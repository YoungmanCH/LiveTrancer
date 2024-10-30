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
            <p className={styles.title}>お試しモードを選択</p>
            <div className={styles.buttonContainer}>
                <div className={styles.trialContainer}>
                    <h2>TRIAL</h2>
                    <p>このモードでは、会話をリアルタイムで文字に変換し、さらに加工済み音声として即時ダウンロードすることができます。</p>
                    <button className={styles.trialButton} onClick={trialChoosen}>
                        さっそく使ってみる
                    </button>
                </div>
            </div>
        </div>
    );
}

