# Fleek canister removal

### Important note:

The wallet module and the ```createWalletActor.ts``` file were added just to give context to the project as this little project doesnt't support typescript, they were extracted from fleek-v2 repo. Also I wasn't sure if conceptually what I'm doing with the wallet and the canister we want to delete is fine, so specially on step 3/3b I'm open to suggestions and improvals.

In order to run the project apart from the steps below you should probably comment / test / fix the content of the ```if``` statement inside removeCanister file

---

### Getting started

There are a few things that you need in order to setup the project:

1) Clone this repository 
```
https://github.com/tszemzo/fleek-canister-removal.git
```

2) Install all the modules with the following command:
```
npm install
```

3) Add identity.pem at ```src/certificates``` location (didn't add it for security reasons)

4) Run our server
```
npm start
```
