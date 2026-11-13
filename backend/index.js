const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000
const hostname = 'localhost'
const conn = require('./db/conn')

require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const funcionarioController = require('./controller/funcionario.controller')
const materialController = require('./controller/material.controller')
const obraController = require('./controller/obra.controller')
const movimentoController = require('./controller/movimento.controller')


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.get('/',(req,res)=>{
    res.status(200).json({message: 'Aplicação rodando!'})
})

app.use(authMiddleware)

app.post('/material', materialController.cadastrar)
app.post('/movimento', movimentoController.cadastrar)

app.post('/obra', obraController.cadastrar)
app.get('/obras', obraController.listar)
app.get('/obra/:id', obraController.consultar)
app.get('/obra/nome/:id', obraController.consultarNome)
app.delete('/obra/:id', obraController.apagar)


conn.sync()
.then(()=>{
    app.listen(PORT,hostname,()=>{
        console.log(`aplicação rodando em: http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('FUDEU',err)
})