/* eslint-disable import/no-named-as-default-member */
import { HttpAgent, Actor, ActorSubclass } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import walletIDLFactory from "./wallet/wallet.did";
import WalletService from "./wallet/wallet";

const createActor = (
  agent: HttpAgent,
  walletCanisterId: string | Principal
): ActorSubclass<WalletService> =>
  Actor.createActor<WalletService>(walletIDLFactory, {
    agent,
    canisterId: walletCanisterId
  });

export default createActor;
