const nota = document.getElementById("nota");
const descricao = document.getElementById("descricao");

function comentar() {
    if (validacao()) {
        alert("Foi!");
    }
}

function validacao() {
    if (rangenota()) {
        alert('A nota deve ser de 1 a 5!');
        return false;
    }
    return true;
}

function rangenota() {
    if (nota.value >= 1 && nota.value <= 5) {
        return false;
    }
    return true;
}

window.onload = async function () {
    const idComment = localStorage.getItem("idComment");
    const LOCAL_API_URL_COM = `http://localhost:3000/api/comments/${idComment}`;

    try {
        const response = await axios.get(LOCAL_API_URL_COM,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        nota.value = response.data.data.evaluation_note;
        descricao.value = response.data.data.description;
    } catch (error) {
        console.log(error);
    }
}

async function salvar() {
    const idComment = localStorage.getItem("idComment");
    const LOCAL_API_URL = `http://localhost:3000/api/comments`;

    try {
        let urlAux = '../Perfil_Ponto/perfil_ponto.html';
        if (localStorage.getItem("tipoAtracao") == 'estabelecimento') {
            urlAux = '../Perfil_Estabelecimento/perfil_estab_comentarios.html';
        } else if (localStorage.getItem("tipoAtracao") == 'evento') {
            urlAux = '../Perfil_Evento/perfil_evento_comentarios.html';
        }

        if(nota.value === '0'){
            alert('Escolha uma nota válida!');
            return;
        }

        const response = await axios.put(
            LOCAL_API_URL,
            {
                id: idComment,
                evaluation_note: parseInt(nota.value, 10),
                description: descricao.value,
            },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        alert("Comentário editado!");

        window.location.replace(urlAux);
    } catch (error) {
        console.log(error);
    }
}

async function excluir() {
    let urlAux = '../Perfil_Ponto/perfil_ponto.html';
    if (localStorage.getItem("tipoAtracao") == 'estabelecimento') {
        urlAux = '../Perfil_Estabelecimento/perfil_estab_comentarios.html';
    } else if (localStorage.getItem("tipoAtracao") == 'evento') {
        urlAux = '../Perfil_Evento/perfil_evento_comentarios.html';
    }

    const LOCAL_API_URL_DELETE = `http://localhost:3000/api/comments/${localStorage.getItem('idComment')}`;
    try {
        const response = await axios.delete(LOCAL_API_URL_DELETE, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        console.log(response);

        window.location.replace(urlAux);
    } catch (error) {
        console.log({
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(error);
    }
}

function avisoExcluir() {
    const confirmationPopup = document.getElementById("confirmationPopup");
    const closeBtn = document.querySelector(".close-btn");
    const confirmDelete = document.getElementById("confirmDelete");
    const cancelDelete = document.getElementById("cancelDelete");

    confirmationPopup.style.display = "block";

    closeBtn.addEventListener("click", function () {
        confirmationPopup.style.display = "none";
    });

    cancelDelete.addEventListener("click", function () {
        confirmationPopup.style.display = "none";
    });

    confirmDelete.addEventListener("click", function () {
        excluir();
        alert("Comentário deletado com sucesso!");
        confirmationPopup.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == confirmationPopup) {
            confirmationPopup.style.display = "none";
        }
    });
}