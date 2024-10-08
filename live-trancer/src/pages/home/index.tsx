import styles from "./home.module.css";
import TopSection from "../components/organisms/Home/TopSection/TopSection";
import SampleSection from "../components/organisms/Home/SampleSection/SampleSection";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <TopSection></TopSection>
        <SampleSection></SampleSection>
      </main>
    </div>
  );
}
