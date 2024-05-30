const nome_user = document.getElementById('nome-usuario');
const endereco = document.getElementById('endereco');
const nome = document.getElementById('nome');
const enderecoEstab = document.getElementById('enderecoText');
const descricao = document.getElementById('desc');
const horario = document.getElementById('horario');
const novaPost = document.getElementById('nova-postagem');
const titulo = document.getElementById('titulo-pagina');
const perfilFoto = document.getElementById('perfil-foto');
const planoFundo = document.getElementById('plano-fundo');
const editarEst = document.getElementById('editar-est');
const iconeEditar = document.getElementsByClassName('icone-editar');
const foto = document.getElementById('foto-perfil');
const fotoUsuario = document.getElementById('perfil-usuario');

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
        endereco.innerHTML = `<img src="../Perfil_Usuario/imgs/pin.png" id="icon-endereco" class="icon"> <p id="end-texto">${response.data.data.address}`;
        foto.src = response.data.data.picture_url;
        fotoUsuario.src = response.data.data.picture_url;

    } catch (error) {
        console.log(error);
    }

    const idEstab = localStorage.getItem("idAtracao");
    const LOCAL_API_URL = `http://localhost:3000/api/establishments/${idEstab}`;

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
        horario.innerHTML = `Das 12:00 às 18:00`; //TODO: Mockado
        titulo.innerHTML = response.data.data.name;
        perfilFoto.src = response.data.data.picture_url;
        planoFundo.src = response.data.data.background_picture_url;

        if(ID !== response.data.data.user_id){
            novaPost.style.display = 'none';
            editarEst.style.display = 'none';
            for(i=0; i<iconeEditar.length; i++){
                iconeEditar[i].style.display = 'none';
            }
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

function sair(){
    localStorage.setItem('token', null);
    window.location.replace('../Login/login.html');
}