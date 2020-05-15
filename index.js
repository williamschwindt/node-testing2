const express = require('express')
const server = express()
const port = 7000
const usersRouter = require('./routers/users-router')

server.use(express.json())
server.use('/users', usersRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: 'something went wrong'
    })
})

if(!module.parent) {
    server.listen(port, () => {
        console.log(`server running at http://localhost:${port}`)
    })
}

module.exports = server
