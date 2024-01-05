const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-add-task')
const listaCompleta = document.querySelector('.list-tasks')
let minhaListaDeItens = []


button.addEventListener('click', adicionarNovaTarefa)

function adicionarNovaTarefa() {
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false,
    })
    mostrarTarefas()
    input.value = ''
}

function mostrarTarefas() {
    let novaLi = ''
    minhaListaDeItens.forEach((item, posicao) => {
        novaLi = novaLi + `
            <li class="task ${item.concluida && "done"}">
                <img src="./images/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})"/>
                <p>${item.tarefa}</p>
                <img src="./images/trash.png" alt="apagar-a-tarefa" onclick="deletarItem(${posicao})" />
            </li>
            `
    })

    listaCompleta.innerHTML = novaLi
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function deletarItem(posicao){
    minhaListaDeItens.splice(posicao, 1)
    mostrarTarefas()
}

function concluirTarefa(posicao){
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida
    mostrarTarefas()
}

function recarregarTela(){
    const tarefasDoLocalStorage = localStorage.getItem('lista')
    if(tarefasDoLocalStorage){
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()    
    
}

recarregarTela()