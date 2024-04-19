const nomeEstab = document.getElementById("nome");
const horaAberto = document.getElementById("hora-abertura");
const horaFecha = document.getElementById("hora-encerramento");
const segunda = document.getElementById("segunda");
const terca = document.getElementById("terca");
const quarta = document.getElementById("quarta");
const quinta = document.getElementById("quinta");
const sexta = document.getElementById("sexta");
const sabado = document.getElementById("sabado");
const domingo = document.getElementById("domingo");
const cep = document.getElementById("cep");
const uf = document.getElementById("uf");
const cidade = document.getElementById("cidade");
const bairro = document.getElementById("bairro");
const rua = document.getElementById("rua");
const numero = document.getElementById("numero");
const complemento = document.getElementById("complemento");


function cadastrar() {
    if (validar()) {
        //envia(); VER COM O ESDRAS
        alert("FOI!")
    }
}

function validar() {
    if (verificaVazio()) {
        alert("Preencha todos os campos obrigatórios!");
        return false;
    }
    if(validaHora()){
        alert("O horário de abertura deve ser menor que o horário de fechamento!")
        return false;
    }
    return true;
}

function verificaVazio() {
    return nomeEstab.value == '' || horaAberto.value == '' || horaFecha.value == '' || cep.value == '' || cidade.value == '' || bairro.value == '' || rua.value == '' || uf.value =='';
}

function validaHora(){
    return horaFecha.value <= horaAberto.value;
}