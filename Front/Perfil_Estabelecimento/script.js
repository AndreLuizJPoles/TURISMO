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
let idUsuario;

window.onload = async function () {
    const token = localStorage.getItem("token");
    if (token === 'null') {
        const nav = document.getElementById("nav");
        const linkPerfil = document.getElementById("link-perfil");

        linkPerfil.style.display = 'none';

        nav.innerHTML =
            '<h3 id="texto-logar">Faça login para ter acesso a mais funções!</h3><a href="../Login/login.html" class="botao" id="logar"><p id="texto-evento">Logar</p></a>';
    } else {

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
                const titulo = document.createElement('h2');
                titulo.id = 'titulo-postagem'
                titulo.innerHTML = post.name;
                postagem.appendChild(titulo);
                const a = document.createElement('a');
                const img = document.createElement('img');
                img.src = "../images/editar.png";
                img.classList.add("icone-editar");
                a.appendChild(img);
                a.onclick = function () {
                    localStorage.setItem('idPost', post.id);
                    window.location.replace('../Editar_Postagem/editar_postagem.html');
                }
                postagem.appendChild(a);
                const texto = document.createElement('p');
                texto.id = 'texto-postagem';
                texto.innerHTML = post.description;
                postagem.appendChild(texto);
                const divImg = document.createElement('div');
                divImg.id = "box-img-post";
                const imgPost = document.createElement('img');
                imgPost.src = "../images/baffs.png"; //TODO: Mockado
                imgPost.classList.add("img-postagem");
                divImg.appendChild(imgPost);
                postagem.appendChild(divImg);
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

function sair() {
    localStorage.setItem('token', null);
    window.location.replace('../Login/login.html');
}