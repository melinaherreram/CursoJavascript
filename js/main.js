const carrito = JSON.parse(localStorage.getItem("carrito")) || []
let productosCine = []
let productosRecital = []

async function cargarProductos() {
  try {
    const res = await fetch('data/productos.json')
    const data = await res.json()
    productosCine = data.peliculas
    productosRecital = data.recitales
  } catch (error) {
    Toastify({
      text: "Error al cargar los productos.",
      duration: 3000,
      gravity: "bottom",
      position: "center",
      style: { background: "#e63946" }
    }).showToast()
  }
}

cargarProductos()

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
  const btnComprar = document.getElementById("btnComprar")
  if (carrito.length === 0) {
    resumen.textContent = ""
    btnComprar.style.display = "none"
    return
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  const totalEntradas = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  resumen.textContent = `Total de Entradas: ${totalEntradas} | Total a Pagar: $${total}`
  btnComprar.style.display = "inline-block"
}

document.getElementById("btnMostrarCine").addEventListener("click", () => {
  renderizarTabla(productosCine, "peliculas-body")
  document.getElementById("peliculas-section").style.display = "block"
  document.getElementById("recitales-section").style.display = "none"
})

document.getElementById("btnMostrarRecital").addEventListener("click", () => {
  renderizarTabla(productosRecital, "recitales-body")
  document.getElementById("recitales-section").style.display = "block"
  document.getElementById("peliculas-section").style.display = "none"
})

document.getElementById("btnComprar").addEventListener("click", () => {
  window.location.href = "compra.html"
})

mostrarCarrito()
mostrarResumen()
