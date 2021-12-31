const axios = require('axios')

module.exports = (opts) => {
  const request = typeof opts === 'function' ? opts : axios.create(opts)

  return function driver(context, callback) {
    request(context.url)
      .then(({ data }) => callback(null, data))
      .catch(callback)
  }
}
