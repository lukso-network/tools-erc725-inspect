export enum TRANSACTION_TYPES {
  SET_DATA = 'SET_DATA',
  SET_DATA_BATCH = 'SET_DATA_BATCH',
  EXECUTE = 'EXECUTE',
  EXECUTE_BATCH = 'EXECUTE_BATCH',
  TRANSFER_OWNERSHIP = 'TRANSFER_OWNERSHIP',
  ACCEPT_OWNERSHIP = 'ACCEPT_OWNERSHIP',
  RENOUNCE_OWNERSHIP = 'RENOUNCE_OWNERSHIP',
  BATCH_CALLS = 'BATCH_CALLS',
  UNIVERSAL_RECEIVER = 'UNIVERSAL_RECEIVER',
}

export const TRANSACTION_SELECTORS = {
  SET_DATA: '7f23690c',
  SET_DATA_BATCH: '97902421',
  EXECUTE: '44c028fe',
  EXECUTE_BATCH: 'bf0176ff',
  TRANSFER_OWNERSHIP: 'f2fde38b',
  ACCEPT_OWNERSHIP: '79ba5097',
  RENOUNCE_OWNERSHIP: '715018a6',
  BATCH_CALLS: '6963d438',
  UNIVERSAL_RECEIVER: '6bb56a14',
};

export const TRANSACTION_PARAMETERS = {
  SET_DATA: ['bytes32', 'bytes'],
  SET_BATCH: ['bytes32[]', 'bytes[]'],
  EXECUTE: ['uint256', 'address', 'uint256', 'bytes'],
  EXECUTE_BATCH: ['uint256[]', 'address[]', 'uint256[]', 'bytes[]'],
  TRANSFER_OWNERSHIP: ['address'],
  ACCEPT_OWNERSHIP: [],
  RENOUNCE_OWNERSHIP: [],
  BATCH_CALLS: ['bytes[]'],
  UNIVERSAL_RECEIVER: ['bytes32', 'bytes'],
};
