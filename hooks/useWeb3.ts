/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import { useState, useEffect, useContext } from 'react';
import Web3 from 'web3';
import { NetworkContext } from '@/contexts/NetworksContext';

export default function useWeb3() {
  const [web3Info, setWeb3Info] = useState<Web3>();
  const { network } = useContext(NetworkContext);

  useEffect(() => {
    const getWeb3 = async () => {
      const web3 = new Web3(network.rpc);
      return web3;
    };

    getWeb3().then((web3) => {
      setWeb3Info(web3);
      if (process.env.NODE_ENV === 'development') {
        window.web3 = web3;
      }
    });
  }, [network]);

  return web3Info;
}
