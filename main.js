const carrito = JSON.parse(localStorage.getItem("carrito")) || []

const peliculas = [
    { nombre: "Avatar", precio: 8000 },
    { nombre: "Cenicienta", precio: 8000 },
    { nombre: "Batman", precio: 8000 }
]

const recitales = [
    { nombre: "Gorillaz", precio: 50000 },
    { nombre: "Callejeros", precio: 50000 },
    { nombre: "Coldplay", precio: 50000 }
]

function renderizarTabla(productos, contenedorId) {
    const contenedor = document.getElementById(contenedorId)
    contenedor.innerHTML = ""

    productos.forEach(producto => {
        const fila = document.createElement("tr")
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td><input type="number" id="cantidad${producto.nombre}" min="1" value="1" class="input-cantidad"></td>
            <td><button id="btn${producto.nombre}" class="btn-agregar">Agregar al carrito</button></td>
        `
        contenedor.appendChild(fila)

        document.getElementById(`btn${producto.nombre}`).addEventListener("click", () => {
            const cantidad = parseInt(document.getElementById(`cantidad${producto.nombre}`).value)
            agregarAlCarrito(producto.nombre, producto.precio, cantidad)
        })
    })
}

function agregarAlCarrito(nombre, precio, cantidad) {
    if (cantidad > 0) {
        const existente = carrito.find(item => item.nombre === nombre)
        if (existente) {
            existente.cantidad += cantidad
        } else {
            carrito.push({ nombre, precio, cantidad })
        }
        guardarCarrito()
    }
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito()
    mostrarResumen()
}

function mostrarCarrito() {
    const tbody = document.getElementById("carrito-body")
    tbody.innerHTML = ""

    if (carrito.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4">El carrito está vacío.</td></tr>`
        return
    }

    carrito.forEach((item, index) => {
        const fila = document.createElement("tr")
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>$${item.precio}</td>
            <td>${item.cantidad}</td>
            <td><button id="remove${index}" class="btn-agregar">Eliminar</button></td>
        `
        tbody.appendChild(fila)

        document.getElementById(`remove${index}`).addEventListener("click", () => {
            carrito.splice(index, 1)
            guardarCarrito()
        })
    })
}

function mostrarResumen() {
    const resumen = document.getElementById("resumen")
    if (carrito.length === 0) {
        resumen.textContent = ""
        return
    }

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    const totalEntradas = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    resumen.textContent = `Total de Entradas: ${totalEntradas} | Total a Pagar: $${total}`
}

document.getElementById("btnMostrarCine").addEventListener("click", () => {
    renderizarTabla(peliculas, "peliculas-body")
    document.getElementById("peliculas-section").style.display = "block"
    document.getElementById("recitales-section").style.display = "none"
})

document.getElementById("btnMostrarRecital").addEventListener("click", () => {
    renderizarTabla(recitales, "recitales-body")
    document.getElementById("recitales-section").style.display = "block"
    document.getElementById("peliculas-section").style.display = "none"
})

document.getElementById("btnFinalizarCompra").addEventListener("click", () => {
    const resumen = document.getElementById("resumen")
    const carritoContainer = document.getElementById("carrito-container")
    const finalizarBtn = document.getElementById("btnFinalizarCompra")

    if (carrito.length === 0) {
        resumen.textContent = "El carrito está vacío. Agregá productos antes de finalizar la compra."
    } else {
        const totalEntradas = carrito.reduce((acc, item) => acc + item.cantidad, 0)
        const totalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

        carritoContainer.innerHTML = `<h3>¡Gracias por tu compra!</h3>
            <p>Total de entradas: ${totalEntradas}</p>
            <p>Total a pagar: $${totalPrecio}</p>`

        finalizarBtn.style.display = "none"

        const volverBtn = document.createElement("button")
        volverBtn.textContent = "Volver a Comprar"
        volverBtn.className = "btn-finalizar"
        volverBtn.addEventListener("click", () => location.reload())
        carritoContainer.appendChild(volverBtn)

        localStorage.removeItem("carrito")
        carrito.length = 0
    }
})

mostrarCarrito()
mostrarResumen()
