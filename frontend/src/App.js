import { Container } from 'react-bootstrap';


import Header from './components/Header';
import Footer from './components/Footer';
import CafeCard from './components/CafeCard';


function App() {
  return (
    <div>

      <Header />
      <main className='py-3'>
        <Container fluid='md'>

          <CafeCard />
          <CafeCard />
          <CafeCard />
        </Container>
      </main>
      <Footer />

    </div>
  );
}

export default App;
