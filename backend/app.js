const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const md5 = require('md5');

const uri = 'mongodb+srv://fadhli123:fadhlipassword@emperio-lyxzz.gcp.mongodb.net/test?retryWrites=true&w=majority';
const client = new mongoClient(uri, { useNewUrlParser: true });

const main = express();

main.use(bodyParser.urlencoded({extended: false}));

main.post('/user/list', (req, res) => {
    client.connect(err => {
        client.db("Emperio").collection("users").find({
            $and: 
              [
                { email : `${req.body.emailaddress}` },
                { password : `${md5(req.body.password)}`}
              ]
        }).count()
        .then((result) => {
            result === 1 
            ? res.json({result: 'ok'})
            : res.json({result: 'unauthorized', message: 'Wrong username or password'})
            result.close();
        })
        .catch(err => res.status(400).send(err.toString()));
        client.close();
    });
});

main.post('/user/add', (req, res) => {
    client.connect(err => {
        client.db("Emperio").collection("users").insertOne({
           email: `${req.body.emailaddress}`,
           password: `${md5(req.body.password)}`,
           firstName: `${req.body.firstName}`,
           lastName: `${req.body.lastName}`
        })
        .then((result) => {
            res.json({result: true});
            result.close();
        })
        .catch(err => res.status(400).json({result: false}));
        client.close();
    });
});

main.listen(3002, () => {
    console.log("App is up and running!");
});