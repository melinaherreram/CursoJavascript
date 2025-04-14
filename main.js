function principal() {
    saludar()

    const tipoEntrada = prompt("¿Querés comprar entradas para un recital o para el cine? (Escribí: recital o cine)")

    let tipoEntradaMinuscula = textoMinuscula(tipoEntrada)

    if (tipoEntradaMinuscula === "cine") {
        mostrarElegirPeliculas()
    } else if (tipoEntradaMinuscula === "recital" ) {
        mostrarElegirBandas()
    } else {
        alert("Opción no válida. Volvé a intentarlo.")
    }
       
}

const saludar = () => {
    let nombre = prompt("¡Bienvenido/a a Tickets Chagal! ¿Cómo te llamás?")
    alert("Hola " + nombre + ", bienvenido/a a Tickets Chagal!")
    }
function textoMinuscula(texto){
    return texto.toLowerCase()
}

function mostrarElegirPeliculas() {
    const peliculas = ["Avatar", "Cenicienta", "Batman"]
    
    // for(let i = 0; i < peliculas.length ; i++){ 
    //     alert("Estas son las películas disponibles: " + peliculas[i])
    // }
    
       
 let peliculaElegida = prompt("Estas son las peliculas deispobiles: " + peliculas[0] + ", " + peliculas[1] + ", " + peliculas[2] + " ¿Cuál queres ver?")
 

let i = 0;
let existePelicula = false

  
 while (i < peliculas.length) {
   if (textoMinuscula(peliculaElegida) === textoMinuscula(peliculas[i])) {
     existePelicula = true;
   }
   i++;
 }

if (existePelicula == true){
    alert("La pelicula que eligió es: " + peliculaElegida)
    mostrarPrecios("cine")
} 
else {
    alert("La película elegida no está disponible.")
}
}

const precioEntradaCine = 8000
const precioEntradaRecital = 50000

function mostrarPrecios(tipoEntrada){
    if(tipoEntrada == "cine"){
      alert("El precio de las entradas es: " + precioEntradaCine )
      const cantidadEntradas = parseInt(prompt("Cuántas entradas querés comprar?"))
      const confirmacion = prompt("El total de las entredes es de: " + calcularPrecio(cantidadEntradas, "cine") + " Para confirmar escribir: Ok")
    if(textoMinuscula(confirmacion) == "ok") { alert("Gracias por comprar en Tickets Chagal!")}
    else {alert("Usted ha cancelado la compra")}
    } else if( tipoEntrada == "recital"){
        {
            alert("El precio de las entradas es: " + precioEntradaRecital )
            const cantidadEntradas = parseInt(prompt("Cuántas entradas querés comprar?"))
            const confirmacion = prompt("El total de las entredes es de: " + calcularPrecio(cantidadEntradas, "recital") + " Para confirmar escribir: Ok")
          if(textoMinuscula(confirmacion) == "ok") { alert("Gracias por comprar en Tickets Chagal!")}
          else {alert("Usted ha cancelado la compra")}
          }
    }
}


function calcularPrecio(cantidadEntradas , tipoEntrada){
    let precioTotal = 0
    if(tipoEntrada == "cine"){
        precioTotal = cantidadEntradas * precioEntradaCine      
      } else if( tipoEntrada == "recital"){
          precioTotal = cantidadEntradas * precioEntradaRecital
      }
      
    return precioTotal
}


function mostrarElegirBandas() {
    const bandas = ["Gorillaz", "Callejeros", "Coldplay"]
    
    
       
 let bandaElegida = prompt("Estas son las bandas deispobiles: " + bandas[0] + ", " + bandas[1] + ", " + bandas[2] + " ¿Cuál queres ver?")
 
 let i = 0;
 let existeBanda = false;
  
 while (i < bandas.length) {
   if (textoMinuscula(bandaElegida) === textoMinuscula(bandas[i])) {
     existeBanda = true;
   }
   i++;
 }



if (existeBanda == true){
    alert("La banda que eligió es: " + bandaElegida)
    mostrarPrecios("recital")
} 
else {
    alert("La banda elegida no está disponible.")
}
}




principal()
