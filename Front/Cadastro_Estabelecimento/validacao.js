const nomeEstab = document.getElementById("nome");
const cnpj = document.getElementById("cnpj");
const categoria = document.getElementById("categoria");
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
    }
}

function validar() {
    if (verificaVazio()) {
        alert("Preencha todos os campos obrigatórios!");
        return false;
    }
    if (validaCNPJ()) {
        alert("CNPJ inválido!");
        return false;
    }
    if(validaHora()){
        alert("O horário de abertura deve ser menor que o horário de fechamento!")
        return false;
    }
    return true;
}

function verificaVazio() {
    return nomeEstab.value == '' || cnpj.value == '' || categoria.value == '' || horaAberto.value == '' || horaFecha.value == '' || cep.value == '' || cidade.value == '' || bairro.value == '' || rua.value == '' || uf.value =='';
}

function validaCNPJ() {
    var strCNPJ = cnpj.value;
    strCNPJ = strCNPJ.replace(/[^\d]+/g, '');

    if (strCNPJ == '') return true;
    if (strCNPJ.length != 14)
        return true;
    if (strCNPJ == "00000000000000" ||
        strCNPJ == "11111111111111" ||
        strCNPJ == "22222222222222" ||
        strCNPJ == "33333333333333" ||
        strCNPJ == "44444444444444" ||
        strCNPJ == "55555555555555" ||
        strCNPJ == "66666666666666" ||
        strCNPJ == "77777777777777" ||
        strCNPJ == "88888888888888" ||
        strCNPJ == "99999999999999")
        return true;

    var tamanho = strCNPJ.length - 2
    var numeros = strCNPJ.substring(0, tamanho);
    var digitos = strCNPJ.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return true;
    tamanho = tamanho + 1;
    numeros = strCNPJ.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return true;

    return false;
}

function validaHora(){
    return horaFecha.value <= horaAberto.value;
}