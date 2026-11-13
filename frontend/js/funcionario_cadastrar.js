const btn = document.getElementById('btn')
console.log(btn)
const resposta = document.getElementById('resposta')

btn.addEventListener('click', (e)=>{
    e.preventDefault()

    const valores ={
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
    }
    console.log(valores)

    fetch(`http://localhost:3000/funcionario`,{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(valores)
    })

    .then(res => res.json())
    .then(dados=>{
        resposta.innerHTML = `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar funcionário!',err)
        resposta.innerHTML = '<p>Erro ao cadastrar funcionário!</p>'
    })
})