var cuentas = [
  { usuario: "mali", password: "123456" },
  { usuario: "gera", password: "654321" },
  { usuario: "maui", password: "162534" },
];

function iniciarSesion() {
  let usuario = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;

  localStorage.setItem("nombreUsuario", usuario);

  let usuarioEncontrado = cuentas.find(
    (f) => f.usuario === usuario && f.password === password
  );

  if (usuarioEncontrado) {
    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: "Redirigiendo al sitio...",
      allowOutsideClick: false,
    }).then(() => {
      window.open("./portal.html", "_self");
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      html: "Contraseña y/o Nombre de usuario incorrecto.<br>Intenta nuevamente.",
      confirmButtonText: "Aceptar",
    });
  }
}
btnIniciarSesion.addEventListener("click", iniciarSesion);
