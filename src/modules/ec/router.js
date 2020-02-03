// const validator = require('../../middleware/validators')
const ElectronCash = require('./controller')
const electronCash = new ElectronCash()

module.exports.baseUrl = '/ec'

module.exports.routes = [
  {
    method: 'GET',
    route: '/address',
    handlers: [electronCash.getAddress]
  },
  {
    method: 'GET',
    route: '/utxos',
    handlers: [electronCash.getUtxos]
  }
  /*
  {
    method: 'GET',
    route: '/',
    handlers: [validator.ensureUser, user.getUsers]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [validator.ensureUser, user.getUser]
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [validator.ensureTargetUserOrAdmin, user.getUser, user.updateUser]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [validator.ensureTargetUserOrAdmin, user.getUser, user.deleteUser]
  }
  */
]
