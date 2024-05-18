const nomeEstab = document.getElementById("nome");
const cnpj = document.getElementById("cnpj");
const categoria = document.getElementById("categoria");
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
const complemento = document.getElementById("complemento");

async function cadastrar() {
  if (validar()) {
    const categoria = document.getElementById("categoria").value; //TODO: puxar da base todas categorias, renderizar numa tag select e pegar o id da categoria
    const neighborhood = document.getElementById("bairro").value;
    const street = document.getElementById("rua").value;
    const number = document.getElementById("numero").value;
    const complement = document.getElementById("complemento").value; //TODO: nao temos complemento na base
    const workingTime = [
      {
        day_of_week_id:
          "5bd361e1-a5ec-4d26-8cba-0dc434a71fdc" /*TODO: iremos listar os dias da semana que temos na base iremos pegar o id, sendo assim, teremos um array de objetos com*/,
        opening_time: horaAberto.value,
        closing_time: horaFecha.value,
      },
    ]; //TODO: modelo de array pra armazenar os dias de funcionamento e seus horários

    const contacts = {
      emails: ["", "", ""], //TODO: pegar 3 emails do formulário
      phone_numbers: ["", "", ""], //TODO: pegar 3 telefones do formulário
    };

    const payload = {
      name: nomeEstab.value,
      cnpj: cnpj.value,
      description: "aaas", //TODO: add campo descrição no formulário
      category_id: "050403a3-d1a8-4224-bec7-47da58b5f4b7", //TODO: informar o id da categoria escolhida pelo usuário
      address: "aa", //TODO: add campo address no formulário
      city: cidade.value,
      zip_code: cep.value,
      state: uf.value,
      workingTime,
    };

    try {
      const LOCAL_API_URL = "http://localhost:3000/api/establishments";

      const response = await axios.post(LOCAL_API_URL, payload, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }); //TODO: a criação já está funcionando da forma que eu deixei com alguns dados mockados, falta fazer as adaptações que mencionei

      //window.location.replace('../Menu/menu.html');
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
