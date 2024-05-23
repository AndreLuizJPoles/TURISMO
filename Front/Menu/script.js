const nome_user = document.getElementById('nome-usuario');
const endereco = document.getElementById('endereco');

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

    } catch (error) {
        console.log(error);
    }

    const LOCAL_API_URL = `http://localhost:3000/api/establishments`;

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

        response.data.data.forEach(estab => {
            const bloco = document.createElement('div');
            bloco.onclick
            bloco.classList.add('bloco');
            const img = document.createElement('img');
            bloco.appendChild(img);
            img.classList.add('imagem');
            img.src = estab.picture_url;
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
            nota.innerHTML = '5.0';//TODO: Mockado 
            const status = document.createElement('h3');
            inferior.appendChild(status);
            status.innerHTML = 'Aberto';// TODO: Mockado
            status.id = 'status';
            const grade = document.getElementById('grade');

            bloco.onclick = function () {
                localStorage.setItem('idEstab', estab.id);
                window.location.replace('../Perfil_Estabelecimento/perfil_estab_postagens.html');
            }

            grade.appendChild(bloco);
        });

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