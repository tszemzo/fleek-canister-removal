/* eslint-disable @typescript-eslint/camelcase */
const { HttpAgent, getManagementCanister } = require("@dfinity/agent");
const { Principal } = require("@dfinity/principal");
const fetch = require("isomorphic-fetch");

const { getIdentity } = require('./getIdentity');

const self = {
  removeCanister,
};

module.exports = self;

async function removeCanister (canisterId) {
  const identity = getIdentity();
  const host = "https://ic0.app";
  const agent = new HttpAgent({ host, fetch, identity });
  const managementCanister = getManagementCanister({ agent });
  const id = Principal.fromText(canisterId);

  try {

    // 1) stop the canister
    console.log(`stopping canister ${canisterId}`);
    await managementCanister.stop_canister({
      canister_id: id
    });
    console.log('canister stopped successfully');

    // 2) check canister's status
    const { status, cycles } = await managementCanister.canister_status({
      canister_id: id
    });

    // 3) if the canister stopped and it has cycles, let's transfer them
    if (status.stopped && cycles > 0) {
      // 3b) install the wallet for the stopped canister (!!! is this correct? can we do this? !!!)
      const canisterWallet = createActor(agent, canisterId);

      const { amount } = await canisterWallet.wallet_balance();
      console.log(`withdrawing ${amount} from canister ${canisterId} and sending it to cycle wallet canister`);

      const cycleWalletId = "owdog-wiaaa-aaaad-qaaaq-cai"; // retrieved from vojtech code this id
      const recipient = Principal.fromText(cycleWalletId);
      
      const { Ok } = await walletActor.wallet_send(recipient, amount);
      if (Ok) {
        console.log('funds successfully sent to cycle wallet');
      }
    }

    // 4) delete the canister
    console.log(`deleting canister ${canisterId}`);
    await managementCanister.delete_canister({
      canister_id: id
    });
    console.log('canister deleted successfully');
  } catch (err) {
    console.error("Error while removing canister: ", err);
  }
};
