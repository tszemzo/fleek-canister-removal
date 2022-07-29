const app = require('./app');
const { removeCanister } = require('./removeCanister/removeCanister');

const start = async () => {
  await app.listen(8080, () => {
    console.info('Remove Canister Server listening on port 8080');
  });

  const phishingCanisterId = 'zj5s5-biaaa-aaaad-qc24a-cai';
  await removeCanister(phishingCanisterId);
};

start();
