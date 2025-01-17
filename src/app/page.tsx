"use client";
import {
  FREIGHTER_ID,
  FreighterModule,
  StellarWalletsKit,
  WalletNetwork,
  xBullModule,
} from "@creit.tech/stellar-wallets-kit";
import { useEffect, useState } from "react";
import {
  Client,
  networks,
  Networks,
  rpc,
  Scholarship,
  TransactionBuilder,
} from "../../bindings/dist/index";
import { signAuthEntry, signTransaction } from "@stellar/freighter-api";

const SOROBAN_RPC_URL = "https://soroban-testnet.stellar.org";

export default function Home() {
  const [address, setAddress] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [kit, setKit] = useState<StellarWalletsKit | null>(null);

  useEffect(() => {
    const getAddress = async () => {
      const kit: StellarWalletsKit = new StellarWalletsKit({
        network: WalletNetwork.TESTNET,
        selectedWalletId: FREIGHTER_ID,
        modules: [new FreighterModule(), new xBullModule()],
      });
      console.log(kit);
      setAddress((await kit.getAddress()).address);
      setKit(kit);
    };

    const postScholarship = async () => {
      try {
        if (!kit) {
          return;
        }
        const scholarshipContract = new Client({
          contractId: networks.testnet.contractId,
          networkPassphrase: networks.testnet.networkPassphrase,
          rpcUrl: SOROBAN_RPC_URL,
          signTransaction: async (tx: string) => {
            return await kit.signTransaction(tx, {
              networkPassphrase: Networks.TESTNET,
            });
          },
        });

        const scholarshipData: Scholarship = {
          admin: address,
          name: "Scholarship",
          details: "Scholarship details",
          available_grants: BigInt(10),
          student_grant_amount: BigInt(10000),
          end_date: BigInt(10000),
          id: BigInt(0),
          token: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
        };

        const transaction = await scholarshipContract.post_scholarship({
          scholarship: scholarshipData,
        });

        console.log(transaction);

        const server = new rpc.Server(SOROBAN_RPC_URL, { allowHttp: true });

        const signedXdr = await kit.signTransaction(transaction.toXDR(), {
          networkPassphrase: Networks.TESTNET,
        });

        const signedTx = TransactionBuilder.fromXDR(
          signedXdr.signedTxXdr,
          Networks.TESTNET
        );

        const result: any = server.sendTransaction(signedTx);
        console.log(result);

        const status = await server.getTransaction(result.hash);

        // const { result } = await transaction.signAndSend();

        // await kit.signTransaction(transaction);
        // console.log(result);

        // const xdr = transaction.toXDR();
        // const signedResult = await kit.signTransaction(xdr, {
        //   address: address,
        //   networkPassphrase: Networks.TESTNET,
        // });

        // const signedTx = TransactionBuilder.fromXDR(
        //   signedResult.signedTxXdr,
        //   Networks.TESTNET
        // );

        // console.log(signedTx);

        // const server = new rpc.Server(SOROBAN_RPC_URL);
        // const simResult: any = await server.simulateTransaction(signedTx);
        // if (simResult.error) {
        //   console.log(simResult);
        //   return;
        // }
      } catch (error) {
        console.error(error);
      }
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
