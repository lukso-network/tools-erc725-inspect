import '@/styles/globals.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { config } from '@/config/wagmi';

import type { AppProps } from 'next/app';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import NetworksProvider from '@/contexts/NetworksContext';
import NavBar from '@/components/layout/NavBar';

// icons
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlusCircle,
  faMinusCircle,
  faUpload,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
library.add(faUpload, faPlusCircle, faMinusCircle, faAngleDown);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NetworksProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <section className="mt-5">
            <Component {...pageProps} />
          </section>
        </QueryClientProvider>
      </WagmiProvider >
    </NetworksProvider>
  );
}

export default MyApp;
