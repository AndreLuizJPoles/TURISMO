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

  })
}

async function postar() {
  const LOCAL_API_URL = `http://localhost:3000/api/posts`;

  try {
    let estab = null, evento = null, ponto = localStorage.getItem('idAtracao'), urlAux;
    if (localStorage.getItem("tipoAtracao") == 'estabelecimento') {
      estab = localStorage.getItem('idAtracao');
      ponto = null;
      urlAux = '../Perfil_Estabelecimento/perfil_estab_postagens.html';
    } else if (localStorage.getItem("tipoAtracao") == 'evento') {
      evento = localStorage.getItem('idAtracao');
      ponto = null;
      urlAux = '../Perfil_Evento/perfil_evento_postagens.html';
    }

    const response = await axios.post(
      LOCAL_API_URL,
      {
        name: titulo.value,
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

    const postImagem = document.querySelector("#imagem1")
    const file = postImagem.files[0];

    if (file) {
      const formData = new FormData();

      formData.append("picture", file);
      
      const LOCAL_API_URL_IMAGE = `${LOCAL_API_URL}/${response.data.data.id}/upload/picture_upload`;

      console.log(formData)

      const imagemRequest = await axios.post(LOCAL_API_URL_IMAGE, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(imagemRequest);
    }

    window.location.replace(urlAux);
  } catch (error) {
    console.log(error);
  }
}