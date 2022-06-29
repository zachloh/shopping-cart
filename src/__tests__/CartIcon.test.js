// This is the test file for the cart icon in the header
// Note: There is no CartIcon component

import { render, renderWithRouter, screen } from '../test-utils/test-utils';
import userEvent from '@testing-library/user-event';
import ReactDOM from 'react-dom';
import Header from '../layout/Header/Header';
import AppRoutes from '../routes/AppRoutes';

import { config } from 'react-transition-group';

config.disabled = true;

jest.mock('../hooks/useFetchProducts', () => ({
  useFetchProducts: () => {
    return {
      isLoading: false,
      error: null,
      products: [{ id: 1 }, { id: 2 }],
    };
  },
}));

beforeEach(() => {
  ReactDOM.createPortal = jest.fn((element) => {
    return element;
  });
});

describe('Opening and closing cart sidebar:', () => {
  it('opens the sidebar when the cart icon is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const cartTitle1 = screen.queryByText(/cart/i);
    expect(cartTitle1).not.toBeInTheDocument();

    const cartIcon = screen.getByRole('img', { name: /cart icon/i });
    await user.click(cartIcon);

    const cartTitle2 = screen.getByText(/cart/i);
    expect(cartTitle2).toBeInTheDocument();
  });

  it('closes the sidebar when the "close" button is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const cartIcon = screen.getByRole('img', { name: /cart icon/i });
    await user.click(cartIcon);

    const closeBtn = screen.getByRole('button', { name: /✕/i });
    await user.click(closeBtn);

    const cartTitle = screen.queryByText(/cart/i);
    expect(cartTitle).not.toBeInTheDocument();
  });

  it('closes the sidebar when the overlay is clicked', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const cartIcon = screen.getByRole('img', { name: /cart icon/i });
    await user.click(cartIcon);

    const overlay = screen.getByTestId('overlay');
    await user.click(overlay);

    const cartTitle = screen.queryByText(/cart/i);
    expect(cartTitle).not.toBeInTheDocument();
  });
});

describe('Cart badge:', () => {
  it('updates correctly when "Add to Cart" is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<AppRoutes />, { route: '/shop' });

    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent(0);

    const addToCartBtns = screen.getAllByRole('button', {
      name: 'Add to Cart',
    });
    await user.click(addToCartBtns[0]);

    const badge2 = screen.getByRole('status');
    expect(badge2).toHaveTextContent(1);

    await user.click(addToCartBtns[1]);

    const badge3 = screen.getByRole('status');
    expect(badge3).toHaveTextContent(2);
  });

  it('updates correctly when "+" and "-" buttons are clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<AppRoutes />, { route: '/shop' });

    const addToCartBtns = screen.getAllByRole('button', {
      name: 'Add to Cart',
    });
    await user.click(addToCartBtns[0]);

    const cartBtn = screen.getByRole('img', { name: /cart icon/i });
    await user.click(cartBtn);

    const plusBtn = screen.getByRole('button', { name: '+' });
    await user.click(plusBtn);

    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent(2);

    const minusBtn = screen.getByRole('button', { name: '−' });
    await user.click(minusBtn);

    const badge2 = screen.getByRole('status');
    expect(badge2).toHaveTextContent(1);
  });
});
