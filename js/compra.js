const form = document.getElementById("formCompra")
const resumenCompra = document.getElementById("resumenCompra")

const carrito = JSON.parse(localStorage.getItem("carrito")) || []

function calcularTotales() {
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  const totalEntradas = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  return { total, totalEntradas }
}

function mostrarResumenFinal() {
  const { total, totalEntradas } = calcularTotales()

  if (carrito.length === 0) {
    resumenCompra.innerHTML = "<p>No hay entradas seleccionadas.</p>"
    form.style.display = "none"
    return
  }

  let detalle = ""
  carrito.forEach(item => {
    detalle += `<p>${item.cantidad} x ${item.nombre} - $${item.precio * item.cantidad}</p>`
  })

  resumenCompra.innerHTML = `
    <h3>Resumen de Compra</h3>
    ${detalle}
    <p>Total de entradas: ${totalEntradas}</p>
    <p>Total a pagar: $${total}</p>
  `
}

form.addEventListener("submit", function (e) {
  e.preventDefault()

  const nombre = document.getElementById("nombre").value
  const email = document.getElementById("email").value
  const tarjeta = document.getElementById("tarjeta").value
  const vencimiento = document.getElementById("vencimiento").value
  const codigo = document.getElementById("codigo").value

  if (!nombre || !email || !tarjeta || !vencimiento || !codigo) {
    Toastify({
      text: "Por favor, completá todos los campos.",
      duration: 3000,
      gravity: "bottom",
      position: "center",
      style: { background: "#e63946" }
    }).showToast()
    return
  }

  if (tarjeta.replaceAll(" ", "").length !== 16 || isNaN(tarjeta.replaceAll(" ", ""))) {
    Toastify({
      text: "El número de tarjeta debe tener 16 dígitos.",
      duration: 3000,
      gravity: "bottom",
      position: "center",
      style: { background: "#e63946" }
    }).showToast()
    return
  }

  if (vencimiento.length !== 4 || isNaN(vencimiento)) {
    Toastify({
      text: "El vencimiento debe tener el formato MMAA (por ejemplo, 0825).",
      duration: 3000,
      gravity: "bottom",
      position: "center",
      style: { background: "#e63946" }
    }).showToast()
    return
  }

  const mes = parseInt(vencimiento.substring(0, 2))
  if (mes < 1 || mes > 12) {
    Toastify({
      text: "El mes de vencimiento debe estar entre 01 y 12.",
      duration: 3000,
      gravity: "bottom",
      position: "center",
      style: { background: "#e63946" }
    }).showToast()
    return
  }

  if (codigo.length !== 3 || isNaN(codigo)) {
    Toastify({
      text: "El código de seguridad debe tener 3 números.",
      duration: 3000,
      gravity: "bottom",
      position: "center",
      style: { background: "#e63946" }
    }).showToast()
    return
  }

  localStorage.removeItem("carrito")
  form.style.display = "none"

  Swal.fire({
    title: "¡Compra exitosa!",
    text: `Gracias por tu compra, ${nombre}!`,
    icon: "success",
    confirmButtonText: "Volver al inicio"
  }).then(() => {
    window.location.href = "index.html"
  })
})

mostrarResumenFinal()