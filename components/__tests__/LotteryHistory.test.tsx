import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LotteryHistory from '../LotteryHistory';

describe('LotteryHistory Component', () => {
  const mockRounds = [
    {
      id: 1,
      date: '2023-09-15',
      potSize: '10.5',
      winner: '0x1234567890123456789012345678901234567890',
      participants: 250
    }
  ];

  it('renders lottery history table when rounds are provided', () => {
    render(<LotteryHistory rounds={mockRounds} />);
    
    expect(screen.getByText('Lottery History')).toBeInTheDocument();
    expect(screen.getByText('10.5 ETH')).toBeInTheDocument();
    expect(screen.getByText('2023-09-15')).toBeInTheDocument();
  });

  it('shows empty state when no rounds are provided', () => {
    render(<LotteryHistory rounds={[]} />);
    
    expect(screen.getByText('No lottery history available')).toBeInTheDocument();
  });
});