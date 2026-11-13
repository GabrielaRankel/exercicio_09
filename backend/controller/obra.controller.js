const Obra = require('../models/Obra')
const criptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'


//crud completo
const cadastrar = async(req,res)=>{
    const valores = req.body
    try{
        if(!valores.nome || !valores.cnpj){
            res.status(404).json({message: 'Preencha todos os campos'})
        }
        const cnpjCripto = criptoJS.AES.encrypt(valores.cnpj, CHAVE_SECRETA).toString()
        await Obra.create({
            nome: valores.nome,
            cnpj: cnpjCripto
        })
            res.status(200).json({message: 'Dados cadatrados com sucesso!'})
    }catch(err){
            res.status(500).json({message: 'Preencha todos os campos'})

    }
}

const listar = async(req,res)=>{
    try{
        const obras = await Obra.findAll()
        let resultado = [ ]
        
        obras.forEach((el)=>{
            let cnpjdescripto = ` `
            try{
                let bytes = criptoJS.AES.decrypt(el.cnpj, CHAVE_SECRETA)
                cnpjdescripto = bytes.toString(criptoJS.enc.Utf8)
            }
            catch(err){
                cnpjdescripto = `Erro ao descriptografar`
            }
            resultado.push({
                 nome: el.nome,
                 cnpj: cnpjdescripto
            })
        })
        res.status(200).json(resultado)
    }catch(err){
        res.status(500).json({message: 'Erro PUTA QUE PARIU'})
        console.log(`Erro PUTA QUE PARIU`, err)
    }
}
const consultar = async(req,res)=>{
    const id = req.params.id
    try{
        const obras = await Obra.findByPk(id)
        if(!obras){
            res.status(400).json({message: 'Não encontrado'})
        }
        let resultado = [ ]
        
        obras.forEach((el)=>{
            let cnpjdescripto = ` `
            try{
                let bytes = criptoJS.AES.decrypt(el.cnpj, CHAVE_SECRETA)
                cnpjdescripto = bytes.toString(criptoJS.enc.Utf8)
            }
            catch(err){
                cnpjdescripto = `Erro ao descriptografar`
            }
            resultado.push({
                 nome: el.nome,
                 cnpj: cnpjdescripto
            })
        })
        res.status(200).json(resultado)
    }catch(err){
        res.status(500).json({message: 'Erro PUTA QUE PARIU'})
        console.log(`Erro PUTA QUE PARIU`, err)
    }
}
const consultarNome = async(req,res)=>{
    const nome = req.params.nome
    try{
        const obras = await Obra.findOne({where: {nome: nome}})
        if(!obras){
            res.status(400).json({message: 'Não encontrado'})
        }
        let resultado = [ ]
        
        obras.forEach((el)=>{
            let cnpjdescripto = ` `
            try{
                let bytes = criptoJS.AES.decrypt(el.cnpj, CHAVE_SECRETA)
                cnpjdescripto = bytes.toString(criptoJS.enc.Utf8)
            }
            catch(err){
                cnpjdescripto = `Erro ao descriptografar`
            }
            resultado.push({
                 nome: el.nome,
                 cnpj: cnpjdescripto
            })
        })
        res.status(200).json(resultado)
    }catch(err){
        res.status(500).json({message: 'Erro PUTA QUE PARIU'})
        console.log(`Erro PUTA QUE PARIU`, err)
    }
}
const apagar = async(req,res)=>{
    const id = req.params.id
    try{
        const obras = await Obra.findByPk(id)
        if(!obras){
            res.status(400).json({message: 'Não encontrado'})
        }

        await obras.destroy({where: {id: obras.codObra}})
       
        res.status(200).json({message: 'Dados apagados com sucesso!!'})
    }catch(err){
        res.status(500).json({message: 'Erro PUTA QUE PARIU'})
        console.log(`Erro PUTA QUE PARIU`, err)
    }
}
module.exports = {cadastrar, listar, consultar, consultarNome, apagar}