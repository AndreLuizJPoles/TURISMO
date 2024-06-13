const nome_user = document.getElementById('nome-usuario');
const endereco = document.getElementById('endereco');
const foto = document.getElementById('foto-perfil');
const fotoUsuario = document.getElementById('perfil-usuario');

window.onload = async function () {
  const ID = await pegaID();
  const LOCAL_API_URL = `http://localhost:3000/api/establishments`;

  const LOCAL_API_URL_USER = `http://localhost:3000/api/users/${ID}`;

  try {

    console.log(LOCAL_API_URL_USER);

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
    if (response.data.data.picture_url !== null || !response.data.data.picture_url === '') {
      foto.src = response.data.data.picture_url;
      fotoUsuario.src = response.data.data.picture_url;
    }

    if (response.data.data.email !== 'admin1@email.com' && response.data.data.email !== 'admin2@example.com' && response.data.data.email !== 'admin3@example.com') {
      const pontos = document.getElementById('pontos');
      pontos.style.display = 'none';
    }

  } catch (error) {
    console.log(error);
  }

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

    response.data.data.forEach(async estab => {
      if (estab.user_id === ID) {
        const bloco = document.createElement('div');
        bloco.onclick
        bloco.classList.add('bloco');
        const img = document.createElement('img');
        bloco.appendChild(img);
        img.classList.add('imagem');
        if (estab.picture_url) {
          img.src = estab.picture_url;
        } else{
          img.src = '../images/cinza.png';
        }
        img.id = 'foto';
        const inferior = document.createElement('div');
        bloco.appendChild(inferior);
        inferior.classList.add('inferior');
        const h2 = document.createElement('h2');
        inferior.appendChild(h2);
        h2.id = 'nome';
        h2.innerHTML = estab.name;
        const conjNota = document.createElement('div');
        inferior.appendChild(conjNota);
        conjNota.id = 'conjunto-nota';
        const icone = document.createElement('img');
        conjNota.appendChild(icone);
        icone.classList.add('icone');
        icone.src = '../images/onibus.png';
        const nota = document.createElement('h3');
        conjNota.appendChild(nota);
        nota.id = 'nota';
        const notaMediaEstabelecimento = await axios.get(`http://localhost:3000/api/comments/evaluation_note?establishment_id=${estab.id}`);
        let valorNotaTotal = '0.0';
        if (notaMediaEstabelecimento.data.data._avg.evaluation_note) {
          valorNotaTotal = notaMediaEstabelecimento.data.data._avg.evaluation_note.toFixed(1);
        }
        nota.innerHTML = valorNotaTotal;
        const status = document.createElement('h3');
        inferior.appendChild(status);
        status.innerHTML = 'Aberto';// TODO: Mockado
        status.id = 'status';
        const grade = document.getElementById('grade');

        bloco.onclick = function () {
          localStorage.setItem('idAtracao', estab.id);
          localStorage.setItem("tipoAtracao", "estabelecimento");
          window.location.replace('../Perfil_Estabelecimento/perfil_estab_postagens.html');
        }

        grade.appendChild(bloco);
      }
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