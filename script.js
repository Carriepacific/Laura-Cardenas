// Productos de ejemplo
const productos = [
    { id: 1, nombre: "COLLAR LIBELULA ALAMBRISMO", categoria: "collares", precio: 20000, imagen: "https://i.imgur.com/fljogjX.jpeg" },
    { id: 2, nombre: "COLLAR SOL LUXURY", categoria: "collares", precio: 20000, imagen: "https://i.imgur.com/tokQSuc.jpeg" },
    { id: 3, nombre: "COLLAR LLAVE CORALINE", categoria: "collares", precio: 20000, imagen: "https://i.imgur.com/bcpRidy.jpeg" },
    { id: 4, nombre: "COLLAR SOL Y LUNA", categoria: "collares", precio: 20000, imagen: "https://i.imgur.com/EyeLI04.jpeg" },
    { id: 5, nombre: "ARETES COFFEE", categoria: "aretes", precio: 15000, imagen: "https://i.imgur.com/zWbPMtM.jpeg" },
    { id: 6, nombre: "ARETES DADOS", categoria: "aretes", precio: 15000, imagen: "https://i.imgur.com/h4tu2hu.jpeg" },
    { id: 7, nombre: "ARETES ABEJA", categoria: "aretes", precio: 15000, imagen: "https://i.imgur.com/w73Jrvk.jpeg" },
    { id: 8, nombre: "DÚO MANILLAS TEJIDAS", categoria: "manillas", precio: 15000, imagen: "https://i.imgur.com/xi8swOt.jpeg" },
    { id: 9, nombre: "MANILLA GALAXIA", categoria: "manillas", precio: 15000, imagen: "https://i.imgur.com/Tf6gqRJ.jpeg" },
    { id: 10, nombre: "LLAVERO FLOR SUAVE", categoria: "llaveros", precio: 10000, imagen: "https://i.imgur.com/tYzlLA2.jpeg" },
    { id: 11, nombre: "LLAVERO SANRIO CINNAMOROLL", categoria: "llaveros", precio: 10000, imagen: "https://i.imgur.com/yXIhxD8.jpeg" },
    { id: 12, nombre: "Aguacates 2X1", categoria: "descuentos", precio: 15000, imagen: "https://i.imgur.com/kEzGL6r.jpeg" },
];

let carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");
// const filtroSelect = document.getElementById("filtro"); // Ya no lo necesitamos
const mensajeFinal = document.getElementById("mensaje-final");
const mensajeMetodoPago = document.getElementById("mensaje-metodo-pago");
const opcionesPago = document.getElementById("opciones-pago");
// const buscadorInputHeader = document.getElementById("buscador-header"); // Comentamos o eliminamos esta línea
const buscadorInputPanel = document.getElementById("buscador-panel");
const vaciarCarritoBtn = document.querySelector(".carrito .vaciar");
const finalizarCompraBtn = document.querySelector(".carrito .finalizar");
const abrirFiltrosBtn = document.getElementById("abrir-filtros");
const cerrarFiltrosBtn = document.getElementById("cerrar-filtros");
const panelFiltros = document.getElementById("panel-filtros");
const botonesFiltro = document.querySelectorAll(".boton-filtro"); // Seleccionamos los nuevos botones

// Función para buscar productos en el header (puede que no la necesites ahora)
function buscarProductosHeader() {
    // const textoBusqueda = buscadorInputHeader.value.toLowerCase();
    // filtrarYMostrarProductos(textoBusqueda);
}

// Función para buscar productos en el panel de filtros
function buscarProductosPanel() {
    const textoBusqueda = buscadorInputPanel.value.toLowerCase();
    filtrarYMostrarProductos(textoBusqueda);
}

// Función para filtrar y mostrar productos según el texto de búsqueda y el filtro de categoría
function filtrarYMostrarProductos(textoBusqueda = "", filtro = "todos") { // Valor por defecto "todos"
    contenedorProductos.innerHTML = "";
    const filtradosPorCategoria = filtro === "todos" ? productos : productos.filter(p => p.categoria === filtro);

    const resultadosBusqueda = filtradosPorCategoria.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBusqueda)
    );

    if (resultadosBusqueda.length > 0) {
        resultadosBusqueda.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <h4>${producto.nombre}</h4>
                <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 100%; height: auto;" />
                <p>Precio: ${producto.precio.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })}</p>
                <button class="btn-agregar" data-id="${producto.id}">Comprar</button>
            `;
            contenedorProductos.appendChild(div);
        });
    } else {
        contenedorProductos.innerHTML = "<p>No se encontraron productos.</p>";
    }

    // Añadir event listeners a los nuevos botones de "Comprar"
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", function() {
            const id = parseInt(this.dataset.id);
            agregarAlCarrito(id);
        });
    });
}

// Agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const productoEnCarrito = carrito.find(p => p.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;
    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nombre} - ${item.precio.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 })} x ${item.cantidad}
            <button class="cambiar-cantidad" data-id="${item.id}" data-accion="incrementar">+</button>
            <button class="cambiar-cantidad" data-id="${item.id}" data-accion="decrementar">-</button>
        `;
        listaCarrito.appendChild(li);
    });
    totalCarrito.textContent = total.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 });

    // Añadir event listeners a los botones de cambiar cantidad
    const botonesCambiarCantidad = document.querySelectorAll(".cambiar-cantidad");
    botonesCambiarCantidad.forEach(boton => {
        boton.addEventListener("click", function() {
            const id = parseInt(this.dataset.id);
            const accion = this.dataset.accion;
            cambiarCantidad(id, accion === "incrementar" ? 1 : -1);
        });
    });
}

// Cambiar cantidad de producto en el carrito
function cambiarCantidad(id, cantidad) {
    const producto = carrito.find(p => p.id === id);
    if (producto) {
        producto.cantidad += cantidad;
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(p => p.id !== id);
        }
        actualizarCarrito();
    }
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    mensajeFinal.innerHTML = "";
    mensajeFinal.style.display = "none";
    mensajeMetodoPago.innerHTML = "";
    mensajeMetodoPago.style.display = "none";
    document.getElementById("paypal-button-container").style.display = "none";
}

// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        mensajeFinal.textContent = "Tu carrito está vacío. Agrega productos antes de finalizar la compra.";
        mensajeFinal.style.color = "#dc3545";
        mensajeFinal.style.display = "block";
        return;
    }

    // Generar resumen
    let resumen = "Has adquirido:\n";
    carrito.forEach(item => {
        resumen += `- ${item.nombre} (${item.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })}) x ${item.cantidad}\n`;
    });
    resumen += `<span class="total-destacado">Total a pagar: ${totalCarrito.textContent}</span>`; // Envolvemos toda la frase

    // Mostrar resumen
    mensajeFinal.innerHTML = `
        <h3>¡Resumen de tu compra!</h3>
        <pre>${resumen}</pre>
    `;

    mensajeFinal.style.color = "#28a745";
    mensajeFinal.style.display = "block";

    // Botón OK para continuar a métodos de pago
    const btnContinuar = document.createElement("button");
    btnContinuar.textContent = "OK";
    btnContinuar.style.marginTop = "10px";
    btnContinuar.addEventListener("click", mostrarMetodosPago);
    mensajeFinal.appendChild(btnContinuar);

    // Ocultar métodos de pago por si estaban visibles
    mensajeMetodoPago.innerHTML = "";
    mensajeMetodoPago.style.display = "none";
    document.getElementById("paypal-button-container").style.display = "none";
}

function mostrarMetodosPago() {
    // Ocultar resumen
    mensajeFinal.innerHTML = "";
    mensajeFinal.style.display = "none";

    // Mostrar opciones de pago
    mensajeMetodoPago.innerHTML = `
        <h3 style="margin-top: 20px;">¿Cómo deseas pagar?</h3>
        <p><button id="pagar-paypal">Pagar con PayPal</button></p>
        <p><button class="pagar-efectivo">Pagar con Efectivo</button></p>
    `;
    mensajeMetodoPago.style.display = "block";

    // Event listener para el botón de PayPal (se añade aquí porque el botón se crea dinámicamente)
    const pagarPaypalBtn = document.getElementById("pagar-paypal");
    if (pagarPaypalBtn) {
        pagarPaypalBtn.addEventListener("click", pagarConPaypal);
    }

    // Re-attach event listener for the "Pagar en Efectivo" button if it was somehow detached
    const pagarEfectivoBtn = document.querySelector(".pagar-efectivo");
    if (pagarEfectivoBtn) {
        pagarEfectivoBtn.addEventListener("click", pagarConEfectivo);
    }
}

function pagarConPaypal() {
    // Mostrar contenedor de PayPal
    document.getElementById("paypal-button-container").style.display = "block";
}

// PayPal Smart Button
if (window.paypal) {
    paypal
        .Buttons({
            createOrder: function (data, actions) {
                const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: total.toFixed(2)
                            }
                        }
                    ]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    alert(
                        `¡Gracias ${details.payer.name.given_name}, tu pago fue exitoso! 📚`
                    );
                    vaciarCarrito();
                });
            },
            onError: function (err) {
                console.error("Error con PayPal:", err);
                alert("Hubo un problema con el pago. Intenta de nuevo.");
            }
        })
        .render("#paypal-button-container");
}

// Función para pagar con Efectivo
function pagarConEfectivo() {
    let mensaje = `
        <h3>¿Cómo deseas pagar con efectivo?</h3>
        <p><button onclick="redirigirAEfecty()">Pago en Efecty</button></p>
        <p><button onclick="confirmarEfectivo()">Pago contra entrega</button></p>
        <button onclick="cancelarPago()">Cancelar</button>
    `;
    mensajeMetodoPago.innerHTML = mensaje;
}

// Redirigir a Efecty
function redirigirAEfecty() {
    window.location.href = "https://www.efecty.com.co/web/";
}

// Confirmar pago contra entrega
function confirmarEfectivo() {
    let formulario = `
        <h3>Por favor ingresa tus datos para confirmar el pago contra entrega</h3>
        <label for="nombre">Nombre:</label><br>
        <input type="text" id="nombre" placeholder="Nombre"><br>
        <label for="apellido">Apellido:</label><br>
        <input type="text" id="apellido" placeholder="Apellido"><br>
        <label for="cedula">Cédula:</label><br>
        <input type="text" id="cedula" placeholder="Cédula"><br>
        <label for="telefono">Teléfono:</label><br>
        <input type="text" id="telefono" placeholder="Número celular"><br>
        <label for="direccion">Dirección:</label><br>
        <input type="text" id="direccion" placeholder="Dirección"><br>
        <label for="codigo">Código postal:</label><br>
        <input type="text" id="codigo" placeholder="Código postal"><br>
        <button onclick="procesarCompra()">Aceptar</button>
    `;
    mensajeMetodoPago.innerHTML = formulario;
}

// Procesar la compra
function procesarCompra() {
    mensajeMetodoPago.innerHTML = `
        <h3>Procesando tu compra...</h3>
        <p>Cargando...</p>
    `;

    // Simulación de espera de 2 segundos
    setTimeout(() => {
        mensajeMetodoPago.innerHTML = `
            <h3>Pedido realizado con éxito</h3>
            <p>Gracias por tu compra. Tu pedido está listo para ser entregado. Revisa tu correo electrónico para rastrear tu compra.</p>
            <button onclick="reiniciarExperiencia()">Finalizar</button>
        `;
    }, 2000);
}

function reiniciarExperiencia() {
    vaciarCarrito();

    mensajeMetodoPago.innerHTML = `
        <h3>Gracias por tu compra</h3>
        <p>¡Esperamos verte de nuevo pronto!</p>
    `;
    mensajeMetodoPago.style.display = "block";

    // Esperar 3 segundos y reiniciar todo manualmente
    setTimeout(() => {
        // Restaurar UI a estado inicial
        mensajeMetodoPago.innerHTML = "";
        mensajeMetodoPago.style.display = "none";
        mensajeFinal.innerHTML = "";
        mensajeFinal.style.display = "none";
        filtrarYMostrarProductos(); // Recargar productos
    }, 3000);
}

// Cancelar pago
function cancelarPago() {
    mensajeMetodoPago.style.display = "none";
}

abrirFiltrosBtn.addEventListener("click", () => {
    panelFiltros.classList.add("mostrar");
});

cerrarFiltrosBtn.addEventListener("click", () => {
    panelFiltros.classList.remove("mostrar");
});

// Event listeners para los botones de filtro de categoría
botonesFiltro.forEach(boton => {
    boton.addEventListener("click", function() {
        const categoria = this.dataset.categoria; // Obtenemos la categoría del atributo data-categoria
        filtrarYMostrarProductos(buscadorInputPanel.value, categoria); // Llamamos a la función de filtrado con la categoría
        panelFiltros.classList.remove("mostrar"); // Cerramos el panel después de seleccionar una categoría (opcional)
    });
});

// Búsqueda en el panel
buscadorInputPanel.addEventListener("input", buscarProductosPanel);

// Event listeners para los botones del carrito y finalizar compra
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
finalizarCompraBtn.addEventListener("click", finalizarCompra);

// Inicializar la visualización de productos
filtrarYMostrarProductos();
