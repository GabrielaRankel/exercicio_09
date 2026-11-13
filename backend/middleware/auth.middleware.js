const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']
    console.log(token)

    if(!token){
        return res.status(401).json({message: 'Acceso Negado!! SOCORRO'})
    }

    try{
        const bytes = cryptoJs.AES.decrypt(token, CHAVE_SECRETA)
        const dadosDescripto = bytes.toString(cryptoJs.enc.Utf8)

        if(!dadosDescripto){
            return res.status(401).json({message: 'Token invalido!! SOCORRO'})
        }
        const payload = JSON.parse(dadosDescripto)

        if(Date.now() > payload.expiraEm){
            return res.status(401).json({message: 'Sessão expirada!! SOCORRO'})
        }

        req.usuario = payload
        next()

    }catch(err){
        return res.status(401).json({message: 'Erro na autenticação'})
    }
}

module.exports = authMiddleware