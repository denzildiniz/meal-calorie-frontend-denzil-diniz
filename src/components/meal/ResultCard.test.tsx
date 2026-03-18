import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultCard from './ResultCard';
import { useMealStore } from '@/stores/mealStore';

// Mock dependencies
vi.mock('@/stores/mealStore');

describe('ResultCard', () => {
  const mockResult = {
    dish: 'Chicken Biryani',
    servings: 2,
    caloriesPerServing: 450,
    totalCalories: 900,
    source: 'USDA',
    macrosPerServing: {
      protein: 25,
      carbohydrates: 50,
      total_fat: 20,
      fiber: 3,
      sugars: 5,
      saturated_fat: 4,
    },
    totalMacros: {
      protein: 50,
      carbohydrates: 100,
      total_fat: 40,
      fiber: 6,
      sugars: 10,
      saturated_fat: 8,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when no result', () => {
    (useMealStore as any).mockReturnValue({ lastResult: null });

    const { container } = render(<ResultCard />);
    expect(container.firstChild).toBeNull();
  });

  it('renders result card with correct data', () => {
    (useMealStore as any).mockReturnValue({ lastResult: mockResult });

    render(<ResultCard />);

    expect(screen.getByText('Chicken Biryani')).toBeInTheDocument();
    expect(screen.getByText('900 KCAL')).toBeInTheDocument();
    expect(screen.getByText('2 Servings')).toBeInTheDocument();
    expect(screen.getByText('Analysis Result')).toBeInTheDocument();
  });

  it('displays macro distribution correctly', () => {
    (useMealStore as any).mockReturnValue({ lastResult: mockResult });

    render(<ResultCard />);

    expect(screen.getByText('Protein')).toBeInTheDocument();
    expect(screen.getByText('50g')).toBeInTheDocument();
    expect(screen.getByText('Carbs')).toBeInTheDocument();
    expect(screen.getByText('100g')).toBeInTheDocument();
    expect(screen.getByText('Fats')).toBeInTheDocument();
    expect(screen.getByText('40g')).toBeInTheDocument();
  });

  it('displays additional macro details', () => {
    (useMealStore as any).mockReturnValue({ lastResult: mockResult });

    render(<ResultCard />);

    expect(screen.getByText('Fiber')).toBeInTheDocument();
    expect(screen.getByText('6g')).toBeInTheDocument();
    expect(screen.getByText('Sugars')).toBeInTheDocument();
    expect(screen.getByText('10g')).toBeInTheDocument();
    expect(screen.getByText('Sat. Fat')).toBeInTheDocument();
    expect(screen.getByText('8g')).toBeInTheDocument();
  });

  it('displays source information when available', () => {
    (useMealStore as any).mockReturnValue({ lastResult: mockResult });

    render(<ResultCard />);

    expect(screen.getByText('Verified via USDA database')).toBeInTheDocument();
  });

  it('handles null macro values gracefully', () => {
    const resultWithNullMacros = {
      ...mockResult,
      totalMacros: {
        protein: null,
        carbohydrates: null,
        total_fat: null,
        fiber: null,
        sugars: null,
        saturated_fat: null,
      },
    };

    (useMealStore as any).mockReturnValue({ lastResult: resultWithNullMacros });

    render(<ResultCard />);

    expect(screen.getAllByText('0g')).toHaveLength(6); // All macro values should show 0
  });

  it('handles single serving correctly', () => {
    const singleServingResult = {
      ...mockResult,
      servings: 1,
    };

    (useMealStore as any).mockReturnValue({ lastResult: singleServingResult });

    render(<ResultCard />);

    expect(screen.getByText('1 Serving')).toBeInTheDocument();
  });
});