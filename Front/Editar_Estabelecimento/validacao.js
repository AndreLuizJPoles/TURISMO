const nomeEstab = document.getElementById("nome");
const cnpj = document.getElementById("cnpj");
const categoria = document.getElementById("categorias");
const descricao = document.getElementById("descricao");
const horaAberto = document.getElementById("hora-abertura");
const horaFecha = document.getElementById("hora-encerramento");
const segunda = document.getElementById("segunda");
const terca = document.getElementById("terca");
const quarta = document.getElementById("quarta");
const quinta = document.getElementById("quinta");
const sexta = document.getElementById("sexta");
const sabado = document.getElementById("sabado");
const domingo = document.getElementById("domingo");
const cep = document.getElementById("cep");
const uf = document.getElementById("uf");
const cidade = document.getElementById("cidade");
const bairro = document.getElementById("bairro");
const rua = document.getElementById("rua");
const numero = document.getElementById("numero");
const telefone1 = document.getElementById("telefone1");
const telefone2 = document.getElementById("telefone2");
const telefone3 = document.getElementById("telefone3");
const email1 = document.getElementById("email1");
const email2 = document.getElementById("email2");
const email3 = document.getElementById("email3");

function validar() {
  if (verificaVazio()) {
    alert("Preencha todos os campos obrigatórios!");
    return false;
  }
  if (validaCNPJ()) {
    alert("CNPJ inválido!");
    return false;
  }
  if (validaHora()) {
    alert("O horário de abertura deve ser menor que o horário de fechamento!");
    return false;
  }
  return true;
}

function verificaVazio() {
  return (
    nomeEstab.value == "" ||
    cnpj.value == "" ||
    categoria.value == "" ||
    horaAberto.value == "" ||
    horaFecha.value == "" ||
    cep.value == "" ||
    cidade.value == "" ||
    bairro.value == "" ||
    rua.value == "" ||
    uf.value == ""
  );
}

function validaCNPJ() {
  var strCNPJ = cnpj.value;
  strCNPJ = strCNPJ.replace(/[^\d]+/g, "");

  if (strCNPJ == "") return true;
  if (strCNPJ.length != 14) return true;
  if (
    strCNPJ == "00000000000000" ||
    strCNPJ == "11111111111111" ||
    strCNPJ == "22222222222222" ||
    strCNPJ == "33333333333333" ||
    strCNPJ == "44444444444444" ||
    strCNPJ == "55555555555555" ||
    strCNPJ == "66666666666666" ||
    strCNPJ == "77777777777777" ||
    strCNPJ == "88888888888888" ||
    strCNPJ == "99999999999999"
  )
    return true;

  var tamanho = strCNPJ.length - 2;
  var numeros = strCNPJ.substring(0, tamanho);
  var digitos = strCNPJ.substring(tamanho);
  var soma = 0;
  var pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return true;
  tamanho = tamanho + 1;
  numeros = strCNPJ.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return true;

  return false;
}

function validaHora() {
  return horaFecha.value <= horaAberto.value;
}

async function salvar() { 
  if (validar()) {
    const workingTime = [//TODO: modelo de array que vamos enviar, aqui vamos ter TODOS os dias da semana e seus horários
      {
        day_of_week_id: "5bd361e1-a5ec-4d26-8cba-0dc434a71fdc", //TODO: pegar id que foi retornado da base na listagem
        opening_time: horaAberto.value,
        closing_time: horaFecha.value,
      },
    ]; 

    if(email1.value == ''){
      email1.value = 'sememail@email.com';
    }
    if(email2.value == ''){
      email2.value = 'sememail@email.com';
    }
    if(email3.value == ''){
      email3.value = 'sememail@email.com';
    }
    if(telefone1.value == ''){
      telefone1.value = '0';
    }
    if(telefone2.value == ''){
      telefone2.value = '0';
    }
    if(telefone3.value == ''){
      telefone3.value = '0';
    }

    const contacts = {
      emails: [email1.value, email2.value, email3.value],
      phone_numbers: [telefone1.value, telefone2.value, telefone3.value],
    };

    const payload = {
      id: localStorage.getItem("idEstab"), 
      name: nomeEstab.value,
      cnpj: cnpj.value,
      description: descricao.value,
      category_id: categoria.value,
      address: bairro.value + ', ' + rua.value + ', ' + numero.value,
      zip_code: cep.value,
      state: uf.value,
      workingTime,
      contacts,
    };

    try {
      const LOCAL_API_URL = "http://localhost:3000/api/establishments";
      const response = await axios.put(LOCAL_API_URL, payload, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

const imagemPlano = document.querySelector("#imagem-plano");

imagemPlano.addEventListener("change", (event) => {
  const reader = new FileReader();
  reader.onload = function (event) {
    const previewPlano = document.querySelector("#preview-imagem-plano");

    if (previewPlano) {
      previewPlano.remove();
    }

    const previewImagemPlano = document.createElement("img");
    previewImagemPlano.width = 300;
    previewImagemPlano.height = 100;
    previewImagemPlano.id = "preview-imagem-plano";
    imagemPlano.insertAdjacentElement("afterend", previewImagemPlano);
    previewImagemPlano.src = event.target.result;
  };

  reader.readAsDataURL(imagemPlano.files[0]);
});

const imagemPerfil = document.querySelector("#imagem-perfil");

imagemPerfil.addEventListener("change", (event) => {
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

window.onload = async function () {
  const LOCAL_API_URL_CAT = `http://localhost:3000/api/establishmentCategories`;

  try {

    console.log(LOCAL_API_URL_CAT);

    const response = await axios.get(
      LOCAL_API_URL_CAT,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const dataList = document.getElementById("categorias");

    response.data.data.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.id;
      optionElement.textContent = option.name;
      dataList.appendChild(optionElement);
    });

  } catch (error) {
    console.log(error);
  }

  const idEstab = localStorage.getItem("idEstab");
  const LOCAL_API_URL = `http://localhost:3000/api/establishments/${idEstab}`;

  try {

    console.log(LOCAL_API_URL);

    const response = await axios.get(
      LOCAL_API_URL,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(response);

    nome.value = response.data.data.name;
    cnpj.value = response.data.data.cnpj;
    categorias.value = response.data.data.category_id;
    descricao.value = response.data.data.description;


    cep.value = response.data.data.zip_code;
    uf.value = response.data.data.state;
    cidade.value = response.data.data.city;

    const [bairroAux, ruaAux, numAux] = response.data.data.address.split(', ');

    bairro.value = bairroAux;
    rua.value = ruaAux;
    numero.value = numAux;

  } catch (error) {
    console.log(error);
  }
}