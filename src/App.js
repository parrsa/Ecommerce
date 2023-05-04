import { Container } from 'react-bootstrap'
import Footer from './Components/Footer';
import Header from './Components/Header'
import HomeScrenns from './screens/HomeScrenns';
import PeroductDetils from './screens/ProductDetils'
import CartScreen from './screens/CartScreen';
import { Route, Router, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScrenn from './screens/ProfileScrenn';
import ShippingScrenn from './screens/ShippingScrenn';
import { PaymentScreen } from './screens/PaymentScreen';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import { OrderScreen } from './screens/OrderScreen';
function App() {
  return (
    <div>
      <Header />

      <main className='py-3'>
        <Container>

          <Routes>
            <Route path='/' element={<HomeScrenns />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/shipping' element={<ShippingScrenn />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/profile' element={<ProfileScrenn />} />
            <Route path='/product/:_id' element={<PeroductDetils />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
          </Routes>

        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default App;
