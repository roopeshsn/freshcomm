const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Roopesh',
    email: 'roopeshsaravanan.dev@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Kamal',
    email: 'kamalev21@gmail.com',
    password: bcrypt.hashSync('Kamal_200', 10),
    isAdmin: true,
  },
  {
    name: 'Charan',
    email: 'charansd50@gmail.com',
    password: bcrypt.hashSync('Sai80740@', 10),
    isAdmin: true,
  },
]

module.exports = users
