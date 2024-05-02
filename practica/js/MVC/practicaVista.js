const EXCECUTE_HANDLER = Symbol('excecuteHandler');
class Vista {
  constructor() {
    this.main = document.getElementsByTagName('main')[0];
    this.menu = document.querySelector('.navbar-nav');
  }

  [EXCECUTE_HANDLER](handler, handlerArguments, scrollElement, data, url, event) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  mostrarCategorias(categorias) {
    this.main.replaceChildren();
    const container = document.createElement('div');
    container.setAttribute("id", "categoria-main");
    for (const categoria of categorias) {
      container.insertAdjacentHTML('beforeend', `<div class="col-lg-3 col-md-6"><a data-categoria="${categoria.category.name}" href="#categories-list">
        <div class="cat-list-text">
          <h3>${categoria.category.name}</h3></a>
        </div>
    </div>`);
    }
	  this.main.append(container);
  }

  // Mostramos las categorías en el menú de categorías
  mostrarCategoriasMenu(categorias) {
    const categoriesListMenu = document.getElementById('categorias-list-menu');
    // Borro el menú de categorías para actualizarlo
    categoriesListMenu.replaceChildren();
    categoriesListMenu.insertAdjacentHTML('beforeend', `<a class="nav-link dropdown-toggle" href="#categories-list" id="navbarDropdown" 
      role="button" data-bs-toggle="dropdown" aria-expanded="false">Categorías</a>
      <ul class="dropdown-menu">`);
    for (const categoria of categorias) {
      categoriesListMenu.insertAdjacentHTML('beforeend', `<li><a class="dropdown-item" href="#categories-list" 
      data-categoria="${categoria.category.name}">${categoria.category.name}</a></li>`);
    }
    categoriesListMenu.insertAdjacentHTML('beforeend', `</ul>`);
  }

  mostrarAlergenosMenu(alergenos) {
    const alergenosListMenu = document.getElementById('alergenos-list-menu');
    // Borro el menú de alérgenos para actualizarlo
    alergenosListMenu.replaceChildren();
    alergenosListMenu.insertAdjacentHTML('beforeend', `<a class="nav-link dropdown-toggle" href="#alergenos-list" id="navbarDropdown2" 
      role="button" data-bs-toggle="dropdown" aria-expanded="false">Alérgenos</a>
      <ul class="dropdown-menu">`);
    for (const alergeno of alergenos) {
      alergenosListMenu.insertAdjacentHTML('beforeend', `<li><a class="dropdown-item" href="#alergenos-list" 
      data-alergeno="${alergeno.allergen.name}">${alergeno.allergen.name}</a></li>`);
    }
    alergenosListMenu.insertAdjacentHTML('beforeend', `</ul>`);
  }

  mostrarMenusMenu(menus) {
    const menusListMenu = document.getElementById('menus-list-menu');
    // Borro el menú de menús para actualizarlo
    menusListMenu.replaceChildren();
    menusListMenu.insertAdjacentHTML('beforeend', `<a class="nav-link dropdown-toggle" href="#menus-list" id="navbarDropdown3" 
      role="button" data-bs-toggle="dropdown" aria-expanded="false">Menús</a>
      <ul class="dropdown-menu">`);
    for (const menu of menus) {
      menusListMenu.insertAdjacentHTML('beforeend', `<li><a class="dropdown-item" href="#menus-list" 
      data-menu="${menu.menu.name}">${menu.menu.name}</a></li>`);
    }
    menusListMenu.insertAdjacentHTML('beforeend', `</ul>`);
  }

  mostrarRestaurantesMenu(restaurantes) {
    const restaurantesListMenu = document.getElementById('restaurantes-list-menu');
    // Borro el menú de restaurantes para actualizarlo
    restaurantesListMenu.replaceChildren();
    restaurantesListMenu.insertAdjacentHTML('beforeend', `<a class="nav-link dropdown-toggle" href="#restaurantes-list" id="navbarDropdown4" 
      role="button" data-bs-toggle="dropdown" aria-expanded="false">Restaurantes</a>
      <ul class="dropdown-menu">`);
    for (const restaurante of restaurantes) {
      restaurantesListMenu.insertAdjacentHTML('beforeend', `<li><a class="dropdown-item" href="#restaurantes-list" 
      data-restaurante="${restaurante.name}">${restaurante.name}</a></li>`);
    }
    restaurantesListMenu.insertAdjacentHTML('beforeend', `</ul>`);
  }

  mostrarRestaurante(restaurante) {
    // Borramos todo el contenido del main excepto el primer hijo (las categorías)
    $("main").children().nextAll().remove();
    const container = document.createElement('div');
    container.setAttribute("id", "restaurante-main");
    container.insertAdjacentHTML('beforeend', `Información del restaurante seleccionado:
    <br/>Nombre: ${restaurante.name}
    <br/>Descripción: ${restaurante.description}
    <br/>Localización: ${restaurante.location}`);
	  this.main.append(container);
  }

  // Recibe un plato y lo muestra en el main
  mostrarPlato(plato) {
    // Borramos todo el contenido del main excepto el primer hijo (las categorías)
    $("main").children().nextAll().remove();
    // Creamos la sección en la que mostraremos el plato
    const container = document.createElement('div');
    container.setAttribute("id", "plato-main");
    // Mostramos la información del plato
    container.insertAdjacentHTML('beforeend', `Información del plato seleccionado:
    <br/>Nombre: ${plato.name}
    <br/>Descripción: ${plato.description}
    <br/>Ingredientes:`);
    for (let i = 0; i < plato.ingredients.length; i++) {
      container.insertAdjacentHTML('beforeend', `<br/>${plato.ingredients[i]}`);
    }
    container.insertAdjacentHTML('beforeend', `<br/>Imagen: ${plato.image}`);
	  this.main.append(container);
  }

  platosAleatorios(platos) {
    this.main.insertAdjacentHTML('beforeend', `<div class="col-lg-3 col-md-6" id="platos-list-aleatorios">`);
    const divPlatosAleatorios = document.getElementById("platos-list-aleatorios");
    for (let i = 0; i < platos.length; i++){
      divPlatosAleatorios.insertAdjacentHTML('beforeend', `<a data-plato="${platos[i].name}" href="#platos-list"><h3>${platos[i].name}</h3></a>`);
    }
    divPlatosAleatorios.insertAdjacentHTML('beforeend', `</div>`);
  }

  listarPlatos(padre, name) {
    // Borramos todo el contenido del main excepto el primer hijo (las categorías)
    $("main").children().nextAll().remove();

    this.main.insertAdjacentHTML('beforeend', `<div class="col-lg-8 d-lg-flex justify-content-around" id="platos">
      </div>`);
    const container = document.getElementById('platos');
    container.classList.add('container');
    container.classList.add('my-3');
    container.insertAdjacentHTML('beforeend', '<div class="row"> </div>');

    const div = document.createElement('div');
    for (const plato of padre.dishes)
      div.insertAdjacentHTML('beforeend', `<div class="col-lg-3 col-md-6">
      <div class="cat-list-text">
        <a data-plato="${plato.name}" href="#platos-list"><h3>${plato.name}</h3></a>
      </div>
    </div>`);
    container.children[0].append(div);
    container.insertAdjacentHTML('afterbegin', `<h1>${name}</h1>`);
    this.main.append(container);
  }

  // Pulsamos en el botón de inicio
  bindInit(handler) {
    document.getElementById('init').addEventListener('click', (event) => {
      this[EXCECUTE_HANDLER](handler, [], 'body', { action: 'init' }, '#', event);
    });
  }

  // Pulsamos una categoría
  bindCategoria(handler) {
    // Cuando pulsamos una categoría del menú
    // Obtenemos todos los enlaces de las categorías del menú
    const navCategorias = document.getElementById('categorias-list-menu');
    const links = navCategorias.querySelectorAll('a');
    // Para cada enlace, definimos qué se ejecutará cuando se pulse
    for (const link of links) {
      link.addEventListener('click', (event) => {
        // Guardamos en "categoria" el atributo personalizado del enlace pinchado (que contiene el nombre de la categoría)
        const { categoria } = event.currentTarget.dataset;
        // Ejecutamos la función privada en la que se ejecutará el manejador con la categoría como argumento
        this[EXCECUTE_HANDLER](
          handler,
          [categoria],
          '#categories-list',
          { action: 'categoria' },
          '#categoria',
          event,
        );
      });
    }

    // Cuando pulsamos una categoría de la zona central
    // Es igual, pero obteniendo los enlaces de las categorías en el main
    const botonCats = document.getElementById('categoria-main');
    const botones = botonCats.querySelectorAll('a');
    for (const boton of botones) {
      boton.addEventListener('click', (event) => {
        const { categoria } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [categoria],
          '#categories-list',
          { action: 'categoria' },
          '#categoria',
          event,
        );
      });
    }
  }

  // Pulsamos en un alérgeno del menú
  bindAlergeno(handler) {
    const navAlergenos = document.getElementById('alergenos-list-menu');
    const links = navAlergenos.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { alergeno } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [alergeno],
          '#alergenos-list',
          { action: 'alergeno' },
          '#alergeno',
          event,
        );
      });
    }
  }

  bindMenu(handler) {
    const navMenus = document.getElementById('menus-list-menu');
    const links = navMenus.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { menu } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [menu],
          '#menus-list',
          { action: 'menu' },
          '#menu',
          event,
        );
      });
    }
  }

  bindRestaurante(handler) {
    const navRestaurantes = document.getElementById('restaurantes-list-menu');
    const links = navRestaurantes.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', (event) => {
        const { restaurante } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [restaurante],
          '#restaurantes-list',
          { action: 'restaurante' },
          '#restaurante',
          event,
        );
      });
    }
  }

  // Pinchamos en un plato aleatorio
  bindPlatoAleatorio(handler) {
    const platosMain = document.getElementById('platos-list-aleatorios');
    const platosAleatorios = platosMain.querySelectorAll('a');
    for (const platoAleatorio of platosAleatorios) {
      platoAleatorio.addEventListener('click', (event) => {
        const { plato } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [plato],
          '#platos-list',
          { action: 'plato' },
          '#plato',
          event,
        );
      });
    }
  }

  // Pinchamos en un plato dentro de una categoría, de un alérgeno o de un menú
  bindPlato(handler){
    const platosCategoria = document.getElementById('platos');
    const platos = platosCategoria.querySelectorAll('a');
    for (const plato of platos) {
      plato.addEventListener('click', (event) => {
        const { plato } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [plato],
          '#platos-list',
          { action: 'platoCategoria' },
          '#platoCategoria',
          event,
        );
      });
    }
  }
}

export default Vista;
