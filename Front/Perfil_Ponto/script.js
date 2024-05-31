const nome_user = document.getElementById('nome-usuario');
const endereco = document.getElementById('endereco');
const nome = document.getElementById('nome');
const enderecoEstab = document.getElementById('enderecoText');
const descricao = document.getElementById('desc');
const titulo = document.getElementById('titulo-pagina');
const perfilFoto = document.getElementById('perfil-foto');
const planoFundo = document.getElementById('plano-fundo');
const iconeEditar = document.getElementsByClassName('icone-editar');
const foto = document.getElementById('foto-perfil');
const fotoUsuario = document.getElementById('perfil-usuario');
let idUsuario;

window.onload = async function () {

    const ID = await pegaID();
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
        if (response.data.data.address === null || response.data.data.address === ', , ') {
            endereco.innerHTML = `<img src="../Perfil_Usuario/imgs/pin.png" id="icon-endereco" class="icon">`;
        } else {
            endereco.innerHTML = `<img src="../Perfil_Usuario/imgs/pin.png" id="icon-endereco" class="icon"> <p id="end-texto">${response.data.data.address}<p/>`;
        }
        if (response.data.data.picture_url !== null || !response.data.data.picture_url === '') {
            foto.src = response.data.data.picture_url;
            fotoUsuario.src = response.data.data.picture_url;
        }

        if (response.data.data.email !== 'admin1@email.com' || response.data.data.email !== 'admin2@example.com' || response.data.data.email !== 'admin3@example.com') {
            const pontos = document.getElementById('pontos');
            const editar = document.getElementById('editar-est');
            pontos.style.display = 'none';
            editar.style.display = 'none';
        }

    } catch (error) {
        console.log(error);
    }

    const idEstab = localStorage.getItem("idAtracao");
    const LOCAL_API_URL = `http://localhost:3000/api/attractions/${idEstab}`;

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

        nome.innerHTML = response.data.data.name;
        enderecoEstab.innerHTML = `Endereço: ${response.data.data.address}. CEP: ${response.data.data.zip_code}`;
        descricao.innerHTML = response.data.data.description;
        titulo.innerHTML = response.data.data.name;
        perfilFoto.src = response.data.data.picture_url;
        planoFundo.src = response.data.data.background_picture_url;

        idUsuario = response.data.data.user_id;

    } catch (error) {
        console.log(error);
    }

    //Deve ficar por úlitmo
    if (ID !== idUsuario) {
        novaPost.style.display = 'none';
        editarEst.style.display = 'none';
        for (i = 0; i < iconeEditar.length; i++) {
            iconeEditar[i].style.display = 'none';
        }
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

function sair(){
    localStorage.setItem('token', null);
    window.location.replace('../Login/login.html');
}