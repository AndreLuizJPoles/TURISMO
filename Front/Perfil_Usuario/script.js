const nome = document.getElementById('nome');
const endereco = document.getElementById('endereco');
const foto = document.getElementById('foto-perfil');

window.onload = async function () {
    const ID = await pegaID();
    const LOCAL_API_URL = `http://localhost:3000/api/users/${ID}`;

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
        endereco.innerHTML = `<img src="../Perfil_Usuario/imgs/pin.png" id="icon-endereco" class="icon"> <p id="end-texto">${response.data.data.address}`;
        foto.src = response.data.data.picture_url;

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