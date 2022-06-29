import { useFetchProducts } from '../hooks/useFetchProducts';
import { renderHook, waitFor } from '@testing-library/react';

jest.mock('../assets/data/products.json', () => [
  'fallbackProduct1',
  'fallbackProduct2',
  'fallbackProduct3',
]);

it('returns correct output when API call is successful', async () => {
  window.fetch = jest.fn(() => {
    const products = ['fetchedProduct1', 'fetchedProduct2', 'fetchedProduct3'];

    return Promise.resolve({
      json: () => Promise.resolve(products),
      ok: true,
    });
  });

  const { result } = renderHook(() => useFetchProducts());

  await waitFor(() => {
    expect(result.current).toEqual({
      isLoading: false,
      error: null,
      products: ['fetchedProduct1', 'fetchedProduct2', 'fetchedProduct3'],
    });
  });
});

it('returns correct output when API call is unsuccessful', async () => {
  window.fetch = jest.fn(() => Promise.reject('error'));

  const { result } = renderHook(() => useFetchProducts());

  await waitFor(() => {
    expect(result.current).toEqual({
      isLoading: false,
      error: 'error',
      products: ['fallbackProduct1', 'fallbackProduct2', 'fallbackProduct3'],
    });
  });
});

it('returns correct output when response.ok is false', async () => {
  window.fetch = jest.fn(() => {
    const products = ['fetchedProduct1', 'fetchedProduct2', 'fetchedProduct3'];

    return Promise.resolve({
      json: () => Promise.resolve(products),
      ok: false,
    });
  });

  const { result } = renderHook(() => useFetchProducts());

  await waitFor(() => {
    expect(result.current).toEqual(
      expect.objectContaining({
        isLoading: false,
        products: ['fallbackProduct1', 'fallbackProduct2', 'fallbackProduct3'],
      })
    );
  });
});

it('returns correct output when API call times out', async () => {
  jest.useFakeTimers();

  window.fetch = jest.fn(async () => {
    const products = ['fetchedProduct1', 'fetchedProduct2', 'fetchedProduct3'];

    // Force fetch to take longer than the timeout
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    return Promise.resolve({
      json: () => Promise.resolve(products),
      ok: true,
    });
  });

  const { result } = renderHook(() => useFetchProducts());

  jest.advanceTimersByTime(2000);

  await waitFor(() => {
    expect(result.current).toEqual(
      expect.objectContaining({
        isLoading: false,
        products: ['fallbackProduct1', 'fallbackProduct2', 'fallbackProduct3'],
      })
    );
  });
});
