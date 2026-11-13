const Funcionario = require('../models/Funcionario')
const criptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'


const cadastrar = async(req,res)=>{
    const valores = req.body
    console.log(valores)
    try{
        if(!valores.nome || !valores.email || !valores.senha){
            res.status(404).json({message: 'Preencha todos os campos'})
        }
        const senhaCripto = criptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()
        await Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto
        })
            res.status(200).json({message: 'Dados cadatrados com sucesso!'})
    }catch(err){
            res.status(500).json({message: 'Preencha todos os campos'})

    }
}

module.exports = {cadastrar}