import AppRoutes from './routes/AppRoutes';
import { CartContextProvider } from './context/CartContext';

function App() {
  return (
    <CartContextProvider>
      <AppRoutes />
    </CartContextProvider>
  );
}

export default App;
