const nome = document.getElementById("nome");
const email = document.getElementById("email");
const cpf = document.getElementById("cpf");
const telefone = document.getElementById("telefone");
const datNasc = document.getElementById("data-nasc");
const genero = document.getElementsByName("genero");
const cep = document.getElementById("cep");
const uf = document.getElementById("uf");
const cidade = document.getElementById("cidade");
const bairro = document.getElementById("bairro");
const rua = document.getElementById("rua");
const numero = document.getElementById("numero");
const complemento = document.getElementById("complemento"); //TODO: nao temos complemento na base
//TODO: na base temos apenas os campos address, zip_code, city e state

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

/*TODO: está dando erro na hora de enviar os dados pois ainda nao temos a funcionalidade de preencher os campos
com os dados da base, mas se preenchermos tudo na mao ele funciona */
async function salvar() {
  if (validar()) {
    const LOCAL_API_URL = "http://localhost:3000/api/users";

    try {
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
      const complementoValue = complemento.value;
      const generoValue = genero.value;

      const response = await axios.put(
        LOCAL_API_URL,
        {
          id: "2009e6e6-17c1-4002-97ea-ac4c028debfe", //TODO: trocar para pegar o id do cara logado
          name: nomeValue,
          gender: generoValue,
          cpf: cpfValue,
          phone_number: telefoneValue,
          birthdate: datNascValue,
          address: "", // TODO: add campo address no form
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
    } catch (error) {
      console.log(error);
    }
  }
}

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
