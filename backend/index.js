const express = require('express')
const cors = require('cors')
const apiRouter = require('./routes/index')
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1', apiRouter)

PORT = 3021

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})


