# Tickets Chagal

Este es el proyecto final para el curso de **JavaScript en Coderhouse**. Simula una experiencia de compra de entradas para cine o recital, utilizando HTML, CSS y JavaScript.

## 💡 Funcionalidades

- Visualización dinámica de películas y recitales usando `fetch()` desde un archivo `.json`
- Agregado y eliminación de entradas al carrito
- Cálculo del total de entradas y monto a pagar
- Guardado del carrito en `localStorage` para mantener datos al recargar
- Simulación del proceso de compra con formulario (nombre, email y datos de tarjeta)
- Validación de campos con mensajes de error
- Librerías utilizadas:
  - [SweetAlert2](https://sweetalert2.github.io/)
  - [ToastifyJS](https://apvarun.github.io/toastify-js/)

## Instrucciones de uso

1. **Elegí el tipo de entrada**  
   Al ingresar, vas a ver dos botones:
   - **PELICULAS**
   - **RECITALES**  
   Hacé click en uno para ver las opciones disponibles.

2. **Agregá productos al carrito**  
   Cada película o recital tiene un campo para elegir la cantidad y un botón para agregar al carrito.

3. **Revisá el carrito**  
   Más abajo vas a ver una tabla con lo que agregaste: productos, precios, cantidades y un botón para eliminar si te arrepentís.

4. **Confirmá la compra**  
   Cuando tengas todo listo, hacé clic en el botón **"Comprar"** para pasar a la siguiente pantalla.

5. **Completá tus datos**  
   Ingresá:
   - Nombre completo
   - Email
   - Número de tarjeta (16 dígitos)
   - Vencimiento (MMAA)
   - Código de seguridad (3 dígitos)

6. **Finalizá la compra**  
   Si todo está correcto, vas a ver una confirmación con un mensaje de éxito. Desde ahí podés volver al inicio.
