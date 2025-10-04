import type { NextPage } from 'next';
import Head from 'next/head';

import KeyManagerNonceChecker from '@/components/features/KeyManagerNonceChecker';
import KeyManagerPermissions from '@/components/features/KeyManagerPermissions';

const KeyManager: NextPage = () => {
  return (
    <>
      <Head>
        <title>Key Manager - ERC725 Tools</title>
      </Head>

      <KeyManagerPermissions />
      <KeyManagerNonceChecker />
    </>
  );
};

export default KeyManager;
