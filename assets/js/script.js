// Funcion de inicio de sesion
function validacionLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Verificar si hay credenciales almacenadas en el Local Storage
  var storedUsername = localStorage.getItem("username");
  var storedPassword = localStorage.getItem("password");

  // Verificar si no hay credenciales almacenadas y agregar las predeterminadas
  if (!storedUsername && !storedPassword) {
    localStorage.setItem("username", "admin@cariongo.com");
    localStorage.setItem("password", "hotelcariongo2");
    storedUsername = "admin@cariongo.com";
    storedPassword = "hotelcariongo2";
  }

  // Validar las credenciales
  if (username === storedUsername && password === storedPassword) {
    window.location.href = "admin.html";
  } else {
    alert("Usuario o contraseña incorrectos. Por favor, inténtalo nuevamente.");
  }
}



function cambioUserPass() {
  // Obtener los valores de los campos de entrada del formulario
  var oldUsername = document.getElementById("oldUser").value;
  var oldPassword = document.getElementById("oldPass").value;
  var newUsername = document.getElementById("newUser").value;
  var newPassword = document.getElementById("newPass").value;

  // Obtener los valores almacenados en el Local Storage
  var storedUsername = localStorage.getItem("username");
  var storedPassword = localStorage.getItem("password");

  // Verificar si las credenciales antiguas coinciden con las almacenadas en el Local Storage
  if (oldUsername === storedUsername && oldPassword === storedPassword) {
    // Verificar si se han ingresado nuevos valores de usuario y contraseña
    if (newUsername && newPassword) {
      // Actualizar las credenciales almacenadas en el Local Storage con los nuevos valores
      localStorage.setItem("username", newUsername);
      localStorage.setItem("password", newPassword);
      // Mostrar un mensaje de éxito en una alerta
      alert("Las credenciales se han actualizado correctamente.");
    } else {
      // Mostrar una alerta si no se ingresaron nuevos valores válidos
      alert("Por favor, ingrese un nuevo usuario y contraseña válidos.");
    }
  } else {
    // Mostrar una alerta si las credenciales antiguas son incorrectas
    alert("El usuario o contraseña anterior son incorrectos. Por favor, inténtalo nuevamente.");
  }
}



function borrarDatosLocalStorage() {
  // Eliminar "username" y "password" del Local Storage
  localStorage.removeItem("username");
  localStorage.removeItem("password");

  // Mostrar una alerta para notificar al usuario que los datos han sido eliminados
  alert("Usuario y contraseña reestablecidos.");
}



function borrarInscritos() {
  // Eliminar los datos de inscritos del Local Storage
  localStorage.removeItem("inscritos");

  // Actualizar la tabla
  mostrarInscritos();
}


 // Variable para almacenar el paquete seleccionado
 let paqueteSeleccionado;

 // Función para mostrar el modal de registro y guardar el paquete seleccionado
 function mostrarModalRegistro(paquete) {
   paqueteSeleccionado = paquete;
   document.getElementById("paqueteSeleccionado").value = paquete;
   const formularioModal = new bootstrap.Modal(document.getElementById("formularioModal"));
   formularioModal.show();
 }

 

 // Función para obtener los datos de inscritos almacenados en localStorage
 function obtenerInscritos() {
  const inscritos = localStorage.getItem("inscritos");
  return inscritos ? JSON.parse(inscritos) : [];
}

// Función para mostrar los datos de inscritos en la tabla
function mostrarInscritos() {
  const inscritos = obtenerInscritos();
  const tablaInscritos = document.getElementById("tablaInscritos");

  // Limpiar la tabla
  tablaInscritos.innerHTML = "";

  // Agregar filas con los datos de los inscritos
  inscritos.forEach((inscrito) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${inscrito.nombre}</td>
      <td>${inscrito.apellidos}</td>
      <td>${inscrito.cedula}</td>
      <td>${inscrito.edad}</td>
      <td>${inscrito.email}</td>
      <td>${inscrito.telefono}</td>
      <td>${inscrito.paquete}</td>
    `;
    tablaInscritos.appendChild(fila);
  });
}


//Validada si la cedula ya esta registrada
function validarCedulaExistente() {
  const cedulaInput = document.getElementById("cedula");
  const cedula = cedulaInput.value;

  // Obtener los datos de inscritos almacenados en localStorage
  const inscritos = obtenerInscritos();

  // Verificar si la cédula ya está en la lista de inscritos
  const isCedulaExistente = inscritos.some((inscrito) => inscrito.cedula === cedula);

  const cedulaExistente = document.getElementById("cedulaExistente");
  if (isCedulaExistente) {
    cedulaExistente.textContent = "¡Esta cédula ya está registrada!";
  } else {
    cedulaExistente.textContent = "";
  }
}


// Función para agregar un nuevo inscrito a la lista y actualizar la tabla
function agregarInscrito(formData) {
  // Obtener la lista de inscritos 
  const inscritos = obtenerInscritos();

  inscritos.push(formData);

  // Actualizar el LocalStorage con la lista de inscritos actualizada
  localStorage.setItem("inscritos", JSON.stringify(inscritos));

  // Actualizar la tabla que muestra los datos de los inscritos en la página
  mostrarInscritos();
}



// Función para borrar los datos de inscritos del localStorage
function borrarInscritos() {
  localStorage.removeItem("inscritos");
  mostrarInscritos(); // Actualizar la tabla mostrando que no hay inscritos
}


// Función para obtener los datos de los inscritos almacenados en el localStorage
function obtenerInscritos() {
  const inscritos = localStorage.getItem("inscritos");
  return inscritos ? JSON.parse(inscritos) : [];
}

// Función para agregar un nuevo inscrito a la lista
function agregarInscrito(inscrito) {
  // Obtiene la lista de inscritos llamando a la función obtenerInscritos()
  const inscritos = obtenerInscritos();

  // Agrega el nuevo inscrito al final de la lista
  inscritos.push(inscrito);

  // Almacena la lista actualizada de inscritos en el localStorage
  localStorage.setItem("inscritos", JSON.stringify(inscritos));
}

// Función para validar si la cédula ya está registrada
function validarCedulaExistente() {
  // Obtiene el valor del campo de entrada de cédula
  const cedulaInput = document.getElementById("cedula");
  const cedula = cedulaInput.value;

  const inscritos = obtenerInscritos();

  // Comprueba si la cédula ya está registrada en la lista de inscritos
  const isCedulaExistente = inscritos.some((inscrito) => inscrito.cedula === cedula);

  // Muestra un mensaje de aviso si la cédula ya está registrada o borra el mensaje si no lo está
  const mensajeCedulaExistente = document.getElementById("cedulaExistente");
  if (isCedulaExistente) {
    mensajeCedulaExistente.textContent = "¡Esta cédula ya está registrada!";
  } else {
    mensajeCedulaExistente.textContent = "";
  }
}

// Función para restablecer los valores del formulario
function limpiarFormulario() {
  // Obtiene cada campo del formulario por su ID y establece su valor como una cadena vacía, borrando los datos ingresados
  document.getElementById("nombre").value = "";
  document.getElementById("apellidos").value = "";
  document.getElementById("cedula").value = "";
  document.getElementById("edad").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefono").value = "";
}

function validarRegistro() {
  // Obtiene los datos ingresados en cada campo del formulario
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const cedula = document.getElementById("cedula").value;
  const edad = document.getElementById("edad").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;
  const paquete = document.getElementById("paqueteSeleccionado").value;

  const inscritos = obtenerInscritos();

  // Verifica si la cédula ya está en la lista de inscritos
  const isCedulaExistente = inscritos.some((inscrito) => inscrito.cedula === cedula);

  // Muestra el modal de "Ya estás inscrito" si la cédula ya está registrada y evita el envío del formulario
  if (isCedulaExistente) {
    const modalInscrito = new bootstrap.Modal(document.getElementById("modalInscrito"));
    modalInscrito.show();
    return false;
  }

  // Verificar que todos los campos obligatorios estén completos
  if (nombre === "" || apellidos === "" || cedula === "" || edad === "" || email === "" || telefono === "" || paquete === "") {
    alert("Debe completar todos los campos obligatorios.");
    return false;
  }

  // Verificar el límite de caracteres para apellidos y nombres (máximo 30 caracteres por campo)
  if (apellidos.length > 30 || nombre.length > 30) {
    alert("El límite de caracteres para los apellidos y nombres es de 30 caracteres por campo.");
    return false;
  }

  // Verificar que la cédula solo contenga caracteres numéricos y no exceda los 8 dígitos
  if (isNaN(cedula) || cedula.length > 8) {
    alert("La cédula no puede tener más de 8 dígitos y solo se permiten caracteres numéricos.");
    return false;
  }

  // Verificar que la edad solo contenga caracteres numéricos y no exceda los 110 años
  if (isNaN(edad) || edad > 110) {
    alert("Ingrese una edad válida que no exceda los 110 años.");
    return false;
  }

  // Validación del formato del correo electrónico utilizando una expresión regular
  const validacorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!validacorreo.test(email)) {
    alert("El correo electrónico ingresado no es válido.");
    return false;
  }

  // Si pasa todas las validaciones, agregar el inscrito y mostrar el modal de "Preinscripción Exitosa"
  const formData = {
    nombre,
    apellidos,
    cedula,
    edad,
    email,
    telefono,
    paquete,
    // Agrega más campos de registro aquí según los datos recopilados
  };

  agregarInscrito(formData);

  const modalPreinscripcionExitosa = new bootstrap.Modal(document.getElementById("modalPreinscripcionExitosa"));
  modalPreinscripcionExitosa.show();

  // Limpia los campos del formulario después de mostrar el modal de éxito llamando a la función limpiarFormulario()
  limpiarFormulario();

  return false; // Evita el envío del formulario, ya que no es necesario realmente
}



// Mostrar los inscritos al cargar la página
window.onload = function () {
  mostrarInscritos();
};



// Función para abrir el modal
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "block";
}

// Función para cerrar el modal al hacer clic fuera de él
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = "none";
  }
};
