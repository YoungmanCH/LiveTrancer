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

export default function dashboard({
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
                <button className={styles.generalButton} onClick={GeneralChoosen}>
                    General
                </button>
                <button className={styles.professionalButton} onClick={ProfessionalChoosen}>
                    Professional
                </button>
            </div>
        </div>
    );
}

