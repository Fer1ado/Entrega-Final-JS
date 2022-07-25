


mostrarCatalogo()

function mostrarCatalogo(){
    piezasEnstock.forEach(tarj =>{
        let div = document.createElement("div")
        div.className = "tarjeta card my-4 mx-3 pepe"
        div.setAttribute("data-tilt", "")
        div.setAttribute("data-tilt-scale", "1.07")
        div.setAttribute("data-tilt-glare", "")
        div.setAttribute("data-tilt-max-glare", "0.5")
        div.style = "width: 18rem; box-shadow: rgba(0, 0, 0, 0.4) 3px 3px 20px; transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);"
        div.innerHTML = `
                            <img src="${tarj.imagen}" class="card-img-top" alt="..."/>
                                <div class="card-body d-flex flex-column align-items-center">
                                    <h5 class="card-title">${tarj.nombre}</h5>
                                    <p class="card-text text-center" style="height: 60px; transform: translateZ(30px);"> ${tarj.descripcion} </p>
                                    <h6 class="card-title txtvioleta">$ ${tarj.importe}</h6>
                                    <p>stock: ${tarj.stock} unidades </p>
                                    <a id="btnAgr${tarj.id}" class="btn btn-primary text-white">Agregar al Carrito</a>
                                </div>
                        `
        catalogo.appendChild(div)

let sumaCarro = document.getElementById(`btnAgr${tarj.id}`)
sumaCarro.addEventListener("click", ()=>{cargarCarro(tarj.id)}) //FALTA COMPLETAR EL AJUSTE DE STOCK

})
}

function cargarCarro(id){
    let agregarProducto = piezasEnstock.find(prod=> prod.id === id)
    carroVentas.push(agregarProducto)
        let str = JSON.stringify(carroVentas)
        localStorage.setItem("DatosVentas", str)
        actualizarNro()
       
        Toastify({
            text: "Producto Agregado!",
            duration: 3000,
            gravity: "bottom", 
            position: "right", 
            style: {
            background: "radial-gradient(circle, rgba(0,105,217,0.4773964761685925) 0%, rgba(0,105,217,1) 100%)",
            },
            }).showToast();   
}



actualizarNro()

function actualizarNro(){
    let contadorItems = JSON.parse(localStorage.getItem("DatosVentas")) 
    if(contadorItems===null) {
        contador1.innerText="0"
    }else{contador1.innerText = `${contadorItems?.length}`}
}
