const nomePonto = document.getElementById("nome");
const cep = document.getElementById("cep");
const uf = document.getElementById("uf");
const cidade = document.getElementById("cidade");
const bairro = document.getElementById("bairro");
const rua = document.getElementById("rua");
const numero = document.getElementById("numero");
const descricao = document.getElementById('descricao');

async function cadastrar() {
    if (validar()) {
        const neighborhood = document.getElementById("bairro").value;
        const street = document.getElementById("rua").value;
        const number = document.getElementById("numero").value;
        const address = neighborhood + ', ' + street + ', ' + number;

        const payload = {
            name: nomePonto.value,
            description: descricao.value,
            city: cidade.value,
            address: address,
            zip_code: cep.value,
            state: uf.value,
        };


        try {
            const LOCAL_API_URL = "http://localhost:3000/api/attractions";

            const response = await axios.post(LOCAL_API_URL, payload, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            alert('Ponto Turístico Cadastrado!');
            window.location.replace('../Menu/index.html');
        } catch (error) {
            console.log(error);
            const aux = error.response.data.message;
            alert(aux);
        }
    }
}


function validar() {
    if (verificaVazio()) {
        alert("Preencha todos os campos obrigatórios!");
        return false;
    }
    return true;
}

function verificaVazio() {
    return nomePonto.value == '' || cep.value == '' || cidade.value == '' || bairro.value == '' || rua.value == '' || uf.value == '';
}