const nomeEstab = document.getElementById("nome");
const cnpj = document.getElementById("cnpj");
const categoria = document.getElementById("categorias");
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
const email1 = document.getElementById("email1");
const email2 = document.getElementById("email2");
const email3 = document.getElementById("email3");
const telefone1 = document.getElementById("telefone1");
const telefone2 = document.getElementById("telefone2");
const telefone3 = document.getElementById("telefone3");
const descricao = document.getElementById("descricao");
let horaAbertoSeg = document.getElementById('hora-abertura-segunda');
let horaEncerSeg = document.getElementById('hora-encerramento-segunda');
let horaAbertoTer = document.getElementById('hora-abertura-terca');
let horaEncerTer = document.getElementById('hora-encerramento-terca');
let horaAbertoQua = document.getElementById('hora-abertura-quarta');
let horaEncerQua = document.getElementById('hora-encerramento-quarta');
let horaAbertoQui = document.getElementById('hora-abertura-quinta');
let horaEncerQui = document.getElementById('hora-encerramento-quinta');
let horaAbertoSex = document.getElementById('hora-abertura-sexta');
let horaEncerSex = document.getElementById('hora-encerramento-sexta');
let horaAbertoSab = document.getElementById('hora-abertura-sabado');
let horaEncerSab = document.getElementById('hora-encerramento-sabado');
let horaAbertoDom = document.getElementById('hora-abertura-domingo');
let horaEncerDom = document.getElementById('hora-encerramento-domingo');
let segId, terId, quaId, quiId, sexId, sabId, domId;

window.onload = async function () {
  const LOCAL_API_URL = `http://localhost:3000/api/establishmentCategories`;

  try {
    const response = await axios.get(
      LOCAL_API_URL,
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

    const agora = new Date();

    const LOCAL_API_URL_DAY = 'http://localhost:3000/api/daysOfWeek';

    const responseDay = await axios.get(
      LOCAL_API_URL_DAY
    );

    responseDay.data.data.forEach(day => {

      switch (day.day_of_week) {
        case "Domingo":
          domId = day.id;
          break;
        case "Segunda-feira":
          segId = day.id;
          break;
        case "Terça-feira":
          terId = day.id;
          break;
        case "Quarta-feira":
          quaId = day.id;
          break;
        case "Quinta-feira":
          quiId = day.id;
          break;
        case "Sexta-feira":
          sexId = day.id;
          break;
        case "Sábado":
          sabId = day.id;
          break;
      }

    });

  } catch (error) {
    console.log(error);
  }
}

async function cadastrar() {
  if (validar()) {
    const category = document.getElementById("categorias");
    const neighborhood = document.getElementById("bairro").value;
    const street = document.getElementById("rua").value;
    const number = document.getElementById("numero").value;
    const adress = neighborhood + ', ' + street + ', ' + number;
    if (!segunda.checked) {
      horaAbertoSeg.value = '00:00';
      horaEncerSeg.value = '00:00';
    }
    if (!terca.checked) {
      horaAbertoTer.value = '00:00';
      horaEncerTer.value = '00:00';
    }
    if (!quarta.checked) {
      horaAbertoQua.value = '00:00';
      horaEncerQua.value = '00:00';
    }
    if (!quinta.checked) {
      horaAbertoQui.value = '00:00';
      horaEncerQui.value = '00:00';
    }
    if (!sexta.checked) {
      horaAbertoSex.value = '00:00';
      horaEncerSex.value = '00:00';
    }
    if (!sabado.checked) {
      horaAbertoSab.value = '00:00';
      horaEncerSab.value = '00:00';
    }
    if (!domingo.checked) {
      horaAbertoDom.value = '00:00';
      horaEncerDom.value = '00:00';
    }

    const workingTime = [
      {
        day_of_week_id: segId,
        opening_time: horaAbertoSeg.value,
        closing_time: horaEncerSeg.value,
      },
      {
        day_of_week_id: terId,
        opening_time: horaAbertoTer.value,
        closing_time: horaEncerTer.value,
      },
      {
        day_of_week_id: quaId,
        opening_time: horaAbertoQua.value,
        closing_time: horaEncerQua.value,
      },
      {
        day_of_week_id: quiId,
        opening_time: horaAbertoQui.value,
        closing_time: horaEncerQui.value,
      },
      {
        day_of_week_id: sexId,
        opening_time: horaAbertoSex.value,
        closing_time: horaEncerSex.value,
      },
      {
        day_of_week_id: sabId,
        opening_time: horaAbertoSab.value,
        closing_time: horaEncerSab.value,
      },
      {
        day_of_week_id: domId,
        opening_time: horaAbertoDom.value,
        closing_time: horaEncerDom.value,
      },
    ];

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
      name: nomeEstab.value,
      cnpj: cnpj.value,
      description: descricao.value,
      category_id: category.value,
      address: adress,
      city: cidade.value,
      zip_code: cep.value,
      state: uf.value,
      workingTime,
      contacts
    };


    try {
      const LOCAL_API_URL = "http://localhost:3000/api/establishments";

      const response = await axios.post(LOCAL_API_URL, payload, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert('Estabelecimento Cadastrado!');
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
  if (validaCNPJ()) {
    alert("CNPJ inválido!");
    return false;
  }
  /*if (validaHora()) {
    alert("O horário de abertura deve ser menor que o horário de fechamento!");
    return false;
  }*/
  return true;
}

function verificaVazio() {
  return (
    nomeEstab.value == "" ||
    cnpj.value == "" ||
    categoria.value == "" ||
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