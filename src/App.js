import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { CartContextProvider } from './context/CartContext';

function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
