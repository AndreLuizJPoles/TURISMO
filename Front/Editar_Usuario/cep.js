function consultaEndereco() {
let strCEP = cep.value;
strCEP = strCEP.replace(/[^\d]+/g, '');

    if (strCEP.length !== 8) {
        alert("CEP inválido!");
        return;
    }

    let url = `https://viacep.com.br/ws/${strCEP}/json/`;

    fetch(url).then(function (response) {
        response.json().then(mostrarEndereco);
    })
}

function mostrarEndereco(dados) {
    if (dados.erro) {
        alert("Não foi possível localizar endereço!");
    } else {
        uf.value = dados.uf;
        cidade.value = dados.localidade;
        bairro.value = dados.bairro;
        rua.value = dados.logradouro;
    }
}