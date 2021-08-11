import Head from 'next/head';
import styles from '../../styles/Home.module.scss';

export default function Home() {
  return (
    <div>
      <Head>
        <title>About</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.Main}>
        <h1>Welcome to About</h1>
      </main>
    </div>
  );
}
