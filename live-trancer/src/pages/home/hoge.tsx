'use client';

import { useState, useEffect } from 'react';
import styles from './home.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import io from "socket.io-client";
import Link from "next/link";
import { useRouter } from 'next/router';

interface HomeProps {
    isChoosen: boolean;
    setIsChoosen: (value: boolean) => void;
    isMildTranslation: boolean;
    setIsMildTranslation: (value: boolean) => void;
}

export default function home() {
    return (
        <div className={styles.container}>
            <div className={styles.bgSlideshow}>
                <div className={styles.bgSlide}></div>
                <div className={styles.bgSlide}></div>
                <div className={styles.bgSlide}></div>
                <div className={styles.bgSlide}></div>
                <div className={styles.bgSlide}></div>
            </div>
            <div className={styles.bgOverlay}>
                <p className={styles.title}>LiveTrancer</p>
                <p className={styles.description}>あなたの声を、より丁寧に、</p>
                <p className={styles.description}>専門用語をより分かりやすく</p>
                <button className={styles.startButton}>
                    <Link href="/dashboard" className={styles.Start}>
                        Start
                    </Link>
                </button>
            </div>
        </div>
    );
    
}