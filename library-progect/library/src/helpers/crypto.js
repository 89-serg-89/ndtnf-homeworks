const bcrypt = require('bcrypt')

const saltRounds = 10
const getHash = (pass) => {
  return bcrypt.hashSync(pass, saltRounds)
}
const compare = (pass, hash) => {
  return bcrypt.compareSync(pass, hash)
}

module.exports = {
  getHash,
  compare
}
