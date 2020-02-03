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

  // Send a utxo to an address
  async sendUtxo (ctx) {
    try {
      const toAddr = ctx.request.body.toAddr
      if (!toAddr || toAddr === '') ctx.throw(422, 'toAddr can not be blank.')

      const fromAddr = ctx.request.body.fromAddr
      if (!fromAddr || fromAddr === '') ctx.throw(422, 'fromAddr can not be blank.')

      let data = _this.shell.exec(`${config.ecPath} payto -w ${config.walletFile} -F ${fromAddr} ${toAddr} !`)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      data = JSON.parse(data)

      ctx.body = {
        success: true,
        data
      }
    } catch (err) {
      console.error(`Error in ec/controller.js/sendUtxo()`)
      ctx.throw(500, err.message)
    }
  }

  // Broadcast a hex string to the network.
  async broadcastTx (ctx) {
    try {
      const hex = ctx.request.body.hex
      if (!hex || hex === '') ctx.throw(422, 'hex can not be blank.')

      let data = _this.shell.exec(`${config.ecPath} broadcast -w ${config.walletFile} ${hex}`)

      data = JSON.parse(data)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      if (!data[0]) {
        ctx.body = {
          success: false,
          txid: null
        }
      } else {
        ctx.body = {
          success: true,
          txid: data[1]
        }
      }
    } catch (err) {
      console.error(`Error in ec/controller.js/broadcastTx()`)
      throw err
    }
  }
}

module.exports = ElectronCash
