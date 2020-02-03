const app = require('../../bin/server')
const testUtils = require('../utils')
const assert = require('chai').assert
const config = require('../../config')
const axios = require('axios').default

const util = require('util')
util.inspect.defaultOptions = { depth: 1 }

const LOCALHOST = `http://localhost:${config.port}`

const context = {}

describe('ElectronCash', () => {
  before(async () => {
    await app.startServer() // This should be second instruction.

    // Create a second test user.
    // const userObj = {
    //   email: 'test2@test.com',
    //   password: 'pass2'
    // }
    // const testUser = await testUtils.createUser(userObj)
    // console.log(`testUser2: ${JSON.stringify(testUser, null, 2)}`)

    // context.user2 = testUser.user
    // context.token2 = testUser.token
    // context.id2 = testUser.user._id

    // Get the JWT used to log in as the admin 'system' user.
    const adminJWT = await testUtils.getAdminJWT()
    // console.log(`adminJWT: ${adminJWT}`)
    context.adminJWT = adminJWT

    // const admin = await testUtils.loginAdminUser()
    // context.adminJWT = admin.token

    // const admin = await adminLib.loginAdmin()
    // console.log(`admin: ${JSON.stringify(admin, null, 2)}`)
  })

  describe('GET /ec/address', () => {
    it('should get an address', async () => {
      // const { token } = context

      const options = {
        method: 'GET',
        url: `${LOCALHOST}/ec/address`,
        headers: {
          Accept: 'application/json'
        }
      }

      const result = await axios(options)
      const response = result.data
      // console.log(`response: ${JSON.stringify(response, null, 2)}`)

      assert.property(response, 'success')
      assert.equal(true, response.success)

      assert.property(response, 'address')
    })
  })

  describe('GET /ec/utxos', () => {
    it('should get a list of utxos', async () => {
      // const { token } = context

      const options = {
        method: 'GET',
        url: `${LOCALHOST}/ec/utxos`,
        headers: {
          Accept: 'application/json'
        }
      }

      const result = await axios(options)
      const response = result.data
      console.log(`response: ${JSON.stringify(response, null, 2)}`)

      assert.property(response, 'success')
      assert.equal(response.success, true)

      assert.property(response, 'utxos')
    })
  })
})
