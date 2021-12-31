const axios = require('axios')
const Xray = require('x-ray')
const makeDriver = require('../')
const assert = require('assert')

const testInstance = (r, url, callback) => {
  if (!callback) {
    callback = url
    url = 'https://github.com'
  }

  r(url, 'title')(callback)
}

describe('Driver', function () {
  this.timeout(30000)
  describe('Arguments', () => {
    it('Should work with no argument', function (done) {
      const x = Xray()
      const driver = makeDriver()
      x.driver(driver)

      testInstance(x, done)
    })

    it('Should work with an object argument', function (done) {
      const x = Xray()
      const driver = makeDriver({})
      x.driver(driver)

      testInstance(x, done)
    })

    it('Should work with a function argument', function (done) {
      const x = Xray()
      const driver = makeDriver(axios.create({ method: 'post' }))
      x.driver(driver)

      testInstance(x, done)
    })
  })

  describe('Errors', function () {
    it('Should pass on errors', function (done) {
      const x = Xray()
      const driver = makeDriver()
      x.driver(driver)

      testInstance(x, 'http://not-a-real-url.net', function (err, res) {
        assert(err)
        done()
      })
    })
  })
})
