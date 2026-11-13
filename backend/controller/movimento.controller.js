const Movimento = require('../models/Movimento')
const criptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body
    try{
        if(!valores.idMaterial || !valores.tipo || !valores.qunatMovimento || !valores.data){
            res.status(404).json({message: 'Preencha todos os campos'})
        }
        await Movimento.create(valores)
            res.status(200).json({message: 'Dados cadatrados com sucesso!'})
    }catch(err){
            res.status(500).json({message: 'Preencha todos os campos'})

    }
}
module.exports = {cadastrar}