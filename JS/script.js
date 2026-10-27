const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#movieSearch");
const movieCards = document.querySelectorAll("[data-movie]");
const collectionButton = document.querySelector("#collectionButton");
const drawer = document.querySelector("#navbarDrawer");

// Filtra las tarjetas por el título o género que escriba la persona.
searchForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const query = searchInput.value.trim().toLocaleLowerCase("es");

    movieCards.forEach((card) => {
		const matches = card.textContent.toLocaleLowerCase("es").includes(query);
        card.hidden = query !== "" && !matches;
    });

    // Si se busca desde el panel móvil, lo cerramos al enviar.
    if (drawer && typeof drawer.close === "function" && drawer.open) {
        drawer.close();
    }
});

// Al borrar el texto, se vuelven a mostrar todas las películas.
searchInput.addEventListener("input", () => {
	if (searchInput.value.trim() === "") {
    	movieCards.forEach((card) => {
        	card.hidden = false;
        });
    }
});

// Mensaje provisional: la colección aún no se guarda en una base de datos.
collectionButton.addEventListener("click", () => {
	alert("La función «Mi colección» todavía no está conectada a un sistema de usuarios ni a una base de datos.");
});

// Las fichas aún no tienen páginas de detalle; se informa claramente.
document.querySelectorAll(".movie-details").forEach((button) => {
	button.addEventListener("click", () => {
		alert(`La ficha de «${button.dataset.title}» todavía no está implementada.`);
	});
});

// Cierra el panel después de elegir una sección del menú en móvil.
drawer.querySelectorAll('a[href^="#"]').forEach((link) => {
	link.addEventListener("click", () => {
    	if (window.matchMedia("(width < 992px)").matches && drawer.open) {
        	drawer.close();
		}
	});
});