const nome = document.getElementById('nome');
const endereco = document.getElementById('endereco');

window.onload = async function () {
    const ID = await pegaID();
    const LOCAL_API_URL = `http://localhost:3000/api/users/${ID}`;

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

        nome.innerHTML = response.data.data.name;
        endereco.innerHTML = `<img src="../Perfil_Usuario/imgs/pin.png" id="icon-endereco" class="icon"> <p id="end-texto">${response.data.data.address}`;

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