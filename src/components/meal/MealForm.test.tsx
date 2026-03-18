import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MealForm from './MealForm';
import { useAuthStore } from '@/stores/authStore';
import { useMealStore } from '@/stores/mealStore';
import { useRateLimit } from '@/hooks/useRateLimit';
import { api } from '@/lib/api';
import { toast } from 'sonner';

// Mock dependencies
vi.mock('@/stores/authStore');
vi.mock('@/stores/mealStore');
vi.mock('@/hooks/useRateLimit');
vi.mock('@/lib/api');
vi.mock('sonner');
vi.mock('next/navigation');

describe('MealForm', () => {
  const mockToken = 'test-token';
  const mockSetResult = vi.fn();
  const mockCanMakeRequest = true;
  const mockTimeUntilReset = null;
  const mockApi = vi.fn();
  const mockToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup mocks
    (useAuthStore as any).mockImplementation((selector: any) => selector({ token: mockToken }));
    (useMealStore as any).mockReturnValue({ setResult: mockSetResult });
    (useRateLimit as any).mockReturnValue({
      canMakeRequest: mockCanMakeRequest,
      timeUntilReset: mockTimeUntilReset,
    });
    (api as any).mockImplementation(mockApi);
    (toast as any).mockImplementation(mockToast);
  });

  it('renders form fields correctly', () => {
    render(<MealForm />);

    expect(screen.getByPlaceholderText('e.g. Avocado Toast or Chicken Biryani')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get nutrition data/i })).toBeInTheDocument();
  });

  it('validates dish name is required', async () => {
    const user = userEvent.setup();
    render(<MealForm />);

    const submitButton = screen.getByRole('button', { name: /get nutrition data/i });
    await user.click(submitButton);

    // The form should prevent submission when invalid
    expect(mockApi).not.toHaveBeenCalled();
  });

  it('submits form successfully', async () => {
    const user = userEvent.setup();
    const mockResponse = {
      dish_name: 'Pizza',
      servings: 2,
      calories_per_serving: 300,
      total_calories: 600,
      source: 'USDA',
      macronutrients_per_serving: {
        protein: 12,
        carbohydrates: 35,
        total_fat: 15,
      },
      total_macronutrients: {
        protein: 24,
        carbohydrates: 70,
        total_fat: 30,
      },
    };

    mockApi.mockResolvedValue(mockResponse);

    render(<MealForm />);

    const dishInput = screen.getByPlaceholderText('e.g. Avocado Toast or Chicken Biryani');
    const servingsInput = screen.getByDisplayValue('1');
    const submitButton = screen.getByRole('button', { name: /get nutrition data/i });

    await user.type(dishInput, 'Pizza');
    await user.clear(servingsInput);
    await user.type(servingsInput, '2');

    // Wait for form to be valid
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(submitButton);

    // Wait for the API call
    await waitFor(() => {
      expect(mockApi).toHaveBeenCalled();
    });

    expect(mockSetResult).toHaveBeenCalledWith({
      dish: 'Pizza',
      servings: 2,
      caloriesPerServing: 300,
      totalCalories: 600,
      source: 'USDA',
      macrosPerServing: {
        protein: 12,
        carbohydrates: 35,
        total_fat: 15,
      },
      totalMacros: {
        protein: 24,
        carbohydrates: 70,
        total_fat: 30,
      },
    });

    expect(mockToast).toHaveBeenCalledWith('Nutrition data retrieved');
  });

  it('handles rate limit exceeded', async () => {
    const user = userEvent.setup();

    (useRateLimit as any).mockReturnValue({
      canMakeRequest: false,
      timeUntilReset: 60000,
    });

    render(<MealForm />);

    const dishInput = screen.getByPlaceholderText('e.g. Avocado Toast or Chicken Biryani');
    const submitButton = screen.getByRole('button', { name: /rate limited/i });

    await user.type(dishInput, 'Pizza');

    expect(submitButton).toBeDisabled();
    expect(screen.getByText('(60s)')).toBeInTheDocument();
  });

  it('handles 403 error by redirecting to login', async () => {
    const user = userEvent.setup();
    const mockRouter = { push: vi.fn() };

    vi.mocked(await import('next/navigation')).useRouter.mockReturnValue(mockRouter);

    mockApi.mockRejectedValue({ status: 403 });

    render(<MealForm />);

    const dishInput = screen.getByPlaceholderText('e.g. Avocado Toast or Chicken Biryani');
    const submitButton = screen.getByRole('button', { name: /get nutrition data/i });

    await user.type(dishInput, 'Pizza');

    // Wait for form to be valid
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith('Session expired. Redirecting to login...');
      expect(mockRouter.push).toHaveBeenCalledWith('/login');
    });
  });
});