const Material = require('../models/Material')
const criptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'


const cadastrar = async(req,res)=>{
    const valores = req.body
    try{
        if(!valores.idObra || !valores.categoria || !valores.descricao || !valores.quantEstoque || !valores.codLote){
            res.status(404).json({message: 'Preencha todos os campos'})
        }
        const codloteCripto = criptoJS.AES.encrypt(valores.codLote, CHAVE_SECRETA).toString()
        await Material.create({
            idObra: valores.idObra,
            categoria: valores.categoria,
            descricao: valores.descricao,
            quantEstoque: valores.quantEstoque,
            codLote: codloteCripto
        })
            res.status(200).json({message: 'Dados cadatrados com sucesso!'})
    }catch(err){
            res.status(500).json({message: 'Preencha todos os campos'})

    }
}
module.exports = {cadastrar}