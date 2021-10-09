import app from './app'
import config from './config'


app.listen(config.port)
console.log(`App listening on port ${config.port}`)

// app.context.db.authenticate()
//   .then(() => console.log('Connected to database'))
//   .catch((err : any) => console.log(`Unable to connect to the database: ${err}`))
