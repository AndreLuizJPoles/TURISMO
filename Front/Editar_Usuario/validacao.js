const nome = document.getElementById("nome");
const email = document.getElementById("email");
const cpf = document.getElementById("cpf");
const telefone = document.getElementById("telefone");
const datNasc = document.getElementById("data-nasc");
const cep = document.getElementById("cep");
const uf = document.getElementById("uf");
const cidade = document.getElementById("cidade");
const bairro = document.getElementById("bairro");
const rua = document.getElementById("rua");
const numero = document.getElementById("numero");
const masc = document.getElementById("masc");
const fem = document.getElementById("fem");
const other = document.getElementById("outro");
const senha = document.getElementById("senha");
let genero = "other";

const imagemPerfil = document.querySelector("#imagem-perfil");

imagemPerfil.addEventListener("change", async (event) => {
  const reader = new FileReader();
  reader.onload = function (event) {
    const preview = document.querySelector("#preview-imagem");

    if (preview) {
      preview.remove();
    }

    const previewImagem = document.createElement("img");
    previewImagem.width = 100;
    previewImagem.height = 100;
    previewImagem.id = "preview-imagem";
    imagemPerfil.insertAdjacentElement("afterend", previewImagem);
    previewImagem.src = event.target.result;
  };

  reader.readAsDataURL(imagemPerfil.files[0]);
});

function verificaVazio() {
  return nome.value == "" || email.value == "" || datNasc.value == "";
}

function validaEmail() {
  if (email.value.includes("@") && email.value.includes(".")) {
    return false;
  }
  return true;
}

function validaCpf() {
  let strCPF = cpf.value;

  if (strCPF == "") {
    return false;
  }

  strCPF = strCPF.replace(/[^\d]+/g, "");
  var soma = 0,
    resto = 0;
  if (
    strCPF == "00000000000" ||
    strCPF == "11111111111" ||
    strCPF == "22222222222" ||
    strCPF == "33333333333" ||
    strCPF == "44444444444" ||
    strCPF == "55555555555" ||
    strCPF == "66666666666" ||
    strCPF == "77777777777" ||
    strCPF == "88888888888" ||
    strCPF == "99999999999"
  )
    return true;

  for (let i = 1; i <= 9; i++)
    soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(strCPF.substring(9, 10))) return true;

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(strCPF.substring(10, 11))) return true;

  return false && strCPF.value.length < 11;
}

async function validar() {
  if (verificaVazio()) {
    alert("Preencha todos os campos obrigatórios!");
    return false;
  } else if (validaEmail()) {
    alert("Insira um e-mail válido!");
    return false;
  } else if (validaCpf()) {
    alert("Insira um CPF válido!");
    return false;
  } else if (nome.value.length > 80) {
    alert("O Nome ultrapassa o limite de caracteres!");
    return false;
  }
}

async function salvar() {
  if (validar()) {
    const LOCAL_API_URL = "http://localhost:3000/api/users";

    try {
      if (masc.checked) {
        genero = "male";
      } else if (fem.checked) {
        genero = "female";
      }

      const nomeValue = nome.value;
      const emailValue = email.value;
      const cpfValue = cpf.value;
      const telefoneValue = telefone.value;
      const datNascValue = datNasc.value;
      const cepValue = cep.value;
      const ufValue = uf.value;
      const cidadeValue = cidade.value;
      const bairroValue = bairro.value;
      const ruaValue = rua.value;
      const numeroValue = numero.value;
      const generoValue = genero;
      const adress = bairroValue + ", " + ruaValue + ", " + numeroValue;
      const ID = await pegaID();
      const imagemPerfilValue = document.getElementById("imagem-perfil");
      const file = imagemPerfilValue.files[0];

      console.log(file);

      const response = await axios.put(
        LOCAL_API_URL,
        {
          id: ID,
          name: nomeValue,
          gender: generoValue,
          cpf: cpfValue,
          phone_number: telefoneValue,
          birthdate: datNascValue,
          address: adress,
          zip_code: cepValue,
          city: cidadeValue,
          state: ufValue,
          email: emailValue,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      /* const LOCAL_API_URL_IMAGE = `${LOCAL_API_URL}/${ID}/upload/profile_picture`;

      const imagemRequest = await axios.put(
        LOCAL_API_URL_IMAGE,
        {
          picture_url: file,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); */

      alert("Edição concluída!");
      window.location.replace("../Menu/index.html");
    } catch (error) {
      console.log(error);
    }
  }
}

window.onload = async function () {
  const ID = await pegaID();
  const LOCAL_API_URL = `http://localhost:3000/api/users/${ID}`;

  try {

    const response = await axios.get(LOCAL_API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(response);

    nome.value = response.data.data.name;
    email.value = response.data.data.email;
    cpf.value = response.data.data.cpf;
    telefone.value = response.data.data.phone_number;
    cep.value = response.data.data.zip_code;
    uf.value = response.data.data.state;
    cidade.value = response.data.data.city;
    senha.value = response.data.data.password;

    const dataAux = new Date(response.data.data.birthdate);
    const dia = dataAux.getUTCDate();
    let mes = dataAux.getUTCMonth() + 1;
    const ano = dataAux.getFullYear();

    if (mes < 10) {
      mes = "0" + mes;
    }

    datNasc.value = `${ano}-${mes}-${dia}`;

    if (response.data.data.gender === "male") {
      masc.checked = true;
    } else if (response.data.data.gender === "female") {
      fem.checked = true;
    } else {
      other.checked = true;
    }

    const [bairroAux, ruaAux, numAux] = response.data.data.address.split(", ");

    bairro.value = bairroAux;
    rua.value = ruaAux;
    numero.value = numAux;
  } catch (error) {
    console.log(error);
  }
};

async function pegaID() {
  const LOCAL_API_URL = "http://localhost:3000/api/users/loggedUser";
  try {
    const response = await axios.get(LOCAL_API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

async function excluir() {
  const ID = await pegaID();
  const LOCAL_API_URL_DELETE = `http://localhost:3000/api/users/${ID}`;
  try {
    const response = await axios.delete(LOCAL_API_URL_DELETE, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(response);

    window.location.replace("../Login/login.html");
  } catch (error) {
    console.log({
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(error);
  }
}

function avisoExcluir(){
    const confirmationPopup = document.getElementById('confirmationPopup');
    const closeBtn = document.querySelector('.close-btn');
    const confirmDelete = document.getElementById('confirmDelete');
    const cancelDelete = document.getElementById('cancelDelete');

    confirmationPopup.style.display = 'block';

    closeBtn.addEventListener('click', function () {
        confirmationPopup.style.display = 'none';
    });

    cancelDelete.addEventListener('click', function () {
        confirmationPopup.style.display = 'none';
    });

    confirmDelete.addEventListener('click', function () {
        excluir();
        alert('Conta deletada com sucesso!');
        confirmationPopup.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == confirmationPopup) {
            confirmationPopup.style.display = 'none';
        }
    });
};