const nome = document.getElementById("nome");
const estabelecimento = document.getElementById("estabelecimento");
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
    dataFim.value == "" ||
    estabelecimento.value == ""
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
    const establishment_id = estabelecimento.value || null;
    const attraction_id = null;

    const payload = {
      name: nome.value,
      description: descricao.value,
      establishment_id: "32870deb-7419-418b-b4a2-d15a1957148c", //TODO: pegar o id do estabelecimento de acordo com a seleção do usuário e com o nome dele, isso vem na listagem
      attraction_id, //TODO: pegar o id do ponto turístico de acordo com a seleção do usuário e com o nome dele, isso vem na listagem
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
