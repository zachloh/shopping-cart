import { renderWithRouter, screen } from '../test-utils/test-utils';
import AppRoutes from '../routes/AppRoutes';

jest.mock('../layout/Sidebar/Sidebar');
jest.mock('../hooks/useFetchProducts', () => ({
  useFetchProducts: () => {
    return {
      isLoading: false,
      error: null,
      products: [],
    };
  },
}));

describe('Searching URLs directly:', () => {
  it('renders home page when path is "/"', () => {
    renderWithRouter(<AppRoutes />);

    const homeHeroText = screen.getByText('DISCOVER FASHION');
    expect(homeHeroText).toBeInTheDocument();
  });

  it('renders shop page when path is "/shop"', () => {
    renderWithRouter(<AppRoutes />, { route: '/shop' });

    const productsHeader = screen.getByRole('heading', {
      name: /all products/i,
    });
    expect(productsHeader).toBeInTheDocument();
  });

  it('renders home page when path is invalid', () => {
    renderWithRouter(<AppRoutes />, { route: '/invalid-route' });

    const homeHeroText = screen.getByText('DISCOVER FASHION');
    expect(homeHeroText).toBeInTheDocument();
  });
});

describe('Routing to shop page:', () => {
  it('routes correctly when "SHOP" nav link is clicked', async () => {
    const { user } = renderWithRouter(<AppRoutes />);

    const shopLink = screen.getByRole('link', { name: 'SHOP' });
    await user.click(shopLink);

    const productsHeader = screen.getByRole('heading', {
      name: /all products/i,
    });
    expect(productsHeader).toBeInTheDocument();
  });

  it('routes correctly when "Go to shop" button is clicked', async () => {
    const { user } = renderWithRouter(<AppRoutes />);

    const goToShopBtn = screen.getByRole('button', { name: /go to shop/i });
    await user.click(goToShopBtn);

    const productsHeader = screen.getByRole('heading', {
      name: /all products/i,
    });
    expect(productsHeader).toBeInTheDocument();
  });
});

describe('Routing to home page:', () => {
  it('routes correctly when "HOME" nav link is clicked', async () => {
    const { user } = renderWithRouter(<AppRoutes />, { route: '/shop' });

    const homeLink = screen.getByRole('link', { name: 'HOME' });
    await user.click(homeLink);

    const homeHeroText = screen.getByText('DISCOVER FASHION');
    expect(homeHeroText).toBeInTheDocument();
  });

  it('routes correctly when store logo is clicked', async () => {
    const { user } = renderWithRouter(<AppRoutes />, { route: '/shop' });

    const storeLogo = screen.getByRole('link', { name: /fakestore/i });
    await user.click(storeLogo);

    const homeHeroText = screen.getByText('DISCOVER FASHION');
    expect(homeHeroText).toBeInTheDocument();
  });
});
