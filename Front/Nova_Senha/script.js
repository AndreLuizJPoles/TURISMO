async function alterar() {
    const email = document.getElementById("email");
    const senha = document.getElementById("senha-nova");
    const LOCAL_API_URL = `http://localhost:3000/api/users/resetPassword `;

    let codigo = prompt("Informe o código: ");

    try {
        const response = await axios.put(
            LOCAL_API_URL,
        {
            email: email.value,
            password: senha.value,
            uuid_code: codigo
        });

        console.log(response);

        alert('Senha alterada com sucesso!');
        window.location.replace('../Login/login.html');
    } catch (error) {
        console.log(error);
    }
}