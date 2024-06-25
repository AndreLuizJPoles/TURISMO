async function pesquisar(){
    const LOCAL_API_URL = `http://localhost:3000/api/users`;
    let achaEmail = false;
    const email = document.getElementById('email');

    try {
        const response = await axios.get(LOCAL_API_URL);

        response.data.data.forEach(option => {
            if(option.email === email.value){
                achaEmail = true;
                return;
            }
        });

        if(achaEmail){
            mandaEmail(email.value);
            alert('Confira seu e-mail para alterar sua senha!');
        }else{
            alert('Não existe nenhuma conta com esse e-mail!');
        }

    } catch (error) {
        console.log(error);
    }
}

async function mandaEmail(emailRec){
    const LOCAL_API_URL_EMAIL = 'http://localhost:3000/api/users/recoveryPassword';

    try {

        const response = await axios.post(
            LOCAL_API_URL_EMAIL,
            {
                email: emailRec
            }
        );

        console.log(response);

    } catch (error) {
        console.log(error);
    }
}