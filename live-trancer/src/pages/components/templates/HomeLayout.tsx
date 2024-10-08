import Head from "next/head";
import { ReactNode, useEffect, useRef } from "react";
import Header from "../organisms/Header";

interface LayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: LayoutProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustPadding = () => {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const mainContent = document.querySelector("main") as HTMLElement | null;
  
      if (mainContent) {
        mainContent.style.paddingTop = `${headerHeight}px`;
      }
    };
  
    setTimeout(adjustPadding, 0);
    window.addEventListener("resize", adjustPadding);
  
    return () => {
      window.removeEventListener("resize", adjustPadding);
    };
  }, [headerRef]);
  

  return (
    <div>
      <Head>
        <title>Live Trancer</title>
        <meta
          name="description"
          content="Real-time voice changer powered by AI"
        />
      </Head>
      <Header ref={headerRef} />
      <main>{children}</main>
    </div>
  );
}
