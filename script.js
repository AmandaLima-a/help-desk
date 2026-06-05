let chamados = []  //Array(lista) onde vão ficar todos os chamados

function criarChamado() { 
    const titulo = document.getElementById("titulo").value
    const descricao = document.getElementById("descricao").value
    const categoria = document.getElementById("categoria").value
    const prioridade = document.getElementById("prioridade").value

    const chamado = {
        id: Date.now(),
        titulo,
        descricao,
        categoria,
        prioridade,
        status: "Aberto"
    }

    chamados.push(chamado)
    salvarLocalStorage()
    renderizarChamados()
}

function salvarLocalStorage() {
    localStorage.setItem("chamados", JSON.stringify(chamados))
}

function carregarLocalStorage() {
    const data = localStorage.getItem("chamados")
    if (data) chamados = JSON.parse(data)
}

function renderizarChamados() {
    const lista = document.getElementById("listaChamados")
    lista.innerHTML = ""

    chamados.forEach(chamado => {
        lista.innerHTML += `
            <div class= "card">
                <h3>${chamado.titulo}</h3>
                <p>${chamado.descricao}</p>
                <p>Status: ${chamado.status}</p>
                <p class="${chamado.prioridade}">Prioridade: ${chamado.prioridade}</p>

                <button onclick="mudarStatus(${chamado.id})">Concluir</button>
                <button onclick="excluir(${chamado.id})">Excluir</button>
            </div>
        `
    })
}

function mudarStatus(id) {
    chamados = chamados.map(c =>
        c.id === id ? { ...c, status: "Resolvido" } : c
    )
    salvarLocalStorage()
    renderizarChamados()
}

function excluir(id) {
    chamados = chamados.filter(c => c.id !== id)
    salvarLocalStorage()
    renderizarChamados()
}

function abrirFormulario() {
    const formulario = document.getElementById("formulario")

    if (formulario.style.display === "none") {
        formulario.style.display = "block"
    } else {
        formulario.style.display = "none"
    }
}

carregarLocalStorage()
renderizarChamados()
