
import CafeCard from '../components/CafeCard';
import cafes from '../cafes';

const HomeScreen = () => {
  return (
    <>
      <h3 >Latest entries</h3>
      {
        cafes.map((cafe) => (
          <CafeCard key={cafe.id} cafe={cafe} />
        ))
      }
    </>
  );
};

export default HomeScreen;
