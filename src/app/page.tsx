"use client";
import {
  FREIGHTER_ID,
  FreighterModule,
  StellarWalletsKit,
  WalletNetwork,
  xBullModule,
} from "@creit.tech/stellar-wallets-kit";
import { useEffect, useState } from "react";
import { Address, TransactionBuilder } from "@stellar/stellar-sdk";
import {
  Client,
  networks,
  Networks,
  rpc,
  Scholarship,
} from "../../bindings/src/index";

const kit: StellarWalletsKit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: FREIGHTER_ID,
  modules: [new FreighterModule(), new xBullModule()],
});

const SOROBAN_RPC_URL = "https://soroban-testnet.stellar.org";
const scholarshipContract = new Client({
  contractId: networks.testnet.contractId,
  networkPassphrase: networks.testnet.networkPassphrase,
  rpcUrl: SOROBAN_RPC_URL,
});

export default function Home() {
  const [address, setAddress] = useState("");
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getAddress = async () => {
      const newAddress = await kit.getAddress();
      setAddress(newAddress.address);
      console.log(newAddress);
    };

    const postScholarship = async () => {
      const scholarshipData: Scholarship = {
        admin: new Address(address),
        name: "Scholarship",
        details: "Scholarship details",
        available_grants: BigInt(10),
        student_grant_amount: BigInt(10000),
        end_date: BigInt(10000),
        id: BigInt(0),
        token: new Address(
          "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"
        ),
      };

      const transaction = await scholarshipContract.post_scholarship({
        scholarship: scholarshipData,
      });

      console.log(transaction);
      // const xdr = transaction.toXDR();
      // const signedResult = await kit.signTransaction(xdr, {
      //   address: address,
      //   networkPassphrase: Networks.TESTNET,
      // });
      // const signedTx = TransactionBuilder.fromXDR(
      //   signedResult.signedTxXdr,
      //   Networks.TESTNET
      // );
      // const server = new rpc.Server(SOROBAN_RPC_URL);
      // const simResult: any = await server.simulateTransaction(signedTx);
      // if (simResult.error) {
      //   console.log(simResult);
      //   return;
      // }
    };

    if (trigger) {
      getAddress();
      postScholarship();
    }
  }, [trigger]);

  return (
    <button
      className="btn btn-primary"
      onClick={() => setTrigger((prev) => !prev)}
    >
      Submit
    </button>
  );
}

/*
10000000000 - 1000 xlm
1000000000  - 100 xlm
100000000   - 10 xlm
10000000    - 1 xlm
CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC // *xlm token address testnet

cargo install --git https://github.com/stellar/stellar-cli soroban-cli //for updating or downloadingle cli

?  latest contract id = CB7FB7TQ3H4XFVNXREBZYMQ7Q7DF3WZTYC7C7IQ4WDHJSQWBV7UJOBHX

CB7FB7TQ3H4XFVNXREBZYMQ7Q7DF3WZTYC7C7IQ4WDHJSQWBV7UJOBHX -- Contract Id from okashi

stellar contract bindings typescript \
  --network testnet \
  --contract-id CB7FB7TQ3H4XFVNXREBZYMQ7Q7DF3WZTYC7C7IQ4WDHJSQWBV7UJOBHX \
  --output-dir bindings --overwrite


*/
