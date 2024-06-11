const nome_user = document.getElementById('nome-usuario');
const endereco = document.getElementById('endereco');
const nome = document.getElementById('nome');
const enderecoEstab = document.getElementById('enderecoText');
const descricao = document.getElementById('desc');
const horario = document.getElementById('horario');
const titulo = document.getElementById('titulo-pagina');
const perfilFoto = document.getElementById('perfil-foto');
const planoFundo = document.getElementById('plano-fundo');
const editarEst = document.getElementById('editar-est');
const iconeEditar = document.getElementsByClassName('icone-editar');
const foto = document.getElementById('foto-perfil');
const fotoUsuario = document.getElementById('perfil-usuario');
const novoComentario = document.getElementById('novo-comentario');
const valorNotaTotal = document.getElementById('valor-nota-total');
const instagram = document.getElementById('instagram');
const facebook = document.getElementById('facebook');
const linkedin = document.getElementById('linkedin');
const website = document.getElementById('website');
const whatsapp = document.getElementById('whatsapp');
const divWhats = document.getElementById('div-whats');
const statusEstab = document.getElementById('status');
let controle = 0;
let idUsuario, somaNotas = 0, contComentarios = 0;
let usuarioLogado = null;

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

        usuarioLogado = response.data.data;

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

        const notaMediaEstabelecimento = await axios.get(`http://localhost:3000/api/comments/evaluation_note?establishment_id=${idEstab}`);

        if (notaMediaEstabelecimento.data.data._avg.evaluation_note) {
            valorNotaTotal.innerHTML = notaMediaEstabelecimento.data.data._avg.evaluation_note.toFixed(2);
        }

        nome.innerHTML = response.data.data.name;
        enderecoEstab.innerHTML = `Endereço: ${response.data.data.address}. CEP: ${response.data.data.zip_code}`;
        descricao.innerHTML = response.data.data.description;
        horario.innerHTML = `Das 12:00 às 18:00`; //TODO: Mockado
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
        if (response.data.data.instagram_url === 'https://nada.com') {
            instagram.style.display = 'none';
        } else {
            instagram.href = response.data.data.instagram_url;
        }
        if (response.data.data.facebook_url === 'https://nada.com') {
            facebook.style.display = 'none';
        } else {
            facebook.href = response.data.data.facebook_url;
        }
        if (response.data.data.linkedin_url === 'https://nada.com') {
            linkedin.style.display = 'none';
        } else {
            linkedin.href = response.data.data.linkedin_url;
        }
        if (response.data.data.website_url === 'https://nada.com') { 
            website.style.display = 'none';
        } else {
            website.href = response.data.data.website_url;
        }
        if(response.data.data.whatsapp === '0'){
            divWhats.style.display = 'none';
        }else{
            whatsapp.innerHTML = response.data.data.whatsapp;
        }

        const LOCAL_API_URL_WORKING = `http://localhost:3000/api/establishments/${idEstab}/workingtime`;

        const responseWork = await axios.get(
            LOCAL_API_URL_WORKING,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        const LOCAL_API_URL_DAY = 'http://localhost:3000/api/daysOfWeek';

        const responseDay = await axios.get(
            LOCAL_API_URL_DAY
        );

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

        const responseContacts = await axios.get(
            LOCAL_API_URL_CONTATOS,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        let controle = 0, strEmails = '', strTelefones = '';

        responseContacts.data.data.forEach(contact => {
            if (contact.email === 'sememail@email.com' || contact.phone_number === '0'){

            }else{
                if(controle === 0){
                    descricao.innerHTML += '<br> Contatos: <br>';
                    controle++;
                }
                if(contact.email){
                    strEmails += contact.email + '<br>';
                }else{
                    strTelefones += contact.phone_number + '<br>';
                }
            }
        });

        descricao.innerHTML += strTelefones + strEmails;

    } catch (error) {
        console.log(error);
    }

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

    const LOCAL_API_URL_POST = `http://localhost:3000/api/comments`;

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

        const comments = response.data.data;
        const promises = [];

        comments.forEach(comment => {
            if (comment.establishment_id == localStorage.getItem('idAtracao') || comment.event_id == localStorage.getItem('idAtracao') || comment.attraction_id == localStorage.getItem('idAtracao')) {
                const LOCAL_API_URL_USER_COM = `http://localhost:3000/api/users/${comment.user_id}`;
                contComentarios++;
                somaNotas += parseInt(comment.evaluation_note, 10);

                const promise = axios.get(LOCAL_API_URL_USER_COM, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }).then(response => {
                    const comentario = document.createElement('div');
                    comentario.classList.add('comentario');
                    const fotoUsuarioPerfil = document.createElement('img');
                    fotoUsuarioPerfil.classList.add('foto-perfil-usuario');
                    if (response.data.data.picture_url) {
                        fotoUsuarioPerfil.src = response.data.data.picture_url;
                    } else {
                        fotoUsuarioPerfil.src = '../images/foto_padrao.png';
                    }
                    comentario.appendChild(fotoUsuarioPerfil);
                    const nomeUsuario = document.createElement('h3');
                    nomeUsuario.classList.add('nome-usuario');
                    nomeUsuario.innerHTML = response.data.data.name;
                    comentario.appendChild(nomeUsuario);
                    const a = document.createElement('a');
                    const img = document.createElement('img');
                    img.src = "../images/editar.png";
                    img.classList.add("icone-editar");
                    a.appendChild(img);
                    a.onclick = function () {
                        localStorage.setItem('idComment', comment.id);
                        window.location.replace('../Editar_Comentario/editar_comentario.html');
                    }
                    console.log(response.data.data.email)
                    if (ID !== comment.user_id && (usuarioLogado.email !== 'admin1@email.com' && usuarioLogado.email !== 'admin2@example.com' && usuarioLogado.email !== 'admin3@example.com')) {
                        a.style.display = 'none';
                    } else {
                        controle++;
                    }
                    comentario.appendChild(a);
                    const boxNota = document.createElement('div');
                    boxNota.classList.add('box-nota');
                    boxNota.id = 'nota-comentario';
                    const iconeOnibus = document.createElement('img');
                    iconeOnibus.id = 'onibus-icon';
                    iconeOnibus.src = '../images/onibus.png';
                    boxNota.appendChild(iconeOnibus);
                    const valorNota = document.createElement('h3');
                    valorNota.id = 'valor-nota';
                    valorNota.innerHTML = comment.evaluation_note;
                    boxNota.appendChild(valorNota);
                    comentario.appendChild(boxNota);
                    const descr = document.createElement('p');
                    descr.id = 'texto-comentario';
                    descr.innerHTML = comment.description;
                    comentario.appendChild(descr);
                    fundo.appendChild(comentario);
                }).catch(error => {
                    console.log(error);
                });

                promises.push(promise);
            }
        });

        await Promise.all(promises);
        await imprimeMensagem();

    } catch (error) {
        console.log(error);
    }

    //Deve ficar por úlitmo
    if (controle > 0) {
        novoComentario.style.display = 'none';
    }
}

async function imprimeMensagem() {
    const fundo = document.getElementById('fundo-perfil-est');
    const mensagem = document.createElement('div');
    mensagem.innerHTML = '<p>Não há mais comentários!</p><br><br><br>';
    fundo.appendChild(mensagem);
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

function stringToTime(date, timeString) {
    let dateAux = date;
    let [hours, minutes] = timeString.split(':').map(Number);
    dateAux.setHours(hours, minutes, 0, 0);
    return dateAux;
}