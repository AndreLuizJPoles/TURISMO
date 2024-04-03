const email = document.getElementById("email");
const senha = document.getElementById("senha");

function enviar(){
    if(validar()){
        envia();
    }
}

function validar(){
    if(email.value == '' || senha.value == ''){
        alert('Preencha todos os campos!');
        return false;
    }
    return true;
}