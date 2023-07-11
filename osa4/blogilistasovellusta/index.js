const http = require('http')
const app = require('./app')
const logger = require('./utils/logger')




console.log("started")
const server = http.createServer(app)



const PORT = 3003
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

console.log("server started")