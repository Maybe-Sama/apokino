// Array de rutas a las imágenes de los cartones
const cartones = [
    'images/carton_1.png',
    'images/carton_2.png',
    'images/carton_3.png',
    'images/carton_4.png',
    'images/carton_5.png',
    'images/carton_6.png',
    'images/carton_7.png',
    'images/carton_8.png',
    'images/carton_9.png',
    'images/carton_10.png'
];

let marcado = [];  // Array para almacenar las cartas marcadas

// Función para empezar a jugar
function jugar() {
    const seleccion = document.getElementById('cartonSelect').value;
    const numeroCarton = parseInt(seleccion);

    document.getElementById('seleccionCarton').style.display = 'none';
    document.getElementById('juego').style.display = 'block';

    const imgElement = document.getElementById('cartonImg');
    imgElement.src = cartones[numeroCarton - 1];
    imgElement.style.display = 'block';
    imgElement.onerror = function() {
        console.error('Error al cargar la imagen:', this.src);
        this.alt = 'Error al cargar la imagen';
    };

    const numeroElement = document.getElementById('cartonNumero');
    numeroElement.textContent = 'Cartón N°: ' + numeroCarton;

    marcado = Array(16).fill(false);
    renderCarton();
}

// Función para renderizar el cartón con las cartas marcadas
function renderCarton() {
    const cartonElement = document.getElementById('carton');
    cartonElement.innerHTML = '';  // Limpiar el contenido anterior
    for (let i = 0; i < 16; i++) {  // 16 celdas en el cartón (4x4)
        const carta = document.createElement('div');
        carta.classList.add('carta');
        if (marcado[i]) {
            carta.classList.add('marcado');  // Añadir la clase si la carta está marcada
        }
        carta.addEventListener('click', () => marcarCarta(i));
        cartonElement.appendChild(carta);
    }
}

// Función para marcar o desmarcar una carta
function marcarCarta(index) {
    marcado[index] = !marcado[index];  // Alternar marcado/no marcado
    renderCarton();  // Volver a renderizar el cartón
}

function ajustarTamanoCarton() {
    const img = document.getElementById('cartonImg');
    const container = document.getElementById('cartonContainer');
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    container.style.aspectRatio = aspectRatio;
    const size = Math.min(img.width, img.height);
    container.style.width = size + 'px';
    container.style.height = size + 'px';
}

// Llamar a la función cuando la imagen se cargue
document.getElementById('cartonImg').onload = ajustarTamanoCarton;

// Función para iniciar una partida nueva
function nuevaPartida() {
    marcado = Array(16).fill(false);  // Limpiar las marcas
    renderCarton();
    document.getElementById('cartonSelect').value = "1";  // Resetear selección
    document.getElementById('seleccionCarton').style.display = 'block';
    document.getElementById('juego').style.display = 'none';
}

// Asignar el evento de clic al botón de "Jugar"
document.getElementById('jugarBtn').addEventListener('click', jugar);

// Asignar el evento de clic al botón de "Partida nueva"
document.getElementById('nuevaPartidaBtn').addEventListener('click', nuevaPartida);

// Asegurarse de que todos los elementos están cargados antes de asignar eventos
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('jugarBtn').addEventListener('click', jugar);
    document.getElementById('nuevaPartidaBtn').addEventListener('click', nuevaPartida);
});
