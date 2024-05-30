const nome_user = document.getElementById('nome-usuario');
const endereco = document.getElementById('endereco');
const foto = document.getElementById('foto-perfil');
const fotoUsuario = document.getElementById('perfil-usuario');

window.onload = async function () {
  const ID = await pegaID();
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
    endereco.innerHTML = `<img src="../Perfil_Usuario/imgs/pin.png" id="icon-endereco" class="icon"> <p id="end-texto">${response.data.data.address}`;
    foto.src = response.data.data.picture_url;
    fotoUsuario.src = response.data.data.picture_url;

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

function sair(){
  localStorage.setItem('token', null);
  window.location.replace('../Login/login.html');
}