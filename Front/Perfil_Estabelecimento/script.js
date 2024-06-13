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
const criarEvento = document.getElementById('criar-evento');
const iconeEditar = document.getElementsByClassName('icone-editar');
const foto = document.getElementById('foto-perfil');
const fotoUsuario = document.getElementById('perfil-usuario');
const valorNotaTotal = document.getElementById('valor-nota-total');
const instagram = document.getElementById('instagram');
const facebook = document.getElementById('facebook');
const linkedin = document.getElementById('linkedin');
const website = document.getElementById('website');
const whatsapp = document.getElementById('whatsapp');
const divWhats = document.getElementById('div-whats');
const statusEstab = document.getElementById('status');
let idUsuario;
let ID = null;
let idFav = null;

window.onload = async function () {
    const token = localStorage.getItem("token");
    if (token === 'null') {
        const nav = document.getElementById("nav");
        const linkPerfil = document.getElementById("link-perfil");

        linkPerfil.style.display = 'none';

        nav.innerHTML =
            '<h3 id="texto-logar">Faça login para ter acesso a mais funções!</h3><a href="../Login/login.html" class="botao" id="logar"><p id="texto-evento">Logar</p></a>';
    } else {
        ID = await pegaID();
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
    }

    const idEstab = localStorage.getItem("idAtracao");
    const LOCAL_API_URL = `http://localhost:3000/api/establishments/${idEstab}`;

    try {
        const response = await axios.get(LOCAL_API_URL);

        console.log(response);

        const notaMediaEstabelecimento = await axios.get(`http://localhost:3000/api/comments/evaluation_note?establishment_id=${idEstab}`);

        if (notaMediaEstabelecimento.data.data._avg.evaluation_note) {
            valorNotaTotal.innerHTML = notaMediaEstabelecimento.data.data._avg.evaluation_note.toFixed(2);
        }

        let strContatos = '';

        nome.innerHTML = response.data.data.name;
        enderecoEstab.innerHTML = `Endereço: ${response.data.data.address}. CEP: ${response.data.data.zip_code}`;
        descricao.innerHTML = `${response.data.data.description}`;
        titulo.innerHTML = response.data.data.name;
        if (response.data.data.picture_url) {
            perfilFoto.src = response.data.data.picture_url;
        } else {
            perfilFoto.src = '../images/cinza.png';
        }
        if (response.data.data.background_picture_url) {
            planoFundo.src = response.data.data.background_picture_url;
        } else {
            planoFundo.src = '../images/cinza.png';
        }
        if (response.data.data.instagram_url === 'https://nada.com' || !response.data.data.instagram_url) {
            instagram.style.display = 'none';
        } else {
            instagram.href = response.data.data.instagram_url;
        }
        if (response.data.data.facebook_url === 'https://nada.com' || !response.data.data.facebook_url) {
            facebook.style.display = 'none';
        } else {
            facebook.href = response.data.data.facebook_url;
        }
        if (response.data.data.linkedin_url === 'https://nada.com' || !response.data.data.linkedin_url) {
            linkedin.style.display = 'none';
        } else {
            linkedin.href = response.data.data.linkedin_url;
        }
        if (response.data.data.website_url === 'https://nada.com' || !response.data.data.website_url) {
            website.style.display = 'none';
        } else {
            website.href = response.data.data.website_url;
        }
        if (response.data.data.whatsapp === '0' || !response.data.data.whatsapp) {
            divWhats.style.display = 'none';
        } else {
            whatsapp.innerHTML = response.data.data.whatsapp;
        }

        const LOCAL_API_URL_WORKING = `http://localhost:3000/api/establishments/${idEstab}/workingtime`;

        const responseWork = await axios.get(LOCAL_API_URL_WORKING);

        const LOCAL_API_URL_DAY = 'http://localhost:3000/api/daysOfWeek';

        const responseDay = await axios.get(LOCAL_API_URL_DAY);

        responseDay.data.data.forEach(day => {

            switch (day.day_of_week) {
                case "Domingo":
                    domId = day.id;
                    break;
                case "Segunda-feira":
                    segId = day.id;
                    break;
                case "Terça-feira":
                    terId = day.id;
                    break;
                case "Quarta-feira":
                    quaId = day.id;
                    break;
                case "Quinta-feira":
                    quiId = day.id;
                    break;
                case "Sexta-feira":
                    sexId = day.id;
                    break;
                case "Sábado":
                    sabId = day.id;
                    break;
            }
        });

        let segunda, terca, quarta, quinta, sexta, sabado, domingo;

        responseWork.data.data.forEach(day => {
            switch (day.day_of_week_id) {
                case domId:
                    domingo = day;
                    break;
                case segId:
                    segunda = day;
                    break;
                case terId:
                    terca = day;
                    break;
                case quaId:
                    quarta = day;
                    break;
                case quiId:
                    quinta = day;
                    break;
                case sexId:
                    sexta = day;
                    break;
                case sabId:
                    sabado = day;
                    break;
            }
        });

        let horarioAux1, horarioAux2;
        const agora = new Date();

        switch (agora.getDay()) {
            case 0:
                horario.innerHTML = `Das ${domingo.opening_time} às ${domingo.closing_time}`;
                horarioAux1 = stringToTime(new Date(), domingo.opening_time);
                horarioAux2 = stringToTime(new Date(), domingo.closing_time);
                if (domingo.opening_time === '00:00' && domingo.closing_time === '00:00') {
                    statusEstab.innerHTML = 'Fechado';
                    statusEstab.style.color = 'red';
                } else if (agora < horarioAux1 || agora >= horarioAux2) {
                    statusEstab.innerHTML = 'Fechado';
                    statusEstab.style.color = 'red';
                }
                break;
            case 1:
                horario.innerHTML = `Das ${segunda.opening_time} às ${segunda.closing_time}`;
                horarioAux1 = stringToTime(new Date(), segunda.opening_time);
                horarioAux2 = stringToTime(new Date(), segunda.closing_time);
                if (segunda.opening_time === '00:00' && segunda.closing_time === '00:00') {
                    statusEstab.innerHTML = 'Fechado';
                    statusEstab.style.color = 'red';
                } else if (agora < horarioAux1 || agora >= horarioAux2) {
                    statusEstab.innerHTML = 'Fechado';
                    statusEstab.style.color = 'red';
                }
                break;
            case 2:
                horario.innerHTML = `Das ${terca.opening_time} às ${terca.closing_time}`;
                horarioAux1 = stringToTime(new Date(), terca.opening_time);
                horarioAux2 = stringToTime(new Date(), terca.closing_time);
                if (terca.opening_time === '00:00' && terca.closing_time === '00:00') {
                    statusEstab.innerHTML = 'Fechado';
                    statusEstab.style.color = 'red';
                } else if (agora < horarioAux1 || agora >= horarioAux2) {
                    statusEstab.innerHTML = 'Fechado';
                    statusEstab.style.color = 'red';
                }
                break;
            case 3:
                horario.innerHTML = `Das ${quarta.opening_time} às ${quarta.closing_time}`;
                horarioAux1 = stringToTime(new Date(), quarta.opening_time);
                horarioAux2 = stringToTime(new Date(), quarta.closing_time);
                if (quarta.opening_time === '00:00' && quarta.closing_time === '00:00') {
                    statusEstab.innerHTML = 'Fechado';
                    statusEstab.style.color = 'red';
                } else if (agora < horarioAux1 || agora >= horarioAux2) {
                    statusEstab.innerHTML = 'Fechado';
                    statusEstab.style.color = 'red';
                }
                break;
            case 4:
                horario.innerHTML = `Das ${quinta.opening_time} às ${quinta.closing_time}`;
                horarioAux1 = stringToTime(new Date(), quinta.opening_time);
                horarioAux2 = stringToTime(new Date(), quinta.closing_time);
                if (quinta.opening_time === '00:00' && quinta.closing_time === '00:00') {
                    statusEstab.innerHTML = 'Fechado';
                    statusEstab.style.color = 'red';
                } else if (agora < horarioAux1 || agora >= horarioAux2) {
                    statusEstab.innerHTML = 'Fechado';
                    statusEstab.style.color = 'red';
                }
                break;
            case 5:
                horario.innerHTML = `Das ${sexta.opening_time} às ${sexta.closing_time}`;
                horarioAux1 = stringToTime(new Date(), sexta.opening_time);
                horarioAux2 = stringToTime(new Date(), sexta.closing_time);
                if (sexta.opening_time === '00:00' && sexta.closing_time === '00:00') {
                    statusEstab.innerHTML = 'Fechado';
                    statusEstab.style.color = 'red';
                } else if (agora < horarioAux1 || agora >= horarioAux2) {
                    statusEstab.innerHTML = 'Fechado';
                    statusEstab.style.color = 'red';
                }
                break;
            case 6:
                horario.innerHTML = `Das ${sabado.opening_time} às ${sabado.closing_time}`;
                horarioAux1 = stringToTime(new Date(), sabado.opening_time);
                horarioAux2 = stringToTime(new Date(), sabado.closing_time);
                if (sabado.opening_time === '00:00' && sabado.closing_time === '00:00') {
                    statusEstab.innerHTML = 'Fechado';
                    statusEstab.style.color = 'red';
                } else if (agora < horarioAux1 || agora >= horarioAux2) {
                    statusEstab.innerHTML = 'Fechado';
                    statusEstab.style.color = 'red';
                }
                break;
        }

        idUsuario = response.data.data.user_id;

        const LOCAL_API_URL_CONTATOS = `http://localhost:3000/api/establishmentContacts/establishments/${idEstab}`;

        const responseContacts = await axios.get(LOCAL_API_URL_CONTATOS);
        let controle = 0, strEmails = '', strTelefones = '';

        responseContacts.data.data.forEach(contact => {
            if (contact.email === 'sememail@email.com' || contact.phone_number === '0') {

            } else {
                if (controle === 0) {
                    descricao.innerHTML += '<br> Contatos: <br>';
                    controle++;
                }
                if (contact.email) {
                    strEmails += contact.email + '<br>';
                } else {
                    strTelefones += contact.phone_number + '<br>';
                }
            }
        });

        descricao.innerHTML += strTelefones + strEmails;


    } catch (error) {
        console.log(error);
    }

    if (token !== 'null') {

        try {
            const LOCAL_API_URL_FAV = `http://localhost:3000/api/favoriteEstablishments/users/${ID}`;
            const response = await axios.get(LOCAL_API_URL_FAV,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

            response.data.data.forEach(fav => {
                if (fav.establishment_id === localStorage.getItem('idAtracao')) {
                    const coracao = document.getElementById('coracao');
                    coracao.src = '../images/coracaoClick.png';
                    idFav = fav.id;
                    console.log(idFav)
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const LOCAL_API_URL_POST = `http://localhost:3000/api/posts`;

    try {
        const response = await axios.get(LOCAL_API_URL_POST);

        const fundo = document.getElementById('fundo-perfil-est');

        response.data.data.forEach(post => {
            if (post.establishment_id == localStorage.getItem('idAtracao') || post.event_id == localStorage.getItem('idAtracao')) {
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
                if (post.picture_url) {
                    const divImg = document.createElement('div');
                    divImg.id = "box-img-post";
                    const imgPost = document.createElement('img');
                    imgPost.src = post.picture_url;
                    imgPost.classList.add("img-postagem");
                    divImg.appendChild(imgPost);
                    postagem.appendChild(divImg);
                }
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
    if (token !== 'null') {
        try {
            const LOCAL_API_URL_USER = `http://localhost:3000/api/users/${ID}`;
            const response = await axios.get(LOCAL_API_URL_USER,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

            if (ID !== idUsuario && response.data.data.email !== 'admin1@email.com' && response.data.data.email !== 'admin2@example.com' && response.data.data.email !== 'admin3@example.com') {
                novaPost.style.display = 'none';
                editarEst.style.display = 'none';
                criarEvento.style.display = 'none';
                for (i = 0; i < iconeEditar.length; i++) {
                    iconeEditar[i].style.display = 'none';
                }
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        novaPost.style.display = 'none';
        editarEst.style.display = 'none';
        criarEvento.style.display = 'none';
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

async function favoritar() {
    if (localStorage.getItem('token') === 'null') {
        window.location.replace('../Login/login.html');
        return;
    }
    const coracao = document.getElementById('coracao');

    const src = coracao.src;
    const relativePath = src.substring(src.indexOf('images'));

    if (relativePath === 'images/coracao.png') {
        coracao.src = '../images/coracaoClick.png';
        try {
            const LOCAL_API_URL_FAV = `http://localhost:3000/api/favoriteEstablishments`;
            const response = await axios.post(LOCAL_API_URL_FAV,
                {
                    establishment_id: localStorage.getItem('idAtracao'),
                    attraction_id: null,
                    event_id: null,
                },
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
        } catch (error) {
            console.log(error);
        }

    } else {
        coracao.src = '../images/coracao.png';
        try {
            const LOCAL_API_URL_FAV = `http://localhost:3000/api/favoriteEstablishments/${idFav}`;
            const response = await axios.delete(LOCAL_API_URL_FAV,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
        } catch (error) {
            console.log(error);
        }
    }
}

function cadEvento() {
    localStorage.setItem("idEstab", localStorage.getItem('idAtracao'));
    window.location.replace('../Cadastro_Evento/cadastro_evento.html');
}

function stringToTime(date, timeString) {
    let dateAux = date;
    let [hours, minutes] = timeString.split(':').map(Number);
    dateAux.setHours(hours, minutes, 0, 0);
    return dateAux;
}