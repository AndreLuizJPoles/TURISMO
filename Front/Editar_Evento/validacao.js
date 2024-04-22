const nome = document.getElementById("nome");
const estabelecimento = document.getElementById("estabelecimento");
const descricao = document.getElementById("descricao");
const dataInicio = document.getElementById("data-inicio");
const dataFim = document.getElementById("data-fim");
const horaAberta = document.getElementById("hora-abertura");
const horaEncer = document.getElementById("hora-encerramento");

function salvar() {
    if (validar()) {
        alert('Foi!');
        //envia();
    }
}

function validar(){
    if (verificaVazio()) {
        alert("Preencha todos os campos obrigatórios!");
        return false;
    }
    if(validaHora()){
        alert("O horário de abertura deve ser menor que o horário de fechamento!")
        return false;
    }

    if(validaData()){
        alert("A data de início deve ser menor que a data de encerramento!")
        return false;
    }

    return true;
}

function verificaVazio() {
    return nome.value == '' || horaAberta.value == '' || horaEncer.value == '' || dataInicio.value == '' || dataFim.value == '' || estabelecimento.value == '';
}

function validaHora(){
    return horaEncer.value <= horaAberta.value;
}

function validaData(){
    return dataFim.value <= dataInicio.value;
}