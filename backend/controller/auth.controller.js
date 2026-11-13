const Funcionario = require('../models/Funcionario')
const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const login = async (req, res) => {
    const valores = req.body
    if (!valores.email || !valores.senha) {
        res.status(400).json({ message: 'Preencha todos os campos!' })
    }

    try {
        const funcionario = await Funcionario.findOne({ where: { email: valores.email } })

        if (!funcionario) {
            res.status(400).json({ message: 'Funcionario Não encontrado' })
        }

        const bytes = cryptoJs.AES.decrypt(funcionario.senha, CHAVE_SECRETA)
        const senhaDescrypto = bytes.toString(cryptoJs.enc.Utf8)

        if (valores.senha !== senhaDescrypto) {
            res.status(400).json({ message: 'Senha Incorreta' })
        }

        const horas = 3 * 60 * 60 * 1000
        const tempoExpiracao = Date.now() + horas

        const payload = {
            idfuncionario: funcionario.idfuncionario,
            nome: funcionario.nome,
            expiraEm: tempoExpiracao
        }

        const token = cryptoJs.AES.encrypt(JSON.stringify(payload), CHAVE_SECRETA).toString()

        res.status(200).json({
            message: 'Login realizado com sucesso!',
            token: token,
            nome: funcionario.nome
        })

    } catch (err) {
        res.status(500).json({ message: 'Erro' })
        console.error('Erro', err)
    }
}

module.exports = {login}