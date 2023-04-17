const express = require('express')
const app = express()
const port = 8080
const fs = require('fs');

const crypto = require("crypto");
const id = crypto.randomBytes(16).toString("hex");
let listTarefas = [];


app.get('/', (req, res) => {
    let message = process.env.MENSAGEM_TELA_INICIAL
    let html = fs.readFileSync('views/home.html', 'utf8').replace("[ID_CONTAINER]",id).replace("[LISTA_TAREFAS]",GerarLista());
    res.setHeader('Content-Type', 'text/html');
    if(message === "" || message === undefined) res.send(html);
    else res.send(html.replace("[MENSAGEM_TELA_INICIAL]",message));
})


app.get('/add/:item', (req, res) => {
    listTarefas.push(req.params['item'])
    res.status(200).send();
})

app.get('/del/:item', (req, res) => {
    listTarefas = listTarefas.filter(function(item) {
        return item !== req.params['item']
    })
    res.status(200).send();
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

function GerarLista(){
    let retorno = "";
    listTarefas.map(function (i){
        retorno += `<li>${i} <button value="${i}" onclick="Deletar(this.value)">Deletar</button> </li>`;
    })
    return retorno;
}