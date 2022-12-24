//Calcular pagos en cuotas.
const divBotones = document.createElement("div");
divBotones.classList = "container d-flex justify-content-evenly my-4 flex-wrap";
divBotones.id = "divCuotas";
divBotones.innerHTML = `<h2 class="bg-primary text-white rounded-1 mt-1 px-3 py-2" id="h2">Elija las Cuotas:</h2>`;

const entradaUsuario = document.createElement("p");
entradaUsuario.classList = `my-2 rounded-1 text-white py-3 bg-dark`;
entradaUsuario.id = "entrada-usuario";

const addBoton = (textoBoton, clases, id, value) => {
  let boton = document.createElement("button");
  boton.innerHTML = textoBoton;
  boton.classList = clases;
  boton.id = id;
  boton.value = value;

  return boton;
};

const inputVacio = () => {
  let cantidadAPagar = document.getElementById("cantidad-a-pagar");
  if (UI.contains(cantidadAPagar)) {
    cantidadAPagar.remove();
  }

  let div = document.createElement("div");
  div.classList = "text-dark bg-danger text-center rounded-1 p-1 mx-5 mt-4";
  div.innerHTML = `<p class="text-center fs-2 my-1">Debe Igresar un monto!</p>`;
  UI.append(div);

  window.setTimeout(() => {
    div.remove();
  }, 3000);
};

const msjFinal = () => {
  let cantidadAPagar = document.createElement("div");
  cantidadAPagar.id = "cantidad-a-pagar";

  if (!cuotasUsuario) {
    cantidadAPagar.innerHTML = "Debe ingresar un número!";
    cantidadAPagar.classList =
      "container bg-danger text-dark text-center rounded-1 my-2 fs-3";

    window.setTimeout(() => {
      cantidadAPagar.remove();
    }, 6000);
  } else {
    let montoAPagar = (valorDineroUsuario + interes) / cuotasUsuario;
    let totalConInteres = valorDineroUsuario + interes;
    cantidadAPagar.classList =
      "container bg-dark text-white text-center p-2 rounded-1 my-2 fs-4";
    cantidadAPagar.innerHTML = `Usted deberá pagar ${cuotasUsuario} cuotas de ${montoAPagar.toFixed(
      2
    )} pesos (Total: ${totalConInteres}, Interes: 6%)`;
  }

  window.setTimeout(() => {
    let cuotasAPagar = document.getElementById("cantidad-a-pagar");
    if (UI.contains(cuotasAPagar)) {
      cuotasAPagar.remove();
      UI.append(cantidadAPagar);
    } else {
      UI.append(cantidadAPagar);
    }
  }, 1300);
};

const botones = [
  addBoton("3 CUOTAS", "btn btn-info text-center my-1", "boton-cuota", 3),
  addBoton("6 CUOTAS", "btn btn-info text-center my-1", "boton-cuota", 6),
  addBoton("12 CUOTAS", "btn btn-info text-center my-1", "boton-cuota", 12),
  addBoton(
    "OTRO",
    "btn btn-info text-center px-2 my-1",
    "cuotas-personalizadas",
    "OTRO"
  ),
];
botones.forEach((boton) => {
  divBotones.append(boton);
});

const UI = document.getElementById("UI");
const interfazInicial = document.getElementById("interfaz-inicial");
const dineroUsuario = document.getElementById("dinero-usuario");
const btnEnviar = document.getElementById("btn-enviar");
const titulo = document.getElementById("titulo");

let cuotasUsuario;
let interes;
let switcher = true;
let valorDineroUsuario;

btnEnviar.addEventListener("click", () => {
  if (
    dineroUsuario.value === "" ||
    !parseInt(dineroUsuario.value) ||
    parseInt(dineroUsuario.value) < 0
  ) {
    inputVacio();
  } else {
    valorDineroUsuario = parseInt(dineroUsuario.value);
    interes = valorDineroUsuario * 0.06;
    dineroUsuario.value = "";

    entradaUsuario.innerHTML = `Usted ingresó <span class="fw-bold">${valorDineroUsuario}</span> pesos.`;

    if (interfazInicial.contains(entradaUsuario)) {
      let p = document.getElementById("entrada-usuario");
      p.remove();

      interfazInicial.append(entradaUsuario);
    } else {
      interfazInicial.append(entradaUsuario);
    }

    if (!UI.contains(divBotones)) {
      UI.append(divBotones);
    }

    const botonesHTML = document.querySelectorAll("#boton-cuota");
    botonesHTML.forEach((el) => {
      el.addEventListener("click", () => {
        cuotasUsuario = el.value;
        msjFinal();
      });
    });

    if (switcher) {
      const cuotasPersonalizadas = document.getElementById(
        "cuotas-personalizadas"
      );

      cuotasPersonalizadas.addEventListener("click", () => {
        cuotasUsuario = parseInt(prompt("Ingrese una cantidad de cuotas:"));
        msjFinal();
      });

      switcher = false;
    }
  }
});

//Cosas a mejorar: El interes debe cambiar dependiendo de las cuotas
