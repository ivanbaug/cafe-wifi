import { Container } from 'react-bootstrap';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import CafeScreen from './screens/CafeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditCafeScreen from './screens/EditCafeScreen';
import MyCafesScreen from './screens/MyCafesScreen';


function App() {
  return (
    <HashRouter>
      <Header />
      <main className='py-3'>
        <Container className='cont-width'>
          <Routes>
            <Route path='/' exact element={<HomeScreen />} />
            <Route path='/my_cafes' element={<MyCafesScreen />} />
            <Route path='/cafe/:id' element={<CafeScreen />} />
            <Route path='/cafe/:id/edit' element={<EditCafeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </HashRouter>
  );
}

export default App;
