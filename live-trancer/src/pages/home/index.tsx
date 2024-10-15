import styles from "./home.module.css";
import TopSection from "../components/organisms/Home/TopSection/TopSection";
import SampleSection from "../components/organisms/Home/SampleSection/SampleSection";
import AbstractSection from "../components/organisms/Home/AbstractSection/AbstractSection";
import SttSection from "../components/organisms/Home/SttSection/SttSection";
import TransformTextSection from "../components/organisms/Home/TransformTextSection/TransformTextSection";
import TtsSection from "../components/organisms/Home/TtsSection/TtsSection";
import ApiSection from "../components/organisms/Home/ApiSection/ApiSection";
import StsSection from "../components/organisms/Home/StsSection/StsSection";
import UseCasesSection from "../components/organisms/Home/UseCasesSection/UseCasesSection";
import ContactSection from "../components/organisms/Home/ContactSection/ContactSection";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <TopSection></TopSection>
        <SampleSection></SampleSection>
        <AbstractSection></AbstractSection>
        <SttSection></SttSection>
        <TransformTextSection></TransformTextSection>
        <TtsSection></TtsSection>
        <ApiSection></ApiSection>
        <StsSection></StsSection>
        <UseCasesSection></UseCasesSection>
        <ContactSection></ContactSection>

        {/* 
          参考デザインサイト：
            明るい   https://getzowie.com/
            ダークでクール    https://www.raycast.com/
        */}
      </main>
    </div>
  );
}
