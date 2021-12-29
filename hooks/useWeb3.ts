/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import { useState, useEffect } from 'react';
import Web3 from 'web3';

import { RPC_URL } from '../globals';

export default function useWeb3() {
  const [web3Info, setWeb3Info] = useState<Web3>();

  useEffect(() => {
    const getWeb3 = async () => {
      const web3 = new Web3(RPC_URL);
      return web3;
    };

    getWeb3().then((web3) => {
      setWeb3Info(web3);
      if (process.env.NODE_ENV === 'development') {
        // @ts-ignore
        window.web3 = web3;
      }
    });
  }, []);

  return web3Info;
}
