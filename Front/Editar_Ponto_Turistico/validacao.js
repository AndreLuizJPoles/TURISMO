const nomePonto = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const cep = document.getElementById("cep");
const uf = document.getElementById("uf");
const cidade = document.getElementById("cidade");
const bairro = document.getElementById("bairro");
const rua = document.getElementById("rua");
const numero = document.getElementById("numero");
const instagram = document.getElementById('instagram');
const facebook = document.getElementById('facebook');
const linkedin = document.getElementById('linkedin');
const website = document.getElementById('website');
const whatsapp = document.getElementById('whatsapp');
const email1 = document.getElementById("email1");
const email2 = document.getElementById("email2");
const email3 = document.getElementById("email3");
const telefone1 = document.getElementById("telefone1");
const telefone2 = document.getElementById("telefone2");
const telefone3 = document.getElementById("telefone3");

function validar() {
    if (verificaVazio()) {
        alert("Preencha todos os campos obrigatórios!");
        return false;
    }
    return true;
}

function verificaVazio() {
    return nomePonto.value == '' || cep.value == '' || cidade.value == '' || bairro.value == '' || rua.value == '' || uf.value == '';
}

async function salvar() {
    if (validar()) {
        if (instagram.value === '') {
            instagram.value = 'https://nada.com';
        }
        if (facebook.value === '') {
            facebook.value = 'https://nada.com';
        }
        if (linkedin.value === '') {
            linkedin.value = 'https://nada.com';
        }
        if (website.value === '') {
            website.value = 'https://nada.com';
        }
        if (whatsapp.value === '') {
            whatsapp.value = '0';
        }
        if (email1.value == '') {
            email1.value = 'sememail@email.com';
        }
        if (email2.value == '') {
            email2.value = 'sememail@email.com';
        }
        if (email3.value == '') {
            email3.value = 'sememail@email.com';
        }
        if (telefone1.value == '') {
            telefone1.value = '0';
        }
        if (telefone2.value == '') {
            telefone2.value = '0';
        }
        if (telefone3.value == '') {
            telefone3.value = '0';
        }

        const contacts = {
            emails: [email1.value, email2.value, email3.value],
            phone_numbers: [telefone1.value, telefone2.value, telefone3.value],
        };


        const payload = {
            id: localStorage.getItem("idAtracao"),
            name: nomePonto.value,
            description: descricao.value,
            address: bairro.value + ", " + rua.value + ", " + numero.value,
            zip_code: cep.value,
            state: uf.value,
            instagram_url: instagram.value,
            facebook_url: facebook.value,
            linkedin_url: linkedin.value,
            website_url: website.value,
            whatsapp: whatsapp.value,
            contacts
        };

        try {
            const LOCAL_API_URL = "http://localhost:3000/api/attractions";
            const response = await axios.put(LOCAL_API_URL, payload, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const imagemPerfilValue = document.getElementById("imagem-perfil");
            const file = imagemPerfilValue.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("picture", file);

                console.log("formData", formData);
                const LOCAL_API_URL_IMAGE = `${LOCAL_API_URL}/${localStorage.getItem(
                    "idAtracao"
                )}/upload/picture_upload?type=profile`;
                const imagemRequest = await axios.post(LOCAL_API_URL_IMAGE, formData, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log(imagemRequest);
            }
            const imagemPlanoValue = document.getElementById("imagem-plano");
            const filePlano = imagemPlanoValue.files[0];
            if (filePlano) {
                const formDataPlano = new FormData();
                formDataPlano.append("picture", filePlano);

                console.log("formDataPlano", formDataPlano);
                const LOCAL_API_URL_IMAGE_BACK = `${LOCAL_API_URL}/${localStorage.getItem(
                    "idAtracao"
                )}/upload/picture_upload?type=background_picture`;
                const imagemPlanoRequest = await axios.post(LOCAL_API_URL_IMAGE_BACK, formDataPlano, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log(imagemPlanoRequest);
            }
            alert('Ponto Turístico editado!');
            window.location.replace('../Perfil_Ponto/perfil_ponto.html');

        } catch (error) {
            console.log(error);
        }
    }
}

const imagemPlano = document.querySelector("#imagem-plano");

imagemPlano.addEventListener("change", (event) => {
    const reader = new FileReader();
    reader.onload = function (event) {
        const previewPlano = document.querySelector("#preview-imagem-plano");

        if (previewPlano) {
            previewPlano.remove();
        }

        const previewImagemPlano = document.createElement("img");
        previewImagemPlano.width = 300;
        previewImagemPlano.height = 100;
        previewImagemPlano.id = "preview-imagem-plano";
        imagemPlano.insertAdjacentElement("afterend", previewImagemPlano);
        previewImagemPlano.src = event.target.result;
    };

    reader.readAsDataURL(imagemPlano.files[0]);
});

const imagemPerfil = document.querySelector("#imagem-perfil");

imagemPerfil.addEventListener("change", (event) => {
    const reader = new FileReader();
    reader.onload = function (event) {
        const preview = document.querySelector("#preview-imagem");

        if (preview) {
            preview.remove();
        }

        const previewImagem = document.createElement("img");
        previewImagem.width = 100;
        previewImagem.height = 100;
        previewImagem.id = "preview-imagem";
        imagemPerfil.insertAdjacentElement("afterend", previewImagem);
        previewImagem.src = event.target.result;
    };

    reader.readAsDataURL(imagemPerfil.files[0]);
});

window.onload = async function () {
    const idPonto = localStorage.getItem("idAtracao");
    const LOCAL_API_URL = `http://localhost:3000/api/attractions/${idPonto}`;
    try {
        const response = await axios.get(LOCAL_API_URL, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        console.log(response);

        nome.value = response.data.data.name;
        descricao.value = response.data.data.description;
        cep.value = response.data.data.zip_code;
        uf.value = response.data.data.state;
        cidade.value = response.data.data.city;

        if(response.data.data.instagram_url !== 'https://nada.com'){
            instagram.value = response.data.data.instagram_url;
          }
          if(response.data.data.facebook_url !== 'https://nada.com'){
            facebook.value = response.data.data.facebook_url;
          }
          if(response.data.data.linkedin_url !== 'https://nada.com'){
            linkedin.value = response.data.data.linkedin_url;
          }
          if(response.data.data.website_url !== 'https://nada.com'){
            website.value = response.data.data.website_url;
          }
          if(response.data.data.whatsapp !== '0'){
            whatsapp.value = response.data.data.whatsapp;
          }

        const [bairroAux, ruaAux, numeroAux] = response.data.data.address.split(", ");

        bairro.value = bairroAux;
        rua.value = ruaAux;
        numero.value = numeroAux;
    } catch (error) {
        console.log(error);
    }
};

async function excluir() {
    const LOCAL_API_URL_DELETE = `http://localhost:3000/api/attractions/${localStorage.getItem("idAtracao")}`;
    try {
        const response = await axios.delete(LOCAL_API_URL_DELETE, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        console.log(response);

        window.location.replace("../Menu/index.html");
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
        alert("Ponto Turístico deletado com sucesso!");
        confirmationPopup.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == confirmationPopup) {
            confirmationPopup.style.display = "none";
        }
    });
}
