import express from 'express'
import cors from 'cors'
import * as bodyParser from "body-parser"

const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {res.send('hello to u too')})
app.all('*', (req, res) => res.send(`mock: Hello ${JSON.stringify(req.body.currentUser)}`))

const PORT = 4000

app.listen(PORT, () => {console.log(`listening on ${PORT}`);})