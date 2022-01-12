export enum TRANSACTION_TYPES {
  SET_DATA = "SET_DATA",
  EXECUTE = "EXECUTE",
  TRANSFER_OWNERSHIP = "TRANSFER_OWNERSHIP",
}

export const TRANSACTION_SELECTORS = {
  SET_DATA: "14a6e293",
  EXECUTE: "44c028fe",
  TRANSFER_OWNERSHIP: "f2fde38b",
};

export const TRANSACTION_PARAMETERS = {
  SET_DATA: ["bytes32[]", "bytes[]"],
  EXECUTE: ["uint256", "address", "uint256", "bytes"],
  TRANSFER_OWNERSHIP: ["address"],
};

