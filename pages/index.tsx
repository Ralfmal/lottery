import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import LotteryCard from '../components/LotteryCard';
import LotteryHistory from '../components/LotteryHistory';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [lotteryRounds] = useState([
    {
      id: 1,
      date: '2023-09-15',
      potSize: '10.5',
      winner: '0x1234567890123456789012345678901234567890',
      participants: 250
    },
    {
      id: 2,
      date: '2023-09-22',
      potSize: '15.2',
      winner: '0x0987654321098765432109876543210987654321',
      participants: 375
    }
  ]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Lottery Dapp</title>
        <meta name="description" content="Blockchain Lottery Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className={styles.main}>
        <LotteryCard />
        <LotteryHistory rounds={lotteryRounds} />
      </main>
    </div>
  );
}