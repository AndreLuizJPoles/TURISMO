const nome_user = document.getElementById('nome-usuario');
const endereco = document.getElementById('endereco');
const foto = document.getElementById('foto-perfil');
const fotoUsuario = document.getElementById('perfil-usuario');

window.onload = async function () {
  const ID = await pegaID();
  const LOCAL_API_URL = `http://localhost:3000/api/events`;

  const LOCAL_API_URL_USER = `http://localhost:3000/api/users/${ID}`;

  try {
    const response = await axios.get(
      LOCAL_API_URL_USER,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(response);

    nome_user.innerHTML = response.data.data.name;
    if (response.data.data.address == null || response.data.data.address === ', , ') {
      endereco.innerHTML = `<img src="../Perfil_Usuario/imgs/pin.png" id="icon-endereco" class="icon">`;
    } else {
      endereco.innerHTML = `<img src="../Perfil_Usuario/imgs/pin.png" id="icon-endereco" class="icon"> <p id="end-texto">${response.data.data.address}<p/>`;
    }
    if (!response.data.data.picture_url === null || !response.data.data.picture_url === '') {
      foto.src = response.data.data.picture_url;
      perfil.src = response.data.data.picture_url;
    }

    if (response.data.data.email !== 'admin1@email.com' || response.data.data.email !== 'admin2@example.com' || response.data.data.email !== 'admin3@example.com') {
      const pontos = document.getElementById('pontos');
      pontos.style.display = 'none';
    }

  } catch (error) {
    console.log(error);
  }

  try {
    const response = await axios.get(LOCAL_API_URL);

    response.data.data.forEach((estab) => {
      let statusValor = 'Fechado';
      const dataInicio = new Date(estab.start_date);
      const dataFim = new Date(estab.end_date);

        const bloco = document.createElement("div");
        bloco.onclick;
        bloco.classList.add("bloco");
        const img = document.createElement("img");
        bloco.appendChild(img);
        img.classList.add("imagem");
        img.src = estab.picture_url;
        img.id = "foto";
        const inferior = document.createElement("div");
        bloco.appendChild(inferior);
        inferior.classList.add("inferior");
        const h2 = document.createElement("h2");
        inferior.appendChild(h2);
        h2.id = "nome";
        h2.innerHTML = estab.name;
        const conjNota = document.createElement("div");
        inferior.appendChild(conjNota);
        conjNota.id = "conjunto-nota";
        const icone = document.createElement("img");
        conjNota.appendChild(icone);
        icone.classList.add("icone");
        icone.src = "../images/onibus.png";
        const nota = document.createElement("h3");
        conjNota.appendChild(nota);
        nota.id = "nota";
        nota.innerHTML = "5.0"; //TODO: Mockado
        const status = document.createElement("h3");
        inferior.appendChild(status);
        if (comparaDatas(dataInicio, dataFim, estab.start_time, estab.end_time)) {
          statusValor = 'Aberto';
        } else {
          status.style.color = 'red';
        }
        status.innerHTML = statusValor;
        status.id = "status";
        const grade = document.getElementById("grade");

        bloco.onclick = function () {
          localStorage.setItem("idAtracao", estab.id);
          localStorage.setItem("tipoAtracao", "evento");
          window.location.replace(
            "../Perfil_Evento/perfil_evento_postagens.html"
          );
        };

        grade.appendChild(bloco);
    });
  } catch (error) {
    console.log(error);
  }
}

async function pegaID() {
  const LOCAL_API_URL = 'http://localhost:3000/api/users/loggedUser';
  try {

    const response = await axios.get(
      LOCAL_API_URL,
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

function sair() {
  localStorage.setItem('token', null);
  window.location.replace('../Login/login.html');
}

function comparaDatas(dataInicio, dataFim, horaInicio, horaFim) {
  const agora = new Date();
  dataInicio.setHours(horaInicio.substring(0, 2));
  dataFim.setHours(horaFim.substring(0, 2));

  dataInicio.setDate(dataInicio.getDate() + 1);
  dataFim.setDate(dataFim.getDate() + 1);

  const hora = comparaHora(horaInicio, horaFim, agora);

  return dataInicio <= agora && dataFim >= agora && hora;
}

function comparaHora(horaInicio, horaFim, agora){
  const agoraStr = `${(agora.getHours()).toString().padStart(2, '0')}:${(agora.getMinutes()).toString().padStart(2, '0')}`;
  return horaInicio <= agoraStr && horaFim >= agoraStr;
}