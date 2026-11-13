const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const btn = document.getElementById('btn')
const resposta = document.getElementById('resposta')

btn.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/obras', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token
    }
})
.then(async res => {
    const respostaTexto = await res.text()

    console.log('STATUS:', res.status)
    console.log('RESPOSTA:', respostaTexto)

    try {
        return JSON.parse(respostaTexto)
    } catch (err) {
        console.error('O servidor não retornou JSON!')
        throw new Error('Resposta inválida do servidor. Confira o Console.')
    }
})
.then(dados => {
    console.log('DADOS:', dados)

    if (Array.isArray(dados)) {
        resposta.innerHTML = `
            <table>
                ${criarThaed()}
                ${criarTbody(dados)}
            </table>
        `
    } else {
        resposta.innerHTML = `<p>${dados.message}</p>`
    }
})
.catch(err => {
    console.error(err)
    resposta.innerHTML = `<p>${err.message}</p>`
})
})

function criarThaed() {
    return `
    <thead>
        <tr>
            <th>Nome</th>
            <th>CNPJ</th>
        </tr>
    </thead>
    `
}
function criarTbody(dados) {
    let corpo = `<tbody>`

    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.cnpj}</td>`
        corpo += `</tr>`
    })

    corpo += `</tbody>`
    return corpo
}