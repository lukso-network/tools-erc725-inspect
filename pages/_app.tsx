import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import NavBar from '../components/NavBar';
import NetworksProvider from '../contexts/NetworksContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NetworksProvider>
      <ScopedCssBaseline>
        <NavBar />
        <section className="section">
          <Component {...pageProps} />
        </section>
      </ScopedCssBaseline>
    </NetworksProvider>
  );
}

export default MyApp;
