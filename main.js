//Calcular pagos en cuotas.

const addBoton = (textoBoton, clases, id, value) => {
  let boton = document.createElement("button");
  boton.innerHTML = textoBoton;
  boton.classList = clases;
  boton.id = id;
  boton.value = value;

  return boton;
};

const msjFinal = () => {
  let cantidadAPagar = document.createElement("div");
  cantidadAPagar.classList =
    "container bg-success text-white text-center p-2 rounded-1 my-2";
  cantidadAPagar.innerHTML = `Usted deberá pagar ${cuotasUsuario} cuotas de ${
    parseInt(dineroUsuario.value) / cuotasUsuario
  }`;
  cantidadAPagar.id = "cantidad-a-pagar";

  window.setTimeout(() => {
    let cuotasAPagar = document.getElementById("cantidad-a-pagar");
    if (UI.contains(cuotasAPagar)) {
      cuotasAPagar.remove();
      UI.append(cantidadAPagar);
    } else {
      UI.append(cantidadAPagar);
    }
  }, 2000);
};

const botones = [
  addBoton("3 CUOTAS", "btn btn-info text-center", "boton-cuota", 3),
  addBoton("6 CUOTAS", "btn btn-info text-center", "boton-cuota", 6),
  addBoton("12 CUOTAS", "btn btn-info text-center", "boton-cuota", 12),
  addBoton("OTRO", "btn btn-info text-center", "cuotas-personalizadas", "OTRO"),
];

const UI = document.getElementById("UI");
const dineroUsuario = document.getElementById("dinero-usuario");
const btnEnviar = document.getElementById("btn-enviar");
const titulo = document.getElementById("titulo");

let cuotasUsuario;

btnEnviar.addEventListener("click", () => {
  if (dineroUsuario.value === "") {
    let div = document.createElement("div");
    div.classList = "text-dark bg-danger text-center rounded-1 p-1 mx-5 my-1";
    div.innerHTML = "Debe Ingresar un Monto!";
    UI.append(div);
    window.setTimeout(() => {
      div.remove();
    }, 3000);
  } else {
    const dinero = parseInt(dineroUsuario.value);

    const div = document.createElement("div");
    div.classList = "container d-flex justify-content-evenly my-2";

    botones.forEach((boton) => {
      div.append(boton);
    });

    UI.append(div);

    const botonesHTML = document.querySelectorAll("#boton-cuota");
    botonesHTML.forEach((el) => {
      el.addEventListener("click", () => {
        cuotasUsuario = parseInt(el.value);
        msjFinal();
      });
    });

    const cuotasPersonalizadas = document.getElementById(
      "cuotas-personalizadas"
    );
    cuotasPersonalizadas.addEventListener("click", () => {
      cuotasUsuario = parseInt(prompt("Ingrese la cantidad personalizada: "));
      msjFinal();
    });
  }
});
