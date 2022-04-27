import express from 'express'
import dotenv from 'dotenv'
dotenv.config().parsed;

const app = express()
app.use(express.static('public'))
app.set('port', process.env.PORT || 8000)

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`)
})