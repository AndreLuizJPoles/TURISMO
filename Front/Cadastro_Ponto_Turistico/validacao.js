const nomePonto = document.getElementById("nome");
const cep = document.getElementById("cep");
const uf = document.getElementById("uf");
const cidade = document.getElementById("cidade");
const bairro = document.getElementById("bairro");
const rua = document.getElementById("rua");
const descricao = document.getElementById('descricao');
const email1 = document.getElementById("email1");
const email2 = document.getElementById("email2");
const email3 = document.getElementById("email3");
const telefone1 = document.getElementById("telefone1");
const telefone2 = document.getElementById("telefone2");
const telefone3 = document.getElementById("telefone3");

async function cadastrar() {
    if (validar()) {
        const neighborhood = document.getElementById("bairro").value;
        const street = document.getElementById("rua").value;
        const number = document.getElementById("numero").value;
        const address = neighborhood + ', ' + street + ', ' + number;

        if (email1.value == '') {
            email1.value = 'sememail@email.com';
        }
        if (email2.value == '') {
            email2.value = 'sememail@email.com';
        }
        if (email3.value == '') {
            email3.value = 'sememail@email.com';
        }
        if (telefone1.value == '') {
            telefone1.value = '0';
        }
        if (telefone2.value == '') {
            telefone2.value = '0';
        }
        if (telefone3.value == '') {
            telefone3.value = '0';
        }

        const contacts = {
            emails: [email1.value, email2.value, email3.value],
            phone_numbers: [telefone1.value, telefone2.value, telefone3.value],
        };

        const payload = {
            name: nomePonto.value,
            description: descricao.value,
            city: cidade.value,
            address: address,
            zip_code: cep.value,
            state: uf.value,
            contacts
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