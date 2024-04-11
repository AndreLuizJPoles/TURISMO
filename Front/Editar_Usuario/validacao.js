const nome = document.getElementById("nome");
const email = document.getElementById("email");
const cpf = document.getElementById("cpf");
const telefone = document.getElementById("telefone");
const datNasc = document.getElementById("data-nasc");
const nomeEstab = document.getElementsByName("genero");
const cep = document.getElementById("cep");
const uf = document.getElementById("uf");
const cidade = document.getElementById("cidade");
const bairro = document.getElementById("bairro");
const rua = document.getElementById("rua");
const numero = document.getElementById("numero");
const complemento = document.getElementById("complemento");

function salvar() {
    if (validar()) {
        envia();
    }
}

function validar() {
    if (verificaVazio()) {
        alert("Preencha todos os campos obrigatórios!");
        return false;
    } else if (validaEmail()) {
        alert("Insira um e-mail válido!");
        return false;
    } else if (validaCpf()) {
        alert('Insira um CPF válido!');
        return false;
    } else if (nome.value.length > 80) {
        alert("O Nome ultrapassa o limite de caracteres!");
        return false;
    }
}

function verificaVazio() {
    return nome.value == '' || email.value == '' || datNasc.value == '';
}

function validaEmail() {
    if (email.value.includes('@') && email.value.includes('.')) {
        return false;
    }
    return true;
}

function validaCpf() {
    strCPF = cpf.value;

    if (strCPF == '') {
        return false;
    }

    strCPF = strCPF.replace(/[^\d]+/g, '');
    var soma = 0, resto = 0;
    if (strCPF == "00000000000" ||
        strCPF == "11111111111" ||
        strCPF == "22222222222" ||
        strCPF == "33333333333" ||
        strCPF == "44444444444" ||
        strCPF == "55555555555" ||
        strCPF == "66666666666" ||
        strCPF == "77777777777" ||
        strCPF == "88888888888" ||
        strCPF == "99999999999") return true;

    for (i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(strCPF.substring(9, 10))) return true;

    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(strCPF.substring(10, 11))) return true;

    return false && strCPF.value.length < 11;
}
