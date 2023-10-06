
const express = require("express")
const userRouter = require('./routes/user_routes')
const mesRouter = require('./routes/messange_routes')
const cors = require("cors")


const PORT = process.env.PORT || 8080

const app = express();

app.use(cors())
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', mesRouter)

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


const io = require('socket.io')(3000, {
  cors: {
    origin: ["http://localhost:5173"]
  }
})


io.on('connection', socket => {
  console.log(socket.id)
  socket.on('send-message', (message) => {
    io.emit('receive-message', message)
  })

})

app.listen(PORT, () => console.log(`server start: ${PORT}`))