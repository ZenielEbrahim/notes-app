const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const noteRouter = require('./routers/notes')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(noteRouter)


 app.listen(port, console.log('server is up on port:' + port))
 

