const nome_user = document.getElementById("nome-usuario");
const endereco = document.getElementById("endereco");
const filtro = document.getElementById("filtro");
const foto = document.getElementById('foto-perfil');
const perfil = document.getElementById('perfil-usuario');
const cidade = document.getElementById('cidade');
let usuarioObj = {
  city: ''
};
let array = [];

window.onload = async function () {
  const token = localStorage.getItem("token");
  if (token === 'null') {
    const nav = document.getElementById("nav");
    const linkPerfil = document.getElementById("link-perfil");

    linkPerfil.style.display = 'none';

    nav.innerHTML =
      '<h3 id="texto-logar">Faça login para ter acesso a mais funções!</h3><a href="../Login/login.html" class="botao" id="logar"><p id="texto-evento">Logar</p></a>';
  } else {
    try {
      const ID = await pegaID();
      const LOCAL_API_URL_USER = `http://localhost:3000/api/users/${ID}`;
      const response = await axios.get(LOCAL_API_URL_USER,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

      usuarioObj = response.data.data;

      nome_user.innerHTML = response.data.data.name;

      cidade.innerHTML = response.data.data.city;
      cidade.href = '../Editar_Usuario/editar_usuario.html';

      if (response.data.data.address === ', , ' || response.data.data.address == null) {
        endereco.innerHTML = `<img src="../Perfil_Usuario/imgs/pin.png" id="icon-endereco" class="icon">`;
      } else {
        endereco.innerHTML = `<img src="../Perfil_Usuario/imgs/pin.png" id="icon-endereco" class="icon"> <p id="end-texto">${response.data.data.address}`;
      }

      if (response.data.data.picture_url !== null || !response.data.data.picture_url === '') {
        foto.src = response.data.data.picture_url;
        perfil.src = response.data.data.picture_url;
      }

      if (response.data.data.email !== 'admin1@email.com' && response.data.data.email !== 'admin2@example.com' && response.data.data.email !== 'admin3@example.com') {
        const pontos = document.getElementById('pontos');
        pontos.style.display = 'none';
      }

    } catch (error) {
      console.log(error);
    }
  }

  const LOCAL_API_URL = `http://localhost:3000/api/establishments`;

  try {
    const response = await axios.get(LOCAL_API_URL);
    console.log(response);
    response.data.data.forEach(async (estab) => {
      if (estab.city === usuarioObj.city) {
        array.push(estab);
        const bloco = document.createElement("div");
        bloco.onclick;
        bloco.classList.add("bloco");
        const img = document.createElement("img");
        bloco.appendChild(img);
        img.classList.add("imagem");
        if (estab.picture_url) {
          img.src = estab.picture_url;
        } else {
          img.src = '../images/cinza.png';
        }
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
        const notaMediaEstabelecimento = await axios.get(`http://localhost:3000/api/comments/evaluation_note?establishment_id=${estab.id}`);
        let valorNotaTotal = '0.0';
        if (notaMediaEstabelecimento.data.data._avg.evaluation_note) {
          valorNotaTotal = notaMediaEstabelecimento.data.data._avg.evaluation_note.toFixed(1);
        }
        nota.innerHTML = valorNotaTotal;
        const status = document.createElement("h3");
        inferior.appendChild(status);
        status.innerHTML = "Aberto"; // TODO: Mockado
        status.id = "status";
        const grade = document.getElementById("grade");

        bloco.onclick = function () {
          localStorage.setItem("idAtracao", estab.id);
          localStorage.setItem("tipoAtracao", "estabelecimento");
          window.location.replace(
            "../Perfil_Estabelecimento/perfil_estab_postagens.html"
          );
        };

        grade.appendChild(bloco);
      } else if (usuarioObj.city === '' || usuarioObj.city === null) {
        array.push(estab);
        const bloco = document.createElement("div");
        bloco.onclick;
        bloco.classList.add("bloco");
        const img = document.createElement("img");
        bloco.appendChild(img);
        img.classList.add("imagem");
        if (estab.picture_url) {
          img.src = estab.picture_url;
        } else {
          img.src = '../images/cinza.png';
        }
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
        const notaMediaEstabelecimento = await axios.get(`http://localhost:3000/api/comments/evaluation_note?establishment_id=${estab.id}`);
        let valorNotaTotal = '0.0';
        if (notaMediaEstabelecimento.data.data._avg.evaluation_note) {
          valorNotaTotal = notaMediaEstabelecimento.data.data._avg.evaluation_note.toFixed(1);
        }
        nota.innerHTML = valorNotaTotal;
        const status = document.createElement("h3");
        inferior.appendChild(status);
        status.innerHTML = "Aberto"; // TODO: Mockado
        status.id = "status";
        const grade = document.getElementById("grade");

        bloco.onclick = function () {
          localStorage.setItem("idAtracao", estab.id);
          localStorage.setItem("tipoAtracao", "estabelecimento");
          window.location.replace(
            "../Perfil_Estabelecimento/perfil_estab_postagens.html"
          );
        };

        grade.appendChild(bloco);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

async function pegaID() {
  const LOCAL_API_URL_ID = "http://localhost:3000/api/users/loggedUser";
  try {
    const response = await axios.get(LOCAL_API_URL_ID, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

async function mudou() {
  const grade = document.getElementById("grade");

  while (grade.firstChild) {
    grade.removeChild(grade.firstChild);
  }

  if (filtro.value === "estabelecimento") {
    const LOCAL_API_URL = `http://localhost:3000/api/establishments`;'    '
    array = [];
    try {
      const response = await axios.get(LOCAL_API_URL);

      response.data.data.forEach(async (estab) => {
        if (estab.city === usuarioObj.city) {
          array.push(estab);
          const bloco = document.createElement("div");
          bloco.onclick;
          bloco.classList.add("bloco");
          const img = document.createElement("img");
          bloco.appendChild(img);
          img.classList.add("imagem");
          if (estab.picture_url) {
            img.src = estab.picture_url;
          } else {
            img.src = '../images/cinza.png';
          }
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
          const notaMediaEstabelecimento = await axios.get(`http://localhost:3000/api/comments/evaluation_note?establishment_id=${estab.id}`);
          let valorNotaTotal = '0.0';
          if (notaMediaEstabelecimento.data.data._avg.evaluation_note) {
            valorNotaTotal = notaMediaEstabelecimento.data.data._avg.evaluation_note.toFixed(1);
          }
          nota.innerHTML = valorNotaTotal;
          const status = document.createElement("h3");
          inferior.appendChild(status);
          status.innerHTML = "Aberto"; // TODO: Mockado
          status.id = "status";
          const grade = document.getElementById("grade");

          bloco.onclick = function () {
            localStorage.setItem("idAtracao", estab.id);
            localStorage.setItem("tipoAtracao", "estabelecimento");
            window.location.replace(
              "../Perfil_Estabelecimento/perfil_estab_postagens.html"
            );
          };

          grade.appendChild(bloco);
        } else if (usuarioObj.city === '' || usuarioObj.city === null) {
          array.push(estab);
          const bloco = document.createElement("div");
          bloco.onclick;
          bloco.classList.add("bloco");
          const img = document.createElement("img");
          bloco.appendChild(img);
          img.classList.add("imagem");
          if (estab.picture_url) {
            img.src = estab.picture_url;
          } else {
            img.src = '../images/cinza.png';
          }
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
          const notaMediaEstabelecimento = await axios.get(`http://localhost:3000/api/comments/evaluation_note?establishment_id=${estab.id}`);
          let valorNotaTotal = '0.0';
          if (notaMediaEstabelecimento.data.data._avg.evaluation_note) {
            valorNotaTotal = notaMediaEstabelecimento.data.data._avg.evaluation_note.toFixed(1);
          }
          nota.innerHTML = valorNotaTotal;
          const status = document.createElement("h3");
          inferior.appendChild(status);
          status.innerHTML = "Aberto"; // TODO: Mockado
          status.id = "status";
          const grade = document.getElementById("grade");

          bloco.onclick = function () {
            localStorage.setItem("idAtracao", estab.id);
            localStorage.setItem("tipoAtracao", "estabelecimento");
            window.location.replace(
              "../Perfil_Estabelecimento/perfil_estab_postagens.html"
            );
          };

          grade.appendChild(bloco);
        }
      });
    } catch (error) {
      console.log(error);
    }
  } else if (filtro.value == "evento") {
    const LOCAL_API_URL = `http://localhost:3000/api/events`;

    array = [];

    try {
      const response = await axios.get(LOCAL_API_URL);

      response.data.data.forEach(async (estab) => {
        let statusValor = 'Fechado';
        const dataInicio = new Date(estab.start_date);
        const dataFim = new Date(estab.end_date);

        if (comparaFinal(dataFim, estab.end_time)) {
          array.push(estab);
          const bloco = document.createElement("div");
          bloco.onclick;
          bloco.classList.add("bloco");
          const img = document.createElement("img");
          bloco.appendChild(img);
          img.classList.add("imagem");
          if (estab.picture_url) {
            img.src = estab.picture_url;
          } else {
            img.src = '../images/cinza.png';
          }
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
          const notaMediaEstabelecimento = await axios.get(`http://localhost:3000/api/comments/evaluation_note?event_id=${estab.id}`);
          let valorNotaTotal = '0.0';
          if (notaMediaEstabelecimento.data.data._avg.evaluation_note) {
            valorNotaTotal = notaMediaEstabelecimento.data.data._avg.evaluation_note.toFixed(1);
          }
          nota.innerHTML = valorNotaTotal;
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
        }
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    const LOCAL_API_URL = `http://localhost:3000/api/attractions`;
    array = [];

    try {
      const response = await axios.get(LOCAL_API_URL);

      response.data.data.forEach(async (estab) => {
        array.push(estab);
        const bloco = document.createElement("div");
        bloco.onclick;
        bloco.classList.add("bloco");
        const img = document.createElement("img");
        bloco.appendChild(img);
        img.classList.add("imagem");
        if (estab.picture_url) {
          img.src = estab.picture_url;
        } else {
          img.src = '../images/cinza.png';
        }
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
        const notaMediaEstabelecimento = await axios.get(`http://localhost:3000/api/comments/evaluation_note?attraction_id=${estab.id}`);
        let valorNotaTotal = '0.0';
        if (notaMediaEstabelecimento.data.data._avg.evaluation_note) {
          valorNotaTotal = notaMediaEstabelecimento.data.data._avg.evaluation_note.toFixed(1);
        }
        nota.innerHTML = valorNotaTotal;
        const status = document.createElement("h3");
        inferior.appendChild(status);
        status.innerHTML = "Aberto"; // TODO: Mockado
        status.id = "status";
        const grade = document.getElementById("grade");

        bloco.onclick = function () {
          localStorage.setItem("idAtracao", estab.id);
          localStorage.setItem("tipoAtracao", "ponto");
          window.location.replace("../Perfil_Ponto/perfil_ponto.html");
        };

        grade.appendChild(bloco);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

function sair() {
  localStorage.setItem("token", null);
  window.location.replace("../Login/login.html");
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

function comparaHora(horaInicio, horaFim, agora) {
  const agoraStr = `${(agora.getHours()).toString().padStart(2, '0')}:${(agora.getMinutes()).toString().padStart(2, '0')}`;
  return horaInicio <= agoraStr && horaFim >= agoraStr;
}

function comparaFinal(dataFim, horaFim) {
  const agora = new Date();
  dataFim.setHours(horaFim.substring(0, 2));
  dataFim.setDate(dataFim.getDate() + 1);

  return dataFim >= agora;
}

function pesquisar() {
  let arrayFiltrado = [];
  const barraPesquisa = document.getElementById('barra-pesquisa');
  const barraAux = barraPesquisa.value.toLowerCase();
  arrayFiltrado = array.filter(estab => estab.name.toLowerCase().includes(barraAux));

  const grade = document.getElementById("grade");

  while (grade.firstChild) {
    grade.removeChild(grade.firstChild);
  }

  arrayFiltrado.forEach(async (estab) => {
    const filtro = document.getElementById('filtro').value;
    let bloco = document.createElement("div");
    bloco.classList.add("bloco");

    const img = document.createElement("img");
    bloco.appendChild(img);
    img.classList.add("imagem");
    img.src = estab.picture_url ? estab.picture_url : '../images/cinza.png';
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

    const status = document.createElement("h3");
    inferior.appendChild(status);
    status.id = "status";

    let notaMediaEstabelecimento;
    let valorNotaTotal = '0.0';

    if (filtro === "estabelecimento") {
      notaMediaEstabelecimento = await axios.get(`http://localhost:3000/api/comments/evaluation_note?establishment_id=${estab.id}`);
      bloco.onclick = function () {
        localStorage.setItem("idAtracao", estab.id);
        localStorage.setItem("tipoAtracao", "estabelecimento");
        window.location.replace("../Perfil_Estabelecimento/perfil_estab_postagens.html");
      };
      status.innerHTML = "Aberto"; // TODO: Mockado
    } else if (filtro === "evento") {
      notaMediaEstabelecimento = await axios.get(`http://localhost:3000/api/comments/evaluation_note?event_id=${estab.id}`);
      let statusValor = 'Fechado';
      const dataInicio = new Date(estab.start_date);
      const dataFim = new Date(estab.end_date);

      if (comparaFinal(dataFim, estab.end_time)) {
        bloco.onclick = function () {
          localStorage.setItem("idAtracao", estab.id);
          localStorage.setItem("tipoAtracao", "evento");
          window.location.replace("../Perfil_Evento/perfil_evento_postagens.html");
        };
        if (comparaDatas(dataInicio, dataFim, estab.start_time, estab.end_time)) {
          statusValor = 'Aberto';
        } else {
          status.style.color = 'red';
        }
        status.innerHTML = statusValor;
      } else {
        return;
      }
    } else {
      notaMediaEstabelecimento = await axios.get(`http://localhost:3000/api/comments/evaluation_note?attraction_id=${estab.id}`);
      bloco.onclick = function () {
        localStorage.setItem("idAtracao", estab.id);
        localStorage.setItem("tipoAtracao", "ponto");
        window.location.replace("../Perfil_Ponto/perfil_ponto.html");
      };
      status.innerHTML = "Aberto"; // TODO: Mockado
    }

    if (notaMediaEstabelecimento.data.data._avg.evaluation_note) {
      valorNotaTotal = notaMediaEstabelecimento.data.data._avg.evaluation_note.toFixed(1);
    }
    nota.innerHTML = valorNotaTotal;

    grade.appendChild(bloco);
  });
}

