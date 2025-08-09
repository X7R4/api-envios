const axios = require('axios');

const axiosCorreiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.CORREIOS_TOKEN}`
  }
});

module.exports = { axiosCorreiosInstance };
