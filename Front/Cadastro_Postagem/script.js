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

async function postar(){
    const LOCAL_API_URL = `http://localhost:3000/api/posts`;

  try {
    let estab=null, evento=null, ponto=localStorage.getItem('idAtracao');
    if(localStorage.getItem("tipoAtracao") == 'estabelecimento'){
        estab = localStorage.getItem('idAtracao');
        ponto = null;
    }else if(localStorage.getItem("tipoAtracao") == 'evento'){
        evento = localStorage.getItem('idAtracao');
        ponto = null;
    }

    const response = await axios.post(
      LOCAL_API_URL,
      {
        name: titulo.value,
        description:  descricao.value,
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

    window.location.replace('../Perfil_Estabelecimento/perfil_estab_postagens.html');
  } catch (error) {
    console.log(error);
  }
}