import { Command } from 'commander'
const program = new Command()
import shell from 'shelljs'
import * as readlineSync from 'readline-sync'
import { Auth } from '../common/models'
import config from '../config'
import { validateEmail } from './helper/validate'
import { User } from '../user/models'

program.version('0.0.1')

const logAction = (text: string) =>
  console.log(`==========[ ${text} ]==========`)

// program.command('create-admin').action(async (env, options) => {
//   let username = readlineSync.question('Email (admin): ', {})
//   let usernameCount = 0
//   while (true) {
//     usernameCount += 1
//     if (usernameCount === 3) {
//       return process.exit()
//     }

//     if (validateEmail(username)) {
//       const findAdmin = await Auth.findOne({
//         where: {
//           username,
//         },
//       })
//       if (!findAdmin) {
//         break
//       }
//       logAction('Please enter again, this email already exists.')
//       username = readlineSync.question('Email (admin): ')
//     } else {
//       logAction('Please enter again, invalid email format.')
//       username = readlineSync.question('Email (admin): ')
//     }
//   }

//   let password = readlineSync.question('Password: ', { hideEchoBack: true })
//   let checkPasswordCount = 0
//   while (password.length < 6) {
//     checkPasswordCount += 1
//     if (checkPasswordCount === 3) {
//       return process.exit()
//     }
//     logAction('Please enter again, password must be more than 6 characters.')
//     password = readlineSync.question('Password: ', { hideEchoBack: true })
//   }

//   let passwordAgain
//   let enterPasswordCount = 0
//   passwordAgain = readlineSync.question('Password (again): ', {
//     hideEchoBack: true,
//   })
//   while (password !== passwordAgain && enterPasswordCount < 3) {
//     enterPasswordCount += 1
//     if (enterPasswordCount === 3) {
//       return process.exit()
//     }
//     logAction('Please enter again, password is not matched.')
//     passwordAgain = readlineSync.question('Password (again): ', {
//       hideEchoBack: true,
//     })
//   }
//   const auth = await Auth.createUser({
//     username,
//     password,
//     role: 'admin',
//   })
//   const customer: User = User.build()
//   customer.auth = auth.username
//   await customer.save()
//   logAction('Admin created successfully.')
//   return process.exit()
// })

program.command('make-migration <name>').action(async (name, options) => {
  shell.exec(`npx sequelize migration:generate --name ${name}`)
  return process.exit()
})

program.command('migrate').action(async (env, options) => {
  shell.exec(`npx sequelize db:migrate --url ${config.databaseUrl}`)
  return process.exit()
})

program.parse(process.argv)
