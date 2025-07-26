// Mostrar Aviso
document.getElementById("link-aviso").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("aviso").classList.remove("oculto");
});

// Cerrar aviso
document.getElementById("cerrar-aviso").addEventListener("click", () => {
  document.getElementById("aviso").classList.add("oculto");
});

// Ocultar aviso al navegar
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("aviso").classList.add("oculto");
  });
});

// Animación de perfiles al hacer scroll
const perfiles = document.querySelectorAll('.perfil');

const mostrarPerfiles = () => {
  const triggerBottom = window.innerHeight * 0.85;
  perfiles.forEach(perfil => {
    const perfilTop = perfil.getBoundingClientRect().top;
    if (perfilTop < triggerBottom) {
      perfil.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', mostrarPerfiles);
mostrarPerfiles();

// Animación botón "Comprar ahora"
const ctaButton = document.querySelector('.cta-button');
setInterval(() => {
  ctaButton.classList.add('attention');
  setTimeout(() => ctaButton.classList.remove('attention'), 600);
}, 3000);

// Animación de galería
const itemsGaleria = document.querySelectorAll('.galeria .item');

const mostrarGaleria = () => {
  const triggerBottom = window.innerHeight * 0.85;
  itemsGaleria.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerBottom) {
      item.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', mostrarGaleria);
mostrarGaleria();

const formulario = document.getElementById('formulario-contacto');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  emailjs.sendForm('service_phhdyfh', 'template_mhmsm7x', this)
    .then(function () {
      alert('¡Tu solicitud fue enviada con éxito! 🎉');
      formulario.reset();
    })
    .catch(function (error) {
      alert('Ocurrió un error. Intenta de nuevo más tarde.');
      console.error('Error al enviar:', error);
    });
});

// Carrusel Comentarios / Testimonios con persistencia localStorage
const formTestimonio = document.getElementById('form-testimonio');
const carruselTestimonios = document.getElementById('carrusel-testimonios');
const btnPrev = document.getElementById('prev-testimonio');
const btnNext = document.getElementById('next-testimonio');

let comentarios = [];
let indiceActual = 0;

// Cargar comentarios desde localStorage
const cargarComentarios = () => {
  comentarios = JSON.parse(localStorage.getItem('comentariosTecToys')) || [];
  if (comentarios.length === 0) {
    carruselTestimonios.textContent = 'No hay comentarios aún. ¡Sé el primero en dejar uno!';
  } else {
    indiceActual = 0;
    mostrarComentario(indiceActual);
  }
};

// Mostrar comentario actual
const mostrarComentario = (indice) => {
  if (comentarios.length === 0) {
    carruselTestimonios.textContent = 'No hay comentarios aún. ¡Sé el primero en dejar uno!';
    return;
  }
  carruselTestimonios.textContent = `“${comentarios[indice]}”`;
};

// Guardar comentario nuevo en localStorage
const guardarComentario = (texto) => {
  comentarios.push(texto);
  localStorage.setItem('comentariosTecToys', JSON.stringify(comentarios));
};

// Botones para navegar en el carrusel
btnPrev.addEventListener('click', () => {
  if (comentarios.length === 0) return;
  indiceActual = (indiceActual - 1 + comentarios.length) % comentarios.length;
  mostrarComentario(indiceActual);
});

btnNext.addEventListener('click', () => {
  if (comentarios.length === 0) return;
  indiceActual = (indiceActual + 1) % comentarios.length;
  mostrarComentario(indiceActual);
});

// Manejo del envío de nuevo testimonio
formTestimonio.addEventListener('submit', function(e) {
  e.preventDefault();
  const texto = this['nuevo-testimonio'].value.trim();
  if (texto.length === 0) return;

  guardarComentario(texto);
  indiceActual = comentarios.length - 1;
  mostrarComentario(indiceActual);

  this.reset();
});

// Carga inicial de comentarios al abrir la página
cargarComentarios();
// ... (tu código anterior permanece igual)

// Agrega esta función para avanzar al siguiente comentario automáticamente
const avanzarAutomaticamente = () => {
  if (comentarios.length === 0) return;
  indiceActual = (indiceActual + 1) % comentarios.length;
  mostrarComentario(indiceActual);
};

// Inicia un intervalo para cambiar comentario cada 5 segundos (5000 ms)
let intervaloCarrusel = setInterval(avanzarAutomaticamente, 5000);

// Opcional: si quieres que al usar los botones se "reinicie" el temporizador, agrega esto:

btnPrev.addEventListener('click', () => {
  if (comentarios.length === 0) return;
  indiceActual = (indiceActual - 1 + comentarios.length) % comentarios.length;
  mostrarComentario(indiceActual);
  clearInterval(intervaloCarrusel);
  intervaloCarrusel = setInterval(avanzarAutomaticamente, 5000);
});

btnNext.addEventListener('click', () => {
  if (comentarios.length === 0) return;
  indiceActual = (indiceActual + 1) % comentarios.length;
  mostrarComentario(indiceActual);
  clearInterval(intervaloCarrusel);
  intervaloCarrusel = setInterval(avanzarAutomaticamente, 5000);
});
