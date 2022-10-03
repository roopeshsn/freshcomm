const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Roopesh',
    email: 'roopeshsaravanan.dev@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
]

module.exports = users
