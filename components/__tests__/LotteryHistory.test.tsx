import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LotteryHistory from '../LotteryHistory';
import { useLotteryContext } from '../../context/context';

// Mock the context
vi.mock('../../context/context', () => ({
  useLotteryContext: vi.fn()
}));

describe('LotteryHistory Component', () => {
  it('shows loading state initially', () => {
    vi.mocked(useLotteryContext).mockReturnValue({
      contract: {
        getPastRounds: vi.fn().mockResolvedValue([])
      }
    });

    render(<LotteryHistory />);
    expect(screen.getByText(/loading lottery history/i)).toBeInTheDocument();
  });

  it('displays error when contract is not initialized', async () => {
    vi.mocked(useLotteryContext).mockReturnValue({
      contract: null
    });

    render(<LotteryHistory />);
    
    await waitFor(() => {
      expect(screen.getByText(/contract not initialized/i)).toBeInTheDocument();
    });
  });

  it('renders lottery history when data is available', async () => {
    const mockHistory = [
      {
        roundId: 1,
        timestamp: new Date('2023-01-01'),
        potSize: '10 ETH',
        winner: '0x123...',
        participants: ['0x456...', '0x789...']
      }
    ];

    vi.mocked(useLotteryContext).mockReturnValue({
      contract: {
        getPastRounds: vi.fn().mockResolvedValue(mockHistory)
      }
    });

    render(<LotteryHistory />);

    await waitFor(() => {
      expect(screen.getByText('Lottery History')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // RoundId
      expect(screen.getByText('10 ETH')).toBeInTheDocument(); // Pot Size
    });
  });
});