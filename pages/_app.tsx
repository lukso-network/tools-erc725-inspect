import '@/styles/globals.scss';
import 'react-loading-skeleton/dist/skeleton.css';

import type { AppProps } from 'next/app';

import NavBar from '@/components/NavBar';
import NetworksProvider from '@/contexts/NetworksContext';

// icons
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlusCircle,
  faMinusCircle,
  faUpload,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
library.add(faUpload, faPlusCircle, faMinusCircle, faAngleDown);

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
