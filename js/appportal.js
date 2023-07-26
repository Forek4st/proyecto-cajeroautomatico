let cuentas = [
  { nombre: "mali", saldo: 200 },
  { nombre: "gera", saldo: 290 },
  { nombre: "maui", saldo: 67 },
];

const usuarioGuardado = localStorage.getItem("nombreUsuario");
const usuarioSeleccionado = usuarioGuardado;

let saldoActual;
const usuarioEncontrado = cuentas.find(
  (cuenta) => cuenta.nombre === usuarioSeleccionado
);

if (usuarioEncontrado) {
  saldoActual = usuarioEncontrado.saldo;
}

//Event Listeners//

saldoBtn.addEventListener("click", saldo);
retirarBtn.addEventListener("click", retirar);
depositarBtn.addEventListener("click", depositar);

//Funciones//

function saldo() {
  Swal.fire({
    text: "Saldo Actual:  " + saldoActual + " Pesos",
    icon: "info",
    showConfirmButton: true,
    confirmButtonColor: "#6cace4",
  });
}

function depositar() {
  Swal.fire({
    title: "Monto a Depositar:",
    input: "text",
    inputAttributes: {
      type: "number",
      step: "any",
    },
    showCancelButton: true,
    confirmButtonText: "Depositar",
    confirmButtonColor: "#6cace4",
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#FF0000",
    showLoaderOnConfirm: true,
    preConfirm: (monto) => {
      if (!monto || isNaN(parseFloat(monto)) || parseFloat(monto) <= 0) {
        Swal.showValidationMessage("Por favor, ingresa un monto válido");
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      const monto = parseFloat(result.value);

      if (monto > 990) {
        Swal.fire({
          text: "El monto depositado excede el límite máximo permitido.",
          icon: "warning",
          showConfirmButton: true,
          confirmButtonColor: "#6cace4",
          timer: 2500,
        });
      } else {
        saldoActual += monto;
        Swal.fire({
          title: "Depósito exitoso",
          html:
            "Monto depositado: " +
            monto +
            " Pesos" +
            "<br>Nuevo saldo: " +
            saldoActual +
            " Pesos",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#6cace4",
        });
      }
    }
  });
}

function retirar() {
  Swal.fire({
    title: "Monto a Retirar:",
    input: "text",
    inputAttributes: {
      type: "number",
      step: "any",
    },
    showCancelButton: true,
    confirmButtonText: "Retirar",
    confirmButtonColor: "#6cace4",
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#ff0000",

    showLoaderOnConfirm: true,
    preConfirm: (monto) => {
      if (!monto || isNaN(parseFloat(monto)) || parseFloat(monto) <= 0) {
        Swal.showValidationMessage("Por favor, ingresa un monto válido");
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      const monto = parseFloat(result.value);

      if (monto > saldoActual) {
        Swal.fire({
          text: "No tienes suficiente saldo para realizar el retiro.",
          icon: "warning",
          showConfirmButton: true,
          confirmButtonColor: "#6cace4",
          timer: 2500,
        });
      } else if (saldoActual - monto < 10) {
        Swal.fire({
          text: "El monto retirado excede el límite mínimo permitido.",
          icon: "warning",
          showConfirmButton: true,
          confirmButtonColor: "#6cace4",
          timer: 2500,
        });
      } else {
        saldoActual -= monto;
        Swal.fire({
          title: "Retiro exitoso",
          html:
            "Monto retirado: " +
            monto +
            " Pesos" +
            "<br>Nuevo saldo: " +
            saldoActual +
            " Pesos",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#6cace4",
        });
      }
    }
  });
}

//Modificacion al text content de bienvenida

let bienvenidoUsuario = document.getElementById("bienvenidoUsuario");
const primeraLetraMayuscula = usuarioGuardado.charAt(0).toUpperCase();
const restoNombreMinusculas = usuarioGuardado.slice(1).toLowerCase();
bienvenidoUsuario.textContent =
  "Bienvenido " + primeraLetraMayuscula + restoNombreMinusculas;
