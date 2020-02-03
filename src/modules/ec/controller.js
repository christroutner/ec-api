// const fs = require('fs')

const shell = require('shelljs')

const config = require('../../../config')

let _this

class ElectronCash {
  constructor () {
    _this = this

    this.shell = shell
    this.config = config
  }

  // Gets an unused address from the wallet.
  async getAddress (ctx) {
    try {
      const data = _this.shell.exec(`${config.ecPath} -w ${config.walletFile} getunusedaddress`)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      const addr = data.replace(/(\r\n|\n|\r)/gm, '')

      ctx.body = {
        success: true,
        address: addr
      }
    } catch (err) {
      console.error(`Error in ec/controller.js/getAddress()`)
      ctx.throw(500, err.message)
    }
  }

  // Get balances of the wallet.
  async getUtxos (ctx) {
    try {
      let data = _this.shell.exec(`${config.ecPath} -w ${config.walletFile} listunspent`)
      data = JSON.parse(data)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      // const addr = data.replace(/(\r\n|\n|\r)/gm, '')

      ctx.body = {
        success: true,
        utxos: data
      }
    } catch (err) {
      console.error(`Error in ec/controller.js/getUtxos()`)
      ctx.throw(500, err.message)
    }
  }
}

module.exports = ElectronCash
