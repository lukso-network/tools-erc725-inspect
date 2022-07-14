import { ERC725JSONSchema } from '@erc725/erc725.js';

const schemas: ERC725JSONSchema[] = [
  {
    name: 'Address',
    key: '0xef949621d9619a7bdc7308bca3bf3f6508504e4bac5dab9b94b151c88dbea455',
    keyType: 'Singleton',
    valueType: 'address',
    valueContent: 'Address',
  },
  {
    name: 'Bytes',
    key: '0xb768b9830b2504572cc89956093f6e219b2ab9a1993be589d802a3dd00a73dc3',
    keyType: 'Singleton',
    valueType: 'bytes',
    valueContent: 'Bytes',
  },
  {
    name: 'String',
    key: '0x7ff6a077f248416948843f592327444c45801847787632efa8e679f72a85215f',
    keyType: 'Singleton',
    valueType: 'string',
    valueContent: 'String',
  },
  {
    name: 'Keccak256',
    key: '0xab69e314cadc2da770b8173f283465c3dde5bfc80dde865e99dd9461f227c7da',
    keyType: 'Singleton',
    valueType: 'bytes32',
    valueContent: 'Keccak256',
  },
  {
    name: 'Number',
    key: '0x73212e33f3f42f0be7164bf7746373e9c145c78b4a273ca6c041d683d71edf74',
    keyType: 'Singleton',
    valueType: 'uint256',
    valueContent: 'Number',
  },
  {
    name: 'BytesN',
    key: '0xe68f93a38ebdceefd19d1b5686494aa1fd2a1336213a7823fd51debae4792467',
    keyType: 'Singleton',
    valueType: 'bytesN',
    valueContent: 'BytesN',
  },
  {
    name: 'Bytes',
    key: '0xb768b9830b2504572cc89956093f6e219b2ab9a1993be589d802a3dd00a73dc3',
    keyType: 'Singleton',
    valueType: 'bytes',
    valueContent: 'Bytes',
  },
  {
    name: 'BitArray',
    key: '0x5c3aa19c48f25941f0a5d9ba88b03fe4672f0d09a87c30e6ec69b84572115636',
    keyType: 'Singleton',
    valueType: 'bytes',
    valueContent: 'BitArray',
  },
  {
    name: 'URL',
    key: '0x96388ed71ebb5d970d8c40d08f33931fc80bd2768fd60f12b78e085d12441b0e',
    keyType: 'Singleton',
    valueType: 'string',
    valueContent: 'URL',
  },
  {
    name: 'JSONURL',
    key: '0x2782700556cb782590d66cc4e1a7158dd2ac8459c70d8bcc62ef1009246381f1',
    keyType: 'Singleton',
    valueType: 'bytes',
    valueContent: 'JSONURL',
  },
  {
    name: 'Boolean',
    key: '0x92fb0a85a901c549fb8c896e08de450056c2408e7befb245949991a05340769d',
    keyType: 'Singleton',
    valueType: 'boolean',
    valueContent: 'Boolean',
  },
];

export default schemas;
