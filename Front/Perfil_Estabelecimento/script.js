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
        endereco.innerHTML = `<img src="../Perfil_Usuario/imgs/pin.png" id="icon-endereco" class="icon"> <p id="end-texto">${response.data.data.address}`;

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

        idUsuario = response.data.data.user_id;

    } catch (error) {
        console.log(error);
    }

    const LOCAL_API_URL_POST = `http://localhost:3000/api/posts`;

    try {
        const response = await axios.get(
            LOCAL_API_URL_POST,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        const fundo = document.getElementById('fundo-perfil-est');

        response.data.data.forEach(post => {
            if (post.establishment_id == localStorage.getItem('idAtracao')) {
                const postagem = document.createElement('div');
                postagem.classList.add('postagem');
                postagem.innerHTML = `<h2 id="titulo-postagem">${post.name}</h2>
            <a href="../Editar_Postagem/editar_postagem.html"><img src="../images/editar.png" class="icone-editar"></a>
            <p id="texto-postagem">${post.description}</p>
            <div id="box-img-post">
                <img src="../images/baffs.png" class="img-postagem">
            </div>`;
                fundo.appendChild(postagem);
            }
        });

        const mensagem = document.createElement('div');
        mensagem.innerHTML = '<p>Não há mais postagens!</p><br><br><br>';
        fundo.appendChild(mensagem);
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