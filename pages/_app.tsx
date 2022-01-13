import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ScopedCssBaseline>
      <NavBar />
      <section className="section">
        <Component {...pageProps} />
      </section>
    </ScopedCssBaseline>
  );
}

export default MyApp;
