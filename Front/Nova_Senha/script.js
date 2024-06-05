async function alterar() {
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const LOCAL_API_URL = `http://localhost:3000/api/users`;
    let ID;

    try {
        const response = await axios.get(LOCAL_API_URL);
        response.data.data.forEach(option => {
            if(option.email === email.value){
                ID = option.id;
                return;
            }
        });

    } catch (error) {
        console.log(error);
    }
}