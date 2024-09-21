'use client';

import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";
import { useRouter } from 'next/router';

interface DashboardProps {
    isChoosen: boolean;
    setIsChoosen: (value: boolean) => void;
    isMildTranslation: boolean;
    setIsMildTranslation: (value: boolean) => void;
}

export default function Dashboard({
    isChoosen,
    setIsChoosen,
    isMildTranslation,
    setIsMildTranslation
}: DashboardProps) {
    const router = useRouter();
    const GeneralChoosen = () => {
        setIsChoosen(true);
        setIsMildTranslation(true);
        router.push('/general');

    }
    const ProfessionalChoosen = () => {
        setIsChoosen(true);
        setIsMildTranslation(false);
        router.push('/professional');
    }
    return (
        <div className={styles.container}>
            <p className={styles.title}>モードを選択</p>
            <div className={styles.buttonContainer}>
                <div className={styles.generalContainer}>
                    <h2>General</h2>
                    <p>どんなに余裕の無い時でも自分の声を丁寧な日本語にトランスレートしてくれる機能</p>
                    <button className={styles.generalButton} onClick={GeneralChoosen}>
                        さっそく使ってみる
                    </button>
                </div>
                <div className={styles.professionalContainer}>
                    <h2>Professional</h2>
                    <p>IT用語、専門用語など 知識ゼロの状態でも理解出来るように 分かりやすく要約して翻訳してくれる機能。使いながら専門用語の意味を学べる！</p>
                    <button className={styles.professionalButton} onClick={ProfessionalChoosen}>
                        さっそく使ってみる
                    </button>
                </div>
            </div>
        </div>
    );
}

