import 'dotenv/config'
import dbconnect from './src/config/db.js'
import app from './src/app.js'
import { testAi } from './src/services/ai.service.js'

const PORT = process.env.PORT || 3000
testAi()
dbconnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Mongo Connection Failed', err)
  })

