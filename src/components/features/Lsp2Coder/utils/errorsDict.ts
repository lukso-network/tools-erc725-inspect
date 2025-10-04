interface IErrorsDict {
  [key: string]: string;
}

const errorsDict: IErrorsDict = {
  Address: 'is not a valid address',
  Number: 'is not a valid number',
  Bytes: 'is not hex',
  Bytes4: 'is not a bytes4 hex',
  Bytes8: 'is not a bytes8 hex',
  Bytes16: 'is not a bytes16 hex',
  Bytes32: 'is not a bytes32 hex',
  Keccak256: 'is',
  BitArray: 'is not hex',
};

export default errorsDict;
