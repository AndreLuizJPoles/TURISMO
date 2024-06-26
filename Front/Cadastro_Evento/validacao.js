const nome = document.getElementById("nome");
const estabelecimento = document.getElementById("estabelecimento");
const ponto = document.getElementById("ponto");
const pontoTuristico = document.getElementById("ponto");
const descricao = document.getElementById("descricao");
const dataInicio = document.getElementById("data-inicio");
const dataFim = document.getElementById("data-fim");
const horaAberta = document.getElementById("hora-abertura");
const horaEncer = document.getElementById("hora-encerramento");

function validar() {
  if (verificaVazio()) {
    alert("Preencha todos os campos obrigatórios!");
    return false;
  }
  if (!validaHora()) {
    alert("O horário de abertura deve ser menor que o horário de fechamento!");
    return false;
  }

  if (!validaData()) {
    alert("A data de início deve ser menor que a data de encerramento!");
    return false;
  }

  return true;
}

function verificaVazio() {
  return (
    nome.value == "" ||
    horaAberta.value == "" ||
    horaEncer.value == "" ||
    dataInicio.value == "" ||
    dataFim.value == ""
  );
}

function validaHora() {
  return horaEncer.value >= horaAberta.value;
}

function validaData() {
  return dataInicio.value <= dataFim.value;
}

async function cadastrar() {
  if (validar()) {
    localStorage.setItem("idEstab", null);
    let pontoAux, estAux;
    if (ponto.value === '') {
      pontoAux = null;
      estAux = estabelecimento.value;
    } else {
      pontoAux = ponto.value;
      estAux = null;
    }

    const payload = {
      name: nome.value,
      description: descricao.value,
      establishment_id: estAux,
      attraction_id: pontoAux,
      start_date: dataInicio.value,
      end_date: dataFim.value,
      start_time: horaAberta.value,
      end_time: horaEncer.value,
    };

    try {
      const LOCAL_API_URL = "http://localhost:3000/api/events";

      const response = await axios.post(LOCAL_API_URL, payload, {
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
        const LOCAL_API_URL_IMAGE = `${LOCAL_API_URL}/${response.data.data.id}/upload/picture_upload?type=profile`;
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
        const LOCAL_API_URL_IMAGE_BACK = `${LOCAL_API_URL}/${response.data.data.id}/upload/picture_upload?type=background_picture`;
        const imagemPlanoRequest = await axios.post(LOCAL_API_URL_IMAGE_BACK, formDataPlano, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(imagemPlanoRequest);
      }

      alert('Evento criado!');
      window.location.replace('../Menu/index.html');
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
  const LOCAL_API_URL = `http://localhost:3000/api/attractions`;

  try {
    const response = await axios.get(
      LOCAL_API_URL,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const dataList = document.getElementById("ponto");

    response.data.data.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.id;
      optionElement.textContent = option.name;
      dataList.appendChild(optionElement);
    });

  } catch (error) {
    console.log(error);
  }

  const LOCAL_API_URL_EST = `http://localhost:3000/api/establishments`;
  const ID = await pegaID();

  try {
    const LOCAL_API_URL_USER = `http://localhost:3000/api/users/${ID}`;
    const response = await axios.get(LOCAL_API_URL_USER,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

    if (response.data.data.email !== 'admin1@email.com' && response.data.data.email !== 'admin2@example.com' && response.data.data.email !== 'admin3@example.com') {
      const pontos = document.getElementById('ponto');
      const textoAviso = document.getElementById('texto-aviso');
      textoAviso.style.display = 'none';
      pontos.style.display = 'none';
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const response = await axios.get(
      LOCAL_API_URL_EST,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const dataList = document.getElementById("estabelecimento");

    response.data.data.forEach(option => {
      if (option.user_id === ID) {
        const optionElement = document.createElement('option');
        optionElement.value = option.id;
        optionElement.textContent = option.name;
        dataList.appendChild(optionElement);
      }
    });

  } catch (error) {
    console.log(error);
  }

  if(localStorage.getItem("idEstab")){
    estabelecimento.value = localStorage.getItem("idEstab");
  }
}

async function pegaID() {
  const LOCAL_API_URL_ID = 'http://localhost:3000/api/users/loggedUser';
  try {

    const response = await axios.get(
      LOCAL_API_URL_ID,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data.data;

  } catch (error) {
    console.log(error);
  }
}

function tiraPonto() {
  ponto.value = '';
}

function tiraEst() {
  estabelecimento.value = '';
}

function voltar() {
  localStorage.setItem("idEstab", null);
  window.location.replace('../Menu/index.html');
}