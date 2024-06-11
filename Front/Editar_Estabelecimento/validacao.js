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
const instagram = document.getElementById('instagram');
const facebook = document.getElementById('facebook');
const linkedin = document.getElementById('linkedin');
const website = document.getElementById('website');
const whatsapp = document.getElementById('whatsapp');

window.onload = async function () {
  const LOCAL_API_URL_CAT = `http://localhost:3000/api/establishmentCategories`;

  try {
    const response = await axios.get(LOCAL_API_URL_CAT, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const dataList = document.getElementById("categorias");

    response.data.data.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.id;
      optionElement.textContent = option.name;
      dataList.appendChild(optionElement);
    });
  } catch (error) {
    console.log(error);
  }

  const idEstab = localStorage.getItem("idAtracao");
  const LOCAL_API_URL = `http://localhost:3000/api/establishments/${idEstab}`;
  try {
    const response = await axios.get(LOCAL_API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(response);

    nome.value = response.data.data.name;
    cnpj.value = response.data.data.cnpj;
    categorias.value = response.data.data.category_id;
    descricao.value = response.data.data.description;

    cep.value = response.data.data.zip_code;
    uf.value = response.data.data.state;
    cidade.value = response.data.data.city;

    const [bairroAux, ruaAux, numAux] = response.data.data.address.split(", ");

    bairro.value = bairroAux;
    rua.value = ruaAux;
    numero.value = numAux;

    const LOCAL_API_URL_CONTATOS = `http://localhost:3000/api/establishmentContacts/establishments/${idEstab}`;

        const responseContacts = await axios.get(
            LOCAL_API_URL_CONTATOS,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        console.log(responseContacts.data.data);

        responseContacts.data.data.forEach(contact => {
          if (contact.email === 'sememail@email.com' || contact.phone_number === '0'){
      
          }else{
              if(contact.email){
                  if(email1.value === ''){
                    email1.value = contact.email;
                  }else if(email2.value === ''){
                    email2.value = contact.email;
                  }else{
                    email3.value = contact.email;
                  }
              }else{
                if(telefone1.value === ''){
                  telefone1.value = contact.phone_number;
                }else if(telefone2.value === ''){
                  telefone2.value = contact.phone_number;
                }else{
                  telefone3.value = contact.phone_number;
                }
              }
          }
      });

      const LOCAL_API_URL_WORKING = `http://localhost:3000/api/establishment_working_time/${idEstab}`;

      const responseWork = await axios.get(
        LOCAL_API_URL_WORKING,
        {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    console.log(responseWork)
  } catch (error) {
    console.log(error);
  }

};

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

async function salvar() {
  if (validar()) {
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
    if (email1.value == "") {
      email1.value = "sememail@email.com";
    }
    if (email2.value == "") {
      email2.value = "sememail@email.com";
    }
    if (email3.value == "") {
      email3.value = "sememail@email.com";
    }
    if (telefone1.value == "") {
      telefone1.value = "0";
    }
    if (telefone2.value == "") {
      telefone2.value = "0";
    }
    if (telefone3.value == "") {
      telefone3.value = "0";
    }

    const contacts = {
      emails: [email1.value, email2.value, email3.value],
      phone_numbers: [telefone1.value, telefone2.value, telefone3.value],
    };

    console.log(whatsapp.value)

    const payload = {
      id: localStorage.getItem("idAtracao"),
      name: nomeEstab.value,
      cnpj: cnpj.value,
      description: descricao.value,
      category_id: categoria.value,
      address: bairro.value + ", " + rua.value + ", " + numero.value,
      zip_code: cep.value,
      state: uf.value,
      //workingTime,
      contacts,
      city: cidade.value,
      //instagram_url: instagram.value,
      //facebook_url: facebook.value,
      //linkedin_url: linkedin.value,
      //website_url: website.value,
      //whatsapp: whatsapp.value
    };

    try {
      const LOCAL_API_URL = "http://localhost:3000/api/establishments";
      const response = await axios.put(LOCAL_API_URL, payload, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const imagemPerfilValue = document.getElementById("imagem-perfil");
      const file = imagemPerfilValue.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("picture", file);

        console.log("formData", formData);
        const LOCAL_API_URL_IMAGE = `${LOCAL_API_URL}/${localStorage.getItem(
          "idAtracao"
        )}/upload/picture_upload?type=profile`;
        const imagemRequest = await axios.post(LOCAL_API_URL_IMAGE, formData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(imagemRequest);
      }
      const imagemPlanoValue = document.getElementById("imagem-plano");
      const filePlano = imagemPlanoValue.files[0];
      if (filePlano) {
        const formDataPlano = new FormData();
        formDataPlano.append("picture", filePlano);

        console.log("formDataPlano", formDataPlano);
        const LOCAL_API_URL_IMAGE_BACK = `${LOCAL_API_URL}/${localStorage.getItem(
          "idAtracao"
        )}/upload/picture_upload?type=background_picture`;
        const imagemPlanoRequest = await axios.post(LOCAL_API_URL_IMAGE_BACK, formDataPlano, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(imagemPlanoRequest);
      }
      window.location.replace('../Perfil_Estabelecimento/perfil_estab_postagens.html');

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

async function excluir() {
  const LOCAL_API_URL_DELETE = `http://localhost:3000/api/establishments/${localStorage.getItem("idAtracao")}`;
  try {
    const response = await axios.delete(LOCAL_API_URL_DELETE, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(response);

    window.location.replace("../Menu/index.html");
  } catch (error) {
    console.log({
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(error);
  }
}

function avisoExcluir() {
  const confirmationPopup = document.getElementById("confirmationPopup");
  const closeBtn = document.querySelector(".close-btn");
  const confirmDelete = document.getElementById("confirmDelete");
  const cancelDelete = document.getElementById("cancelDelete");

  confirmationPopup.style.display = "block";

  closeBtn.addEventListener("click", function () {
    confirmationPopup.style.display = "none";
  });

  cancelDelete.addEventListener("click", function () {
    confirmationPopup.style.display = "none";
  });

  confirmDelete.addEventListener("click", function () {
    excluir();
    alert("Estabelecimento deletado com sucesso!");
    confirmationPopup.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == confirmationPopup) {
      confirmationPopup.style.display = "none";
    }
  });
}
