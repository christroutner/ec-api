# ec-api
A REST API for controlling an [Electron Cash](https://electroncash.org/) wallet.

## Overview
This is a working prototype for *developers*. It's not polished in any way.

This app is based on the [koa-api-boilerplate](https://github.com/christroutner/koa-api-boilerplate). For developers who want to understand the code, you should start there. The only part that is different from that boilerplate is the [ec module](https://github.com/christroutner/ec-api/tree/master/src/modules/ec).

The REST API is simply a wrapper for executing commands line instructions, using the Electron Cash command line interface.


## Requirements
* node __^10.15.1__
* npm __^6.7.0__

## Installation
```bash
git clone https://github.com/christroutner/ec-api
cd koa-api-boilerplate
npm install
npm start
```

## Usage
- Edit the [config/common.js](https://github.com/christroutner/ec-api/blob/master/config/env/common.js) file with the path to the local copy of Electron Cash application and the wallet file. The app needs to be running and the wallet needs to be open within the app in order for the REST API to work.
- It is assumed two copies of this app are being one. One on the machine with the CashFusion wallet, one on the machine with the CashShuffle wallet.
- This API is intended to be run in conjunction with the [shuffle-manager](https://github.com/christroutner/shuffle-manager) app. That app runs on the machine with CashShuffle wallet and send small UTXO coins to the CashFusion wallet.


## License
MIT
