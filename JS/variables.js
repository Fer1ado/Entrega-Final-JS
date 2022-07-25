const catalogo = document.querySelector("#disProd");
const carrito = document.querySelector("#VentProd");
const Nprod = document.querySelector("#NProd");
const PrecioFinal = document.querySelector("#PrecioFinal");
const contador1 = document.getElementById("contador1");
const contador2 = document.getElementById("contador2");
const listarProd = document.getElementById("listarProd");
const BtnBuscar = document.getElementById("BtnBuscar");
const listarBusqueda = document.getElementById("listarBusqueda");
const desplegarCarga = document.getElementById("desplegar_formulario");
const botonBorrar = document.getElementById("botonBorrar");
const botonBuscar = document.getElementById("botonBuscar");

const ventasRealizdas = [];
const piezasEnstock = [];
const carroVentas = [];
const stockActualizado = [];


// let client = contentful.createClient({
//   space: "pdorjt8jhfka",
//   accessToken: "zgGp3d5GwhQeteRbVyDxAgL9GuLZQIps4b2BRO_zAgU"
// })

// client.getEntryes().then(pepe(entries){
//   entries.items.forEach(pepe(entry) { console.log(entry.fields.name)
//   }),
// })

class Productos {
  async llamarProductos() {
    try {
      let respuesta = await fetch("../products.json");
      let datos = await respuesta.json();
      let productos = datos.items;
      productos = productos.map((item) => {
        const { nombre, importe, stock, descripcion } = item.fields;
        const { id } = item.sys;
        const imagen = item.fields.image.fields.file.url;
        return { nombre, importe, stock, descripcion, id, imagen };
      });
      return productos;
    } catch (error) {
      console.log(error);
    }
  }
}

class PiezasOfrecidas {
  constructor(id, nombre, stock, importe, descripcion, imagen) {
    this.id = id;
    this.nombre = nombre.toUpperCase();
    this.stock = stock;
    this.importe = importe;
    this.descripcion = descripcion;
    this.imagen = imagen;
  }
}

class Venta {
  constructor(nom, dir, prod, cant, mail, id) {
    this.nom = nom.toLowerCase();
    this.dir = dir.toLowerCase();
    this.prod = prod;
    this.cant = cant;
    this.mail = mail.toLowerCase();
    this.id = id;
  }
}

// SIMIL BASE DE DATOS PARA STOCK DE PRODUCTOS ///

function generadorArray(item) {
  let intento = item;
  intento.forEach((item) => {
    piezasEnstock.push(item);
  });
  let str = JSON.stringify(intento);
  localStorage.setItem("stockDisponible", str);
  location.reload();
}

function GeneradorAutomatico() {
  const piezas = new Productos();
  piezas.llamarProductos().then((productos) => generadorArray(productos));
}

registroEstable();

function registroEstable() {
  let ejecutaUnaVez = localStorage.getItem("chequeo");
  if (ejecutaUnaVez !== "true") {
    localStorage.removeItem("chequeo");
    localStorage.setItem("chequeo", true);
    GeneradorAutomatico();
  } else {
    let registro = JSON.parse(localStorage.getItem("stockDisponible"));
    registro.forEach((item) => {
      piezasEnstock.push(item);
    });
  }
}

function crearID() {
  return parseInt(Math.random() * 1000);
}