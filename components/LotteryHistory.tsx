import React from 'react';
import styles from '../styles/LotteryHistory.module.css';

export interface LotteryRound {
  id: number;
  date: string;
  potSize: string;
  winner: string;
  participants: number;
}

interface LotteryHistoryProps {
  rounds: LotteryRound[];
}

const LotteryHistory: React.FC<LotteryHistoryProps> = ({ rounds }) => {
  if (!rounds || rounds.length === 0) {
    return <div className={styles.emptyState}>No lottery history available</div>;
  }

  return (
    <div className={styles.historyContainer}>
      <h2>Lottery History</h2>
      <table className={styles.historyTable}>
        <thead>
          <tr>
            <th>Round</th>
            <th>Date</th>
            <th>Pot Size</th>
            <th>Winner</th>
            <th>Participants</th>
          </tr>
        </thead>
        <tbody>
          {rounds.map((round) => (
            <tr key={round.id}>
              <td>{round.id}</td>
              <td>{round.date}</td>
              <td>{round.potSize} ETH</td>
              <td>{round.winner.slice(0, 6)}...{round.winner.slice(-4)}</td>
              <td>{round.participants}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LotteryHistory;