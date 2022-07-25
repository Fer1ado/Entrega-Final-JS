generarCarrito()


function generarCarrito(){
    let carroVentas = JSON.parse(localStorage.getItem("DatosVentas"))
       carroVentas?.forEach(tarj =>{
        let div = document.createElement("div")
        div.className = "card my-4 mx-3 align-items-center rounded"
        div.setAttribute("data-tilt", "")
        div.setAttribute("data-tilt-scale", "1.07")
        div.setAttribute("data-tilt-glare", "")
        div.setAttribute("data-tilt-max-glare", "0.5")
        div.style = "width: 18rem;  box-shadow:3px 3px 20px rgba(0, 0, 0, 0.4);"
            div.innerHTML= `<img src="${tarj.imagen}" class="card-img-top" alt="..."/>
                                <div class="card-body d-flex flex-column align-items-center">
                                    <h5 class="card-title">${tarj.nombre}</h5>
                                    <p class="card-text text-center" style="height: 60px;">${tarj.descripcion}</p>
                                    <h6 class="card-title txtvioleta">$ ${tarj.importe}</h6>
                                    <p>Cantidad de unidades: (falta implementar) </p>
                                </div>
                                <a class="btn btn-warning w-25 m-2 " id="eliminar${tarj.id}"><i class="fa-solid fa-trash-can"></i></a>`
        carrito.appendChild(div)
        
        Nprod.innerText =  carroVentas.length + ` productos`
        contador2.innerText = carroVentas.length

        PrecioFinal.innerText ='Precio Total: $ ' + carroVentas.reduce((total, tarj)=> total + tarj.importe, 0) 

        let eliminar = document.getElementById(`eliminar${tarj.id}`)
        eliminar.addEventListener("click", ()=>{
            eliminar.parentElement.remove()
            let index = carroVentas.findIndex((i) => i.id === tarj.id)
            carroVentas.splice(index,1)
            let str = JSON.stringify(carroVentas)
            localStorage.setItem("DatosVentas", str)
            location.reload()

        })

        let terminarCompra = document.getElementById("FinCompra")
        terminarCompra.addEventListener("click", ()=>{
        compra()
        })

        let vaciarCarrito = document.getElementById("VaciarCarro")
        vaciarCarrito.addEventListener("click", ()=>{
            localStorage.removeItem("DatosVentas")
            location.reload()
            
        })


})
}


