/*
  This file is used to store unsecure, application-specific data common to all
  environments.
*/

module.exports = {
  port: process.env.PORT || 5001,
  ecPath: `/home/trout/work/electron-cash/cashfusion/electron-Cash-4.1.0-fusion-1-x86_64.AppImage`,
  // walletFile: `/home/trout/.electron-cash/wallets/test01`
  walletFile: `/home/trout/.electron-cash/wallets/wallet_1`
}
