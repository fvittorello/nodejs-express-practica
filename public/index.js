// const mailInput = document.querySelector('');
// const sendButton = document.querySelector('');

const boton = document.querySelector("#boton_ingresar");
const formulario = document.querySelector("#form-registrarse");
const enviar = document.querySelector('#submit-user');
const nombreUsuario = document.querySelector('#fname');
const emailUsuario = document.querySelector('#Email');


enviar.addEventListener('click', (e) => {
    const nombre = nombreUsuario.value;
    const email = emailUsuario.value;
    const data = {nombre, email};

    nombreUsuario.value = '';
    emailUsuario.value = '';

    nuevoUsuario(data);
    
    e.preventDefault();
})

function toggleVisibility(tag) {
    if(tag.classList.contains('hidden')){
        tag.classList.remove('hidden');
    } else {
        tag.classList.add('hidden');
    }
}


function nuevoUsuario(data) {
    // const formData = new FormData();
	// formData.append('file', userGifBlob, 'myGif.gif');

    const parameters = {
		method: 'POST',
		body: JSON.stringify(data),
        json: true,
        headers:{
            'Content-Type': 'application/json'
        }
    };
    

    fetch(`http://localhost:3000/registrarse`, parameters)
        .then(((json) => {return json}))
        .catch((err => {console.error(err)}))
}
        

boton.addEventListener("click", ()=>{
    toggleVisibility(formulario);
})


