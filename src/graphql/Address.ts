import { graphql } from '@/generated';

export const AddressDocument = graphql(/* GraphQL */ `
  query Address($address: AddressHash!) {
    address(hash: $address) {
      balance: fetchedCoinBalance
      contractCode
      smartContract {
        name
        abi
      }
    }
  }
`);
