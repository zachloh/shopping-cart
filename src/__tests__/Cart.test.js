import { renderWithRouter, screen } from '../test-utils/test-utils';
import userEvent from '@testing-library/user-event';
import ReactDOM from 'react-dom';
import AppRoutes from '../routes/AppRoutes';

import { config } from 'react-transition-group';

config.disabled = true;

jest.mock('../hooks/useFetchProducts', () => ({
  useFetchProducts: () => {
    return {
      isLoading: false,
      error: null,
      products: [
        { id: 1, title: 'product1', price: 10 },
        { id: 2, title: 'product2', price: 20 },
      ],
    };
  },
}));

beforeEach(() => {
  ReactDOM.createPortal = jest.fn((element) => {
    return element;
  });
});

it('displays cart details correctly when "Add to Cart" is clicked', async () => {
  const user = userEvent.setup();
  renderWithRouter(<AppRoutes />, { route: '/shop' });

  const addToCartBtns = screen.getAllByRole('button', {
    name: 'Add to Cart',
  });
  await user.click(addToCartBtns[0]);
  await user.click(addToCartBtns[1]);

  const cartIcon = screen.getByRole('img', { name: /cart icon/i });
  await user.click(cartIcon);

  const productNames = screen.getAllByTestId('product-name');
  expect(productNames).toHaveLength(2);
  expect(productNames[0]).toHaveTextContent('product1');
  expect(productNames[1]).toHaveTextContent('product2');

  const productPrices = screen.getAllByTestId('product-price');
  expect(productPrices[0]).toHaveTextContent('$10.00');
  expect(productPrices[1]).toHaveTextContent('$20.00');

  const productQuantities = screen.getAllByTestId('product-quantity');
  expect(productQuantities[0]).toHaveTextContent('1');
  expect(productQuantities[1]).toHaveTextContent('1');

  const totalPrice = screen.getByTestId('total-price');
  expect(totalPrice).toHaveTextContent('$30.00');
});

it('updates price and quantity correctly when "+" button is clicked', async () => {
  const user = userEvent.setup();
  renderWithRouter(<AppRoutes />, { route: '/shop' });

  const addToCartBtns = screen.getAllByRole('button', {
    name: 'Add to Cart',
  });
  await user.click(addToCartBtns[0]);
  await user.click(addToCartBtns[1]);

  const cartIcon = screen.getByRole('img', { name: /cart icon/i });
  await user.click(cartIcon);

  const plusBtns = screen.getAllByRole('button', { name: '+' });
  await user.click(plusBtns[0]);
  await user.click(plusBtns[1]);

  const productPrices = screen.getAllByTestId('product-price');
  expect(productPrices[0]).toHaveTextContent('$20.00');
  expect(productPrices[1]).toHaveTextContent('$40.00');

  const productQuantities = screen.getAllByTestId('product-quantity');
  expect(productQuantities[0]).toHaveTextContent('2');
  expect(productQuantities[1]).toHaveTextContent('2');

  const totalPrice = screen.getByTestId('total-price');
  expect(totalPrice).toHaveTextContent('$60.00');
});

it('updates price and quantity correctly when "-" button is clicked', async () => {
  const user = userEvent.setup();
  renderWithRouter(<AppRoutes />, { route: '/shop' });

  const addToCartBtns = screen.getAllByRole('button', {
    name: 'Add to Cart',
  });
  await user.click(addToCartBtns[0]);
  await user.click(addToCartBtns[0]);
  await user.click(addToCartBtns[1]);
  await user.click(addToCartBtns[1]);
  await user.click(addToCartBtns[1]);

  const cartIcon = screen.getByRole('img', { name: /cart icon/i });
  await user.click(cartIcon);

  const minusBtns = screen.getAllByRole('button', { name: '−' });
  await user.click(minusBtns[0]);
  await user.click(minusBtns[1]);
  await user.click(minusBtns[1]);

  const productPrices = screen.getAllByTestId('product-price');
  expect(productPrices[0]).toHaveTextContent('$10.00');
  expect(productPrices[1]).toHaveTextContent('$20.00');

  const productQuantities = screen.getAllByTestId('product-quantity');
  expect(productQuantities[0]).toHaveTextContent('1');
  expect(productQuantities[1]).toHaveTextContent('1');

  const totalPrice = screen.getByTestId('total-price');
  expect(totalPrice).toHaveTextContent('$30.00');
});

it('removes cart item when the quantity is 0', async () => {
  const user = userEvent.setup();
  renderWithRouter(<AppRoutes />, { route: '/shop' });

  const addToCartBtns = screen.getAllByRole('button', {
    name: 'Add to Cart',
  });
  await user.click(addToCartBtns[0]);

  const cartIcon = screen.getByRole('img', { name: /cart icon/i });
  await user.click(cartIcon);

  const productName = screen.getByTestId('product-name');
  expect(productName).toBeInTheDocument();

  const totalPrice = screen.getByTestId('total-price');
  expect(totalPrice).toHaveTextContent('$10.00');

  const minusBtn = screen.getByRole('button', { name: '−' });
  await user.click(minusBtn);

  const nullProductName = screen.queryByTestId('product-name');
  expect(nullProductName).not.toBeInTheDocument();

  const newTotalPrice = screen.getByTestId('total-price');
  expect(newTotalPrice).toHaveTextContent('$0.00');
});
