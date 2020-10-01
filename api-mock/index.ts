import express from 'express'
import cors from 'cors'
import * as bodyParser from "body-parser"

const app = express()

const PORT = process.env.PORT || 4000;
const mockedServiceName = process.env.SERVICE_NAME || "";

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.url);
    console.log(req.originalUrl);
    next();    
})

app.get(`/api/${mockedServiceName}`, (req, res) => {
    console.log(req);    
    res.send(`Hello ${JSON.stringify(req.body.currentUser)} I'm ${mockedServiceName} API Mock`);
});


app.listen(PORT, () => {console.log(`listening on ${PORT}`);})