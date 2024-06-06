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

async function comentar() {
    const LOCAL_API_URL = `http://localhost:3000/api/comments`;

    try {
        let estab = null, evento = null, ponto = localStorage.getItem('idAtracao'), urlAux = '../Perfil_Ponto/perfil_ponto.html';
        if (localStorage.getItem("tipoAtracao") == 'estabelecimento') {
            estab = localStorage.getItem('idAtracao');
            ponto = null;
            urlAux = '../Perfil_Estabelecimento/perfil_estab_comentarios.html';
        } else if (localStorage.getItem("tipoAtracao") == 'evento') {
            evento = localStorage.getItem('idAtracao');
            ponto = null;
            urlAux = '../Perfil_Evento/perfil_evento_comentarios.html';
        }

        const response = await axios.post(
            LOCAL_API_URL,
            {
                evaluation_note: parseInt(nota.value, 10),
                description: descricao.value,
                establishment_id: estab,
                event_id: evento,
                attraction_id: ponto,
            },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        alert("Comentário concluído!");

        window.location.replace(urlAux);
    } catch (error) {
        console.log(error);
    }
}