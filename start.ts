import { Aptos, Network, AptosConfig, Account, Ed25519PrivateKey, U64, Serializer } from "@aptos-labs/ts-sdk";
import { setInterval } from 'timers';

// edit here
const PRIVATE_KEY1 = 'xxxxxxxxxxxxxxxxxxxx'
const PRIVATE_KEY2 = 'xxxxxxxxxxxxxxxxxxxx'
const PRIVATE_KEY3 = 'xxxxxxxxxxxxxxxxxxxx'
const PRIVATE_KEY4= 'xxxxxxxxxxxxxxxxxxxx'
const PRIVATE_KEY5 = 'xxxxxxxxxxxxxxxxxxxx'
const PRIVATE_KEY6 = 'xxxxxxxxxxxxxxxxxxxx'
const PRIVATE_KEY7 = 'xxxxxxxxxxxxxxxxxxxx'
const PRIVATE_KEY8 = 'xxxxxxxxxxxxxxxxxxxx'
const PRIVATE_KEY9 = 'xxxxxxxxxxxxxxxxxxxx'
const PRIVATE_KEY10 = 'xxxxxxxxxxxxxxxxxxxx'
const PRIVATE_KEY11 = 'xxxxxxxxxxxxxxxxxxxx'
const TOTAL_TX = 10
const TOTAL = 1

const GAS_UNIT_PRICE = 100
const MAX_GAS_LIMIT = 1515//Max Gas Limit
////////////

const mint_function = "0x1fc2f33ab6b624e3e632ba861b755fd8e61d2c2e6cf8292e415880b4c198224d::apts::mint"
const augment = "ABSC"

const aptosConfig = new AptosConfig({ network: Network.MAINNET });
const aptos = new Aptos(aptosConfig);

function reStoreAccount(_privateKey: string) {
  const privateKey = new Ed25519PrivateKey(_privateKey);
  const account = Account.fromPrivateKey({ privateKey });
  return account;
}
const interval = 10 * 60 * 1000;  //分钟
async function sendTransaction(_privateKey: string,total: number) {
  for (let count = 0; count < total; count++) {
    const myAccount = reStoreAccount(_privateKey);

    const transaction = await aptos.transaction.build.simple({
      sender: myAccount.accountAddress,
      data: {
        function: mint_function,
        typeArguments: [],
        functionArguments: [augment],
      },
      options: {
        maxGasAmount: MAX_GAS_LIMIT,
        gasUnitPrice: GAS_UNIT_PRICE,
      },
    });

    const sendTx = aptos.transaction.signAndSubmitTransaction({
      signer: myAccount,
      transaction: transaction,
    });

    console.log(`${count}. https://explorer.aptoslabs.com/txn/${(await sendTx).hash}`);
    const response = await aptos.waitForTransaction({
      transactionHash: (await sendTx).hash,
    });
  }
}

function start() {
  sendTransaction(PRIVATE_KEY1,TOTAL_TX)
  sendTransaction(PRIVATE_KEY2,TOTAL_TX)
  sendTransaction(PRIVATE_KEY3,TOTAL_TX)
  sendTransaction(PRIVATE_KEY4,TOTAL_TX)
  sendTransaction(PRIVATE_KEY5,TOTAL_TX)
  sendTransaction(PRIVATE_KEY6,TOTAL_TX)
  sendTransaction(PRIVATE_KEY7,TOTAL_TX)
  sendTransaction(PRIVATE_KEY8,TOTAL_TX)
  sendTransaction(PRIVATE_KEY9,TOTAL_TX)
  sendTransaction(PRIVATE_KEY10,TOTAL_TX)
  sendTransaction(PRIVATE_KEY11,TOTAL)
}


setInterval(start, interval);
// start();

