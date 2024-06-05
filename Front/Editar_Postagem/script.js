const titulo = document.getElementById('titulo');
const descricao = document.getElementById('descricao');

window.onload = async function () {
  const imagem1 = document.querySelector('#imagem1');

  imagem1.addEventListener('change', event => {

    const reader = new FileReader;
    reader.onload = function (event) {
      const preview1 = document.querySelector('#preview-imagem1');

      if (preview1) {
        preview1.remove();
      }

      const previewImagem1 = document.createElement('img');
      previewImagem1.width = 200;
      previewImagem1.height = 200;
      previewImagem1.id = 'preview-imagem1';
      imagem1.insertAdjacentElement('afterend', previewImagem1);
      previewImagem1.src = event.target.result;
    }

    reader.readAsDataURL(imagem1.files[0]);

  });

  const idPost = localStorage.getItem("idPost");
  const LOCAL_API_URL = `http://localhost:3000/api/posts/${idPost}`;

  try {
    const response = await axios.get(LOCAL_API_URL,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    titulo.value = response.data.data.name;
    descricao.value = response.data.data.description;
  } catch (error) {
    console.log(error);
  }
}

async function salvar() {
  const LOCAL_API_URL = `http://localhost:3000/api/posts`;

  try {
    if (localStorage.getItem("tipoAtracao") == 'estabelecimento') {
      estab = localStorage.getItem('idAtracao');
      ponto = null;
    } else if (localStorage.getItem("tipoAtracao") == 'evento') {
      evento = localStorage.getItem('idAtracao');
      ponto = null;
    }

    const response = await axios.put(
      LOCAL_API_URL,
      {
        id: localStorage.getItem('idPost'),
        name: titulo.value,
        description: descricao.value
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const imagemValue = document.getElementById("imagem1");
    const file = imagemValue.files[0];

    const formData = new FormData();
    formData.append("picture", file);

    //TODO: ARRUMAR IMAGEM
    const LOCAL_API_URL_IMAGE = `${LOCAL_API_URL}/${localStorage.getItem('idPost')}/upload/post_picture`;

      const imagemRequest = await axios.post(LOCAL_API_URL_IMAGE, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(imagemRequest);

      alert("Edição concluída!");

    window.location.replace('../Perfil_Estabelecimento/perfil_estab_postagens.html');
  } catch (error) {
    console.log(error);
  }
}


async function excluir() {
  const LOCAL_API_URL_DELETE = `http://localhost:3000/api/posts/${localStorage.getItem('idPost')}`;
  try {
    const response = await axios.delete(LOCAL_API_URL_DELETE, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(response);

    window.location.replace("../Perfil_Estabelecimento/perfil_estab_postagens.html");
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
    alert("Conta deletada com sucesso!");
    confirmationPopup.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == confirmationPopup) {
      confirmationPopup.style.display = "none";
    }
  });
}