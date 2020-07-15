/**
 * @description jest server
 * @author cyy
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)