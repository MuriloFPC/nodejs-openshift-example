const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    let message = process.env.MENSAGEM_TELA_INICIAL
    res.send(message === "" || message === undefined ? "Mensagem teste" : message)
})


app.get('/hc', (req, res) => {
    let chanceErro = process.env.CHANCE_ERRO
    var x = parseFloat(chanceErro);
    const valorNumerico = !isNaN(chanceErro) && (x | 0) === x;
    if((Math.floor(Math.random() * 100) + 1) > chanceErro || !valorNumerico)
        return res.status(200).send(
             'Passou no teste de healthCheck'
        );
    else
        return res.status(400).send(
              'Falhou no teste de healthCheck'
            );
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})