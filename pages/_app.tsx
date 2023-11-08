import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import NavBar from '../components/NavBar';
import NetworksProvider from '../contexts/NetworksContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NetworksProvider>
      <NavBar />
      <section className="section">
        <Component {...pageProps} />
      </section>
    </NetworksProvider>
  );
}

export default MyApp;
