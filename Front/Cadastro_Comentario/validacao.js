const nota = document.getElementById("nota");
const descricao = document.getElementById("descricao");

function comentar(){
    if(validacao()){
        alert("Foi!");
    }
}

function validacao(){
    if(rangenota()){
        alert('A nota deve ser de 1 a 5!');
        return false;
    }
    return true;
}

function rangenota(){
    if(nota.value >= 1 && nota.value <= 5){
        return false;
    }
    return true;
}