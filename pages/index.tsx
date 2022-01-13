import type { NextPage } from 'next';

import NavBar from '../components/NavBar';

const Home: NextPage = () => {
  return (
    <section>
      <NavBar />
      <div>ERC725 tools</div>;
    </section>
  );
};

export default Home;
