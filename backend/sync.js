const {Movimento, Funcionario, Obra, Material } = require('./models/rel')
const conn = require('./db/conn')

async function SyncDataBase(){
    try{
        await conn.sync({force: true})
        console.log('Criando e Sincronizando')
    }catch(err){
        console.log('Deu MERDA')
    }finally{
        await conn.close()
        console.log('Fechando a conexão')
    }
}

SyncDataBase()