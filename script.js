let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showNextSlide() {
  // Desplaza las imágenes
  currentIndex = (currentIndex + 1) % totalSlides;
  const offset = -currentIndex * 100; // Se mueve 100% a la izquierda por cada imagen
  document.querySelector('.carrusel').style.transform = `translateX(${offset}%)`;
}

// Cambiar de imagen cada 3 segundos
setInterval(showNextSlide, 3000);

  // Array para almacenar los productos en el carrito
  let carrito = [];

  // Función para añadir productos al carrito
  function agregarAlCarrito(nombre, precio, imagen) {
    // Crear un objeto del producto
    const producto = {
      nombre: nombre,
      precio: precio,
      imagen: imagen,
      cantidad: 1,
    };

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push(producto);
    }

    // Actualizar la vista del carrito
    actualizarCarrito();
  }

  // Función para eliminar un producto del carrito
  function eliminarProducto(nombre) {
    // Eliminar el producto del carrito
    carrito = carrito.filter(producto => producto.nombre !== nombre);
    actualizarCarrito(); // Actualizar la vista del carrito
  }

  // Función para actualizar la vista del carrito
  function actualizarCarrito() {
    const carritoContainer = document.querySelector('.productos-carrito');
    const totalPrice = document.getElementById('total-price');
    
    carritoContainer.innerHTML = ''; // Limpiar carrito

    let total = 0;

    // Añadir los productos del carrito a la vista
    carrito.forEach(producto => {
      total += producto.precio * producto.cantidad;

      const productoElement = document.createElement('div');
      productoElement.classList.add('producto-carrito');
      productoElement.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div>
          <h4>${producto.nombre}</h4>
          <p>Precio: $${producto.precio}</p>
          <p>Cantidad: ${producto.cantidad}</p>
          <button class="eliminar-btn" data-nombre="${producto.nombre}">Eliminar</button>
        </div>
      `;
      carritoContainer.appendChild(productoElement);
    });

    // Actualizar el total
    totalPrice.textContent = `$${total.toFixed(2)}`;
  }

  // Función para vaciar el carrito
  function vaciarCarrito() {
    carrito = []; // Limpiar el array del carrito
    actualizarCarrito(); // Actualizar la vista del carrito
  }

  // Función para añadir el producto al carrito al hacer clic
  document.addEventListener('DOMContentLoaded', function() {
    // Añadir producto al carrito
    document.querySelectorAll('.btn-comprar').forEach(button => {
      button.addEventListener('click', (event) => {
        const nombre = event.target.getAttribute('data-nombre');
        const precio = parseFloat(event.target.getAttribute('data-precio'));
        const imagen = event.target.getAttribute('data-imagen');

        // Agregar el producto al carrito
        agregarAlCarrito(nombre, precio, imagen);
      });
    });

    // Eliminar producto del carrito
    document.querySelector('.productos-carrito').addEventListener('click', (event) => {
      if (event.target.classList.contains('eliminar-btn')) {
        const nombreProducto = event.target.getAttribute('data-nombre');
        eliminarProducto(nombreProducto);
      }
    });

    // Vaciar carrito cuando se haga clic en el botón
    document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
  });