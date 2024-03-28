const email = document.getElementById("email");
const nome = document.getElementById("nome");
const cpf = document.getElementById("cpf");
const dataNasc = document.getElementById("data-nasc");
const senha = document.getElementById("senha");
const confSenha = document.getElementById("confirmar-senha");

function enviar(){
    if(validar()){
        envia();
    }
}

function validar() {
    if (verificaVazio()) {
        alert("Todos os campos devem ser preenchidos!");
        return false;
    }else if(validaEmail()){
        alert("Insira um e-mail válido!");
        return false;
    }else if (nome.value.length > 50) {
        alert("O Nome ultrapassa o limite de caracteres!");
        return false;
    }else if(comparaSenha()){
        alert("As senhas devem ser iguais!");
        return false;
    }else if(tamanhoSenha()){
        alert("A senha deve ter entre 5 a 20 caracteres");
        return false;
    }else if (validaCpf()){
        alert("Insira um CPF válido!");
        return false;
    }
    return true;
}

function verificaVazio() {
    return email.value == '' || nome.value == '' || cpf.value == '' || dataNasc.value == '' || senha.value == '' || confSenha.value == ''
}

function validaEmail(){
    if(email.value.includes('@') && email.value.includes('.')){
        return false;
    }
    return true;
}

function validaCpf() {
    strCPF = cpf.value;
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
    if (resto != parseInt(strCPF.substring(10, 11)))return true;
    
    return false && strCPF.value.length< 11;
}

function comparaSenha(){
    return senha.value != confSenha.value;
}

function tamanhoSenha(){
    return (senha.value.length < 5 || senha.value.length > 20);
}