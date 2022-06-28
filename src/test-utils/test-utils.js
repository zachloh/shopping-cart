import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartContextProvider } from '../context/CartContext';
import { BrowserRouter } from 'react-router-dom';

const AllTheProviders = ({ children }) => {
  return (
    <CartContextProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </CartContextProvider>
  );
};

export const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllTheProviders }),
  };
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
