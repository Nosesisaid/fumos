import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface Fumo {
  _id: string;
  URL: string;
  caption: string;
  fumos: string[];
}
const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps<{
  fumos: Fumo[];
}> = async () => {
  const res = await fetch("https://fumo-api.nosesisaid.com/fumos");
  const fumos = await res.json();

  return { props: { fumos } };
};

export default function Home({
  fumos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isNotificationShowing, showNotification] = useState(false);

  return (
    <>
      <Head>
        <title>Fumos.</title>
        <meta property="og:title" content="Fumos." />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://fumos.nosesisaid.com"
        />
        <meta
          property="og:image"
          content="/fumos_banner.png"
        />

        <meta name="description" content="Fumos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <h1>Fumos.</h1>
          <div>
            <a
              href="https://nosesisaid.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://avatars.githubusercontent.com/u/81916154?s=400&u=10adc70a8c809cdbf1df6d861730b7edfce90abf&v=4"
                alt="NOsesisaid Logo"
                className={styles.logo}
                width={100}
                height={100}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.grid}>
          {fumos.map((fumo) => {
            return (
              <div
                onClick={() => {
                  navigator.clipboard.writeText(fumo.URL);
                  showNotification(true);
                  setTimeout(() => {
                    showNotification(false);
                  }, 600);
                }}
                className={styles.card}
              >
                {!fumo.URL.endsWith(".mp4") && (
                  <img src={fumo.URL} alt={fumo._id} />
                )}
                {fumo.URL.endsWith(".mp4") && (
                  <video
                    src={fumo.URL}
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    controls={false}
                  />
                )}
                <h2></h2>
                <p>{fumo._id}</p>
              </div>
            );
          })}
        </div>
      </main>
      <div
        className={`${styles.notification} ${
          isNotificationShowing ? styles.show : styles.notshow
        }`}
      >
        <p>Copied to clipboard.</p>
      </div>
      <button
        style={{
          backgroundColor: "white",
          height: 40,
          width: 40,
          position: "fixed",
          bottom: 5,
          right: 5,
          borderRadius: 100,
          fontSize: 30,
          cursor: "pointer",
        }}
        onClick={() => {
          scrollTo({ top: 0 });
        }}
      >
        <div
          style={{
            margin: 0,
            position: "absolute",
            top: "50%",
            transform: "translate(-50%,-50%)",
            left: "50%",
          }}
        >
          ↑
        </div>
      </button>
    </>
  );
}
