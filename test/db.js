const mongoose = require('mongoose')
require("dotenv").config();

mongoose.db = mongoose.createConnection(process.env.db)

module.exports = mongoose;