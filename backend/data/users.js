const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Admin User',
    email: 'roopeshsaravanan.dev@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Roopesh',
    email: 'roopesh210602@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
]

module.exports = users
