const nome = document.getElementById("nome");
const estabelecimento = document.getElementById("estabelecimento");
const ponto = document.getElementById("ponto");
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
  return horaEncer.value > horaAberta.value;
}

function validaData() {
  return dataInicio.value <= dataFim.value;
}

async function salvar() {
  if (validar()) {
    let pontoAux, estAux;
    if (ponto.value === '') {
      pontoAux = null;
      estAux = estabelecimento.value;
    } else {
      pontoAux = ponto.value;
      estAux = null;
    }

    const payload = {
      id: localStorage.getItem("idAtracao"),
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
      alert('Evento alterado!');
      window.location.replace('../Perfil_Evento/perfil_evento_postagens.html');
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
  const idEvento = localStorage.getItem("idAtracao");
  const LOCAL_API_URL = `http://localhost:3000/api/events/${idEvento}`;

  try {
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
    descricao.value = response.data.data.description;
    horaAberta.value = response.data.data.start_time;
    horaEncer.value = response.data.data.end_time;

    let dataAux = new Date(response.data.data.start_date);
    let dia = dataAux.getUTCDate();
    let mes = dataAux.getUTCMonth() + 1;
    let ano = dataAux.getFullYear();

    if(dia < 10){
      dia = '0' + dia;
    }

    if (mes < 10) {
      mes = "0" + mes;
    }

    dataInicio.value = `${ano}-${mes}-${dia}`;


    dataAux = new Date(response.data.data.end_date);
    dia = dataAux.getUTCDate();
    mes = dataAux.getUTCMonth() + 1;
    ano = dataAux.getFullYear();

    if(dia < 10){
      dia = '0' + dia;
    }

    if (mes < 10) {
      mes = "0" + mes;
    }

    dataFim.value = `${ano}-${mes}-${dia}`;

    const LOCAL_API_URL_P = `http://localhost:3000/api/attractions`;

    try {
      const response = await axios.get(
        LOCAL_API_URL_P,
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

    try{
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
    }catch (error) {
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

    if (response.data.data.attraction_id === null) {
      ponto.value = '';
      estabelecimento.value = response.data.data.establishment_id;
    } else {
      ponto.value = response.data.data.attraction_id;
      estabelecimento.value = '';
    }

  } catch (error) {
    console.log(error);
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

async function excluir() {
  const LOCAL_API_URL_DELETE = `http://localhost:3000/api/events/${localStorage.getItem("idAtracao")}`;
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
    alert("Evento deletado com sucesso!");
    confirmationPopup.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == confirmationPopup) {
      confirmationPopup.style.display = "none";
    }
  });
}