import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ScopedCssBaseline>
      <Component {...pageProps} />
    </ScopedCssBaseline>
  );
}

export default MyApp;
