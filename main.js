const formget  = document.querySelector('.formGet');
const profile = document.querySelector('.profile');
const container = document.querySelector ('.container');
const url = "https://larnu-api-upy5mhs63a-rj.a.run.app/api/v1/bootcamp/profile";

formget.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  localStorage.setItem("email", email)
  const discord = e.target[1].value;
  localStorage.setItem("discord", discord)
  getPerfil(email, discord);
});

const correo = localStorage.getItem("email");
const contraseña = localStorage.getItem("discord");

const getPerfil = async (email, discord) => {
  const res = await axios.get(url, {
      headers: {
        'Email': email,
        'Discord-id': discord
      }      
    })
    .then((res) => {
      getCard(res.data);
    })
    .catch((err) => {
      alert('Datos invalidos');
    });
};

const getCard = async (data) => {
  const hidden = document.querySelector('.sesion')
  hidden.style.display = 'none'
  profile.innerHTML = `
    <h1>PERFIL DE USUARIO</h1>
    <div class="container">
      <div class="container__header">
        <div class="avatar">
          <img src="${data.user.avatar}" alt="imagen perfil">
        </div>
        <div class="info">
          <p class="name">${data.user.fullName}</p>
          <p class="email">${data.user.email}</p>
        </div>
      </div>
      <div class="level">
        <p class="level">${data.level}<span>Nivel</span></p>
      </div>
      <div class="container__body">
        <p class="hobbies">Hobbies</p>
        <input class="hobbies__input" type="text" name="hobbies" disabled value="${data.hobbies}">
        <button class="edit" onclick="update()" ><i class="fa-solid fa-user-pen"></i> Editar</button>
      </div>
    </div>
    </div>
  `
   container.addEventListener('click', () => {
    window.location.reload();
  });
};

function update() {
  const btn = document.querySelector('.edit') 
  btn.textContent = 'Guardar'
  if(btn.textContent === 'Guardar'){
    const editInput = document.querySelector('.hobbies__input')
    editInput.removeAttribute('disabled')
    editInput.classList.toggle('update--Input')
    const updateInput = editInput.value
    updateHobbies(updateInput)
    alert('Dato Actualizado')
    btn.textContent = 'Editar'
  } else {
    editInput.classList.toggle('update--Input')
  }

  
}

function updateHobbies (updateInput) {
  const dato =  updateInput
  ptchHobbiwes(dato)
}
  
function ptchHobbiwes(dato) {
  console.log('esto es un '+ dato)
  const res = axios.patch(url,{hobbies: dato}, { 
      headers: {
        'Email':correo,
        'Discord-Id':contraseña
      }
    })
    .then((res) => {
      console.log('dato actualizado')
    })
    .catch((err) => {
      alert('No se puedo actualizar los datos');
    });    
  }

