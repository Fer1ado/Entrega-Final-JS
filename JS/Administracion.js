function visibilidad(id) {
  var e = document.getElementById(id);
  if (e.style.display == "block") e.style.display = "none";
  else e.style.display = "block";
}

desplegarCarga.addEventListener("click", () => {
  visibilidad("formCargaProd");
});

function cargarProducto() {
  let nombreProd = document.getElementById("form_name").value;
  let precioProd = document.getElementById("form_price").value;
  let stockProd = document.querySelector("#form_stock").value;
  let imgProducto = "../assets/fotos_catalogo/placeholder.png";
  let descriProd = document.getElementById("form_description").value;
  piezasEnstock.push(
    new PiezasOfrecidas(
      crearID(),
      nombreProd,
      stockProd,
      precioProd,
      descriProd,
      imgProducto
    )
  );
  let str = JSON.stringify(piezasEnstock);
  localStorage.setItem("stockDisponible", str);
  alert("Producto Agregado!");
}

botonBorrar.addEventListener("click", () => {
  visibilidad("prodAdmin");
});

borrarItems();
function borrarItems() {
  let poblarTabla = JSON.parse(localStorage.getItem("stockDisponible"));
  poblarTabla?.forEach((item) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<tr>
                            <th scope="row">${item.id}</th>
                            <td>${item.nombre}</td>
                            <td>${item.stock} Un</td>
                            <td>$${item.importe}</td>
                            <td id="eliminar${item.id}"><a class="btn btn-warning" ><i class="fa-solid fa-trash-can"</i></a></td>
                            </tr>`;
    listarProd.appendChild(tr);

    let eliminar = document.getElementById(`eliminar${item.id}`);
    eliminar.addEventListener("click", () => {
      eliminar.parentElement.remove();
      let index = poblarTabla.findIndex((i) => i.id === item.id);
      poblarTabla.splice(index, 1);
      let str = JSON.stringify(poblarTabla);
      localStorage.setItem("stockDisponible", str);

      Toastify({
        text: "Item eliminado!",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
          background:
            "radial-gradient(circle, rgba(255,183,16,0.34294269465598737) 0%, rgba(255,183,16,0.9143712660845589) 100%)",
        },
      }).showToast();
    });
  });
}

botonBuscar.addEventListener("click", () => {
  visibilidad("prodList");
});

function buscarProducto() {
  let nom = document.getElementById("busquedaIngresada").value;
  let piezasEnstock = JSON.parse(localStorage.getItem("stockDisponible"));
  let resultado = piezasEnstock.filter((p) =>
    p.nombre.includes(nom.toUpperCase())
  );
  listarBusqueda.innerHTML = "";
  resultado?.forEach((item) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<tr>
                                <th scope="row">${item.id}</th>
                                <td>${item.nombre}</td>
                                <td>${item.stock} Un</td>
                                <td>$${item.importe}</td>
                                </tr>`;
    listarBusqueda.appendChild(tr);
  });
}

