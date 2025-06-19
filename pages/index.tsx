import React from 'react';
import Head from 'next/head';
import { ConnectWalletBtn } from '../components/ConnectWalletBtn';
import LotteryCard from '../components/LotteryCard';
import Header from '../components/Header';
import LotteryHistory from '../components/LotteryHistory';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blockchain Lottery</title>
        <meta name="description" content="Decentralized Lottery Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className={styles.main}>
        <ConnectWalletBtn />
        
        <div className={styles.gridContainer}>
          <LotteryCard />
          <LotteryHistory />
        </div>
      </main>
    </div>
  );
};

export default Home;