const express = require('express');
const bodyParser = require('body-parser')
const Blockchain = require('../blockchain');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
const app = express();
const bc = new Blockchain();

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
    res.redirect('/blocks')
})

app.listen(HTTP_PORT, () => console.log(`listening on port ${HTTP_PORT}`));