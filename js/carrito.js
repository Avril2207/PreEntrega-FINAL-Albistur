
//VARIABLES DOM
const carritoMostrar = document.querySelector(".icon-cart");
const containerCartProducts = document.querySelector(".container-cart-products");
const listaProductos = document.getElementById("seccion_productos");
const productosEnCarrito = document.querySelector('.row-product');
let totalAPagar = document.getElementById('total-pagar');
const CARRITO = JSON.parse(localStorage.getItem("carrito")) || []; 


//FUNCIONES-----------------------------------------------
//PARA GUARDAR EL CARRITO EN EL STORAGE
const guardarStorage = (carrito) =>{
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
//PARA SUMAR EL TOTAL-------------------------------------
const sumarTotal = () =>{
    let total = 0;
    CARRITO.forEach(producto => {
        let precio = (parseInt(producto.precio.slice(1))) * producto.cantidad;
        total += precio
    });
    totalAPagar.innerText = `$${total}`;
}

//PARA AGREGAR ELEMENTOS AL CARRITO--------------------------------------------------------------
const agregarAlCarrito = () =>{
    productosEnCarrito.innerHTML = ""; //para limpiar el HTML
    
        CARRITO.forEach(producto => {
        const containerProduct = document.createElement('div');//para crear un div con cada elemento nuevo en el carrito
        containerProduct.classList.add('productos-carrito')

        containerProduct.innerHTML = `
        <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${producto.cantidad}</span>
            <p class="nombre-producto-carrito">${ producto.nombre}</p>
            <span class="precio-producto-carrito">${producto.precio}</span>
        </div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon-close"
            id = ${producto.id}
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    `
    productosEnCarrito.append(containerProduct);
    guardarStorage(CARRITO);
    sumarTotal();
    });


};

//PARA ELIMINAR PRODUCTO DEL CARRITO------------------------------------------------
const eliminarProducto = (productoId) => { // Recibe el ID del producto a eliminar
    const index = CARRITO.findIndex(item => item.id === productoId);
    index !== 1 && CARRITO.splice(index, 1);
        guardarStorage(CARRITO);
        agregarAlCarrito();
        sumarTotal(); 
};


//FIN DE LAS FUNCIONES //////////////////////////////////////////////////////////////

//Ttraer el carrito del storage en caso de existir
CARRITO && agregarAlCarrito();

//Para mostrar el carrito
carritoMostrar.addEventListener('click', ()=>{//para mostrar y esconder el carrito
    containerCartProducts.classList.toggle("hidden-cart")
});
//////////////////////////////////////////////////////////////////////////
//para que c/vez que se agrege un producto este aparezca en el carrito
listaProductos.addEventListener('click', e => {
    
    if (e.target.classList.contains('card-boton')){
        Toastify({
            text: "PRODUCTO AÑADIDO AL CARRITO",
            duration: 3000,
            close: true,
            gravity:"bottom",
            style: {
                background: "#D9B2A9"
            }
          }).showToast();

          const id = e.target.parentElement.querySelector('button').id;
          const productosEnCarrito = CARRITO.find(producto => producto.id === id);

          if (productosEnCarrito == undefined){
            const producto = e.target.parentElement;
            let infoProducto = {
                cantidad: 1,
                nombre: producto.querySelector('p').textContent,
                precio: producto.querySelector('h1').innerText,
                id: producto.querySelector('button').id
          }
            CARRITO.push(infoProducto);
        }else{
            const indexProductoCarrito = CARRITO.findIndex((producto) => producto.id == id);
            CARRITO[indexProductoCarrito].cantidad++;
        }
        agregarAlCarrito();
    }
})
////////////////////////////////////////////////////////////////////////

//Para eliminar producto
productosEnCarrito.addEventListener('click', (e)=>{
    if (e.target.classList.contains('icon-close')){
        const productoElementoPadre = e.target.parentElement.querySelector('svg').id
        eliminarProducto(productoElementoPadre);
    };
})

