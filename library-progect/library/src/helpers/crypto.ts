import bcrypt from 'bcrypt'

const saltRounds = 10
const getHash = (pass: string): string => {
  return bcrypt.hashSync(pass, saltRounds)
}
const compare = (pass: string, hash: string): boolean => {
  return bcrypt.compareSync(pass, hash)
}

export {
  getHash,
  compare
}
