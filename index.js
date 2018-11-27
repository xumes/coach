const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3007

const axios = require('axios')
const BASE_URL = 'http://localhost:3000'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.json({mensagem: 'bem vindo'})
})

app.get('/lista/funcionarios/:id?', (req, res) => {
    let url = `${BASE_URL}/funcionarios`

    if(req.params.id){
        url=`${url}/${req.params.id}`
    }
    console.log("minha url ficou: ", url)
    axios
        .get(url)
        .then(resultado => {
            console.log("resultado = ", resultado.data)
            res.send(resultado.data)
            }
        )
        .catch(e => res.send(e))
})

app.post('/adiciona/funcionario', (req, res) => {
    let url = `${BASE_URL}/funcionarios`
    const func = {
        nome: req.body.nome,
        cargo: req.body.cargo
    }

    axios
        .post(url, {func})
        .then(msg = res.send('cadastrado com sucesso'))
        .catch(e => res.send(e))

    res.json({'funcionario': func})

})

app.get('/lista/equipamentos', (req, res) => {
    res.send("Lista de equipamentos")
})

app.listen(port)