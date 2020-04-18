const axios = require('axios')

axios.defaults.baseURL = 'http://localhost:5000/api'

module.exports = {
    get: axios.get,
    post: axios.post
}