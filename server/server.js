const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const port = 4001

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socker using the instance of the server
const io = socketIO(server)

// This is what the socker.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('New client connected')

  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('change color', color => {
    // once we get a 'change color' event from one of our clinets, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log('Color Changed to: ', color)
    io.sockets.emit('change color', color)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port: ${port}`))
