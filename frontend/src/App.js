import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import CafeScreen from './screens/CafeScreen';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container className='cont-width'>
          <Routes>
            <Route path='/' exact element={<HomeScreen />} />
            <Route path='/cafe/:id' element={<CafeScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
