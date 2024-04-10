const email = document.getElementById("email");
const nome = document.getElementById("nome");
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
    }else if (nome.value.length > 80) {
        alert("O Nome ultrapassa o limite de caracteres!");
        return false;
    }else if(comparaSenha()){
        alert("As senhas devem ser iguais!");
        return false;
    }else if(tamanhoSenha()){
        alert("A senha deve ter entre 8 a 20 caracteres");
        return false;
    }
    return true;
}

function verificaVazio() {
    return email.value == '' || nome.value == '' || dataNasc.value == '' || senha.value == '' || confSenha.value == ''
}

function validaEmail(){
    if(email.value.includes('@') && email.value.includes('.')){
        return false;
    }
    return true;
}

function comparaSenha(){
    return senha.value != confSenha.value;
}

function tamanhoSenha(){
    return (senha.value.length < 8 || senha.value.length > 20);
}