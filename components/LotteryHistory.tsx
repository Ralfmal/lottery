import React, { useState, useEffect } from 'react';
import { useLotteryContext } from '../context/context';
import Table from './Table';
import styles from '../styles/Table.module.css';

export interface LotteryRound {
  roundId: number;
  timestamp: Date;
  potSize: string;
  winner: string;
  participants: string[];
}

const LotteryHistory: React.FC = () => {
  const { contract } = useLotteryContext();
  const [history, setHistory] = useState<LotteryRound[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLotteryHistory = async () => {
      if (!contract) {
        setError('Contract not initialized');
        setIsLoading(false);
        return;
      }

      try {
        // Simulated history fetching - replace with actual contract method
        const rounds: LotteryRound[] = await contract.getPastRounds();
        setHistory(rounds);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch lottery history:', err);
        setError('Failed to load lottery history');
        setIsLoading(false);
      }
    };

    fetchLotteryHistory();
  }, [contract]);

  if (isLoading) return <div>Loading lottery history...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (history.length === 0) return <div>No lottery history available</div>;

  const historyHeaders = ['Round', 'Date', 'Pot Size', 'Winner', 'Participants'];
  const historyRows = history.map(round => [
    round.roundId.toString(),
    round.timestamp.toLocaleDateString(),
    round.potSize,
    round.winner,
    round.participants.length.toString()
  ]);

  return (
    <div className={styles.historyContainer}>
      <h2>Lottery History</h2>
      <Table headers={historyHeaders} rows={historyRows} />
    </div>
  );
};

export default LotteryHistory;