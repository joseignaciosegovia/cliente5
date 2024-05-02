import {
	Dish,
  Category,
  Allergen,
  Menu,
  Restaurant,
  Coordinate,
} from './ObjectsRestaurantsManager.js'

const MODEL = Symbol('ShoppingCartModel');
const VIEW = Symbol('ShoppingCartView');
const LOAD_MANAGER_OBJECTS = Symbol('Load Manager Objects');

class Controlador {
  constructor(modelo, vista) {
    this[MODEL] = modelo;
    this[VIEW] = vista;

    // Eventos iniciales del Controlador
    this.onLoad();
    this.onInit();

    // Enlazamos handlers con la vista
    this[VIEW].bindInit(this.handleInit);
  }

  // Método privado para cargar los objetos
  [LOAD_MANAGER_OBJECTS]() {
    const categoria1 = this[MODEL].createCategory("Categoría1", "Descripción1");
    const categoria2 = this[MODEL].createCategory("Categoría2", "Descripción2");
    const categoria3 = this[MODEL].createCategory("Categoría3", "Descripción3");
    this[MODEL].addCategory(categoria1, categoria2, categoria3);
  
    const plato1 = this[MODEL].createDish("Plato1", "Descripción2", ["Ingrediente1", "Ingrediente2"], "ruta3");
    const plato2 = this[MODEL].createDish("Plato2", "Descripción1", ["Ingrediente3", "Ingrediente4"], "ruta1");
    const plato3 = this[MODEL].createDish("Plato3", "Descripción3", ["Ingrediente5", "Ingrediente6"], "ruta2");
    const plato4 = this[MODEL].createDish("Plato4", "Descripción4", ["Ingrediente7", "Ingrediente8"], "ruta4");
    const plato5 = this[MODEL].createDish("Plato5", "Descripción5", ["Ingrediente9", "Ingrediente10"], "ruta5");
    const plato6 = this[MODEL].createDish("Plato6", "Descripción6", ["Ingrediente11", "Ingrediente12"], "ruta6");
    const plato7 = this[MODEL].createDish("Plato7", "Descripción7");
    const plato8 = this[MODEL].createDish("Plato8", "Descripción8");
    const plato9 = this[MODEL].createDish("Plato9", "Descripción9");
    const plato10 = this[MODEL].createDish("Plato10", "Descripción10", ["Ingrediente5", "Ingrediente6"], "ruta10");
    const plato11 = this[MODEL].createDish("Plato11", "Descripción11", ["Ingrediente7", "Ingrediente8"], "ruta11");
    const plato12 = this[MODEL].createDish("Plato12", "Descripción12", ["Ingrediente9", "Ingrediente10"], "ruta12");
    this[MODEL].assignDishToCategory(categoria1, plato1, plato2, plato3, plato4);
    this[MODEL].assignDishToCategory(categoria2, plato5, plato6, plato7, plato8);
    this[MODEL].assignDishToCategory(categoria3, plato9, plato10, plato11, plato12);

    const menu1 = this[MODEL].createMenu("Menu1", "Descripción1");
    const menu2 = this[MODEL].createMenu("Menu2", "Descripción2");
    const menu3 = this[MODEL].createMenu("Menu3", "Descripción3");
    this[MODEL].addMenu(menu1, menu2, menu3);
    this[MODEL].assignDishToMenu(menu1, plato1, plato2, plato3);
    this[MODEL].assignDishToMenu(menu2, plato4, plato5, plato6);
    this[MODEL].assignDishToMenu(menu3, plato7, plato8, plato9);

    const alergeno1 = this[MODEL].createAllergen("Alérgeno1", "Descripción1");
    const alergeno2 = this[MODEL].createAllergen("Alérgeno2", "Descripción2");
    const alergeno3 = this[MODEL].createAllergen("Alérgeno3", "Descripción3");
    const alergeno4 = this[MODEL].createAllergen("Alérgeno4", "Descripción4");
    this[MODEL].addAllergen(alergeno1, alergeno2, alergeno3, alergeno4);
    this[MODEL].assignDishToAllergen(alergeno1, plato1, plato2, plato3);
    this[MODEL].assignDishToAllergen(alergeno2, plato4, plato5, plato6);
    this[MODEL].assignDishToAllergen(alergeno3, plato7, plato8, plato9);
    this[MODEL].assignDishToAllergen(alergeno4, plato10, plato11, plato12);

    const restaurante1 = this[MODEL].createRestaurant("Restaurante1", "Descripción1", new Coordinate("33° 55' 33'' S", "99° 07' 40''"));
    const restaurante2 = this[MODEL].createRestaurant("Restaurante2", "Descripción2", new Coordinate("60° 39' 22'' S", "13° 57' 37''"));
    const restaurante3 = this[MODEL].createRestaurant("Restaurante3", "Descripción3", new Coordinate("22° 46' 17'' S", "75° 37' 22''"));
    this[MODEL].addRestaurant(restaurante1, restaurante2, restaurante3);
  }

  // Se invoca solo una vez y tiene la carga de los datos, los menús y los enlaces de los bind con los manejadores
  onLoad = () => {
    this[LOAD_MANAGER_OBJECTS]();

    this.onMostrarCategorias();
    this.onMostrarCategoriasMenu();
    this.onMostrarAlergenosMenu();
    this.onMostrarMenusMenu();
    this.onMostrarRestaurantesMenu();
    this[VIEW].bindCategoria(this.handleCategoria);
    this[VIEW].bindPlatoAleatorio(this.handlePlato);
    this[VIEW].bindAlergeno(this.handleAlergeno);
    this[VIEW].bindMenu(this.handleMenu);
    this[VIEW].bindRestaurante(this.handleRestaurante);
  };

  // Se invoca al principio y cada vez que pulsemos el botón de inicio
  onInit = () => {
    this.onPlatosAleatorios();
  };

  onMostrarCategorias = () => {
    this[VIEW].mostrarCategorias(this[MODEL].categories);
  };

  onMostrarCategoriasMenu = () => {
    this[VIEW].mostrarCategoriasMenu(this[MODEL].categories);
  };

  onMostrarAlergenosMenu = () => {
    this[VIEW].mostrarAlergenosMenu(this[MODEL].allergens);
  };

  onMostrarMenusMenu = () => {
    this[VIEW].mostrarMenusMenu(this[MODEL].menus);
  };

  onMostrarRestaurantesMenu = () => {
    this[VIEW].mostrarRestaurantesMenu(this[MODEL].restaurants);
  };

  onPlatosAleatorios() {
    const platos = [];
    for (let i = 0; i < 3; i++){
      platos[i] = this[MODEL].getDishes[Math.floor(Math.random() * this[MODEL].getDishes.length)];
    }
    this[VIEW].platosAleatorios(platos);
  }

  handleInit = () => {
    this.onInit();
  };

  // Se ejecuta cada vez que se pincha en una categoría
  handleCategoria = (nombreCategoria) => {
    if (nombreCategoria) {
      const categoriaSeleccionada = this[MODEL].createCategory(nombreCategoria, "");
      // Mostramos los platos de la categoría
      this[VIEW].listarPlatos(categoriaSeleccionada, categoriaSeleccionada.category.name);
      // Ahora que hemos pulsado en una categoría, tenemos que enlazar el método que se ejecutará al pinchar en sus platos
      this[VIEW].bindPlato(this.handlePlato);
    } else {
      throw new Error(`${nombreCategoria} no es el nombre de una categoría.`);
    }
  };

  // Se ejecuta cada vez que se pincha en un alérgeno
  handleAlergeno = (nombreAlergeno) => {
    if (nombreAlergeno) {
      const alergenoSeleccionado = this[MODEL].createAllergen(nombreAlergeno, "");
      // Mostramos los platos del alérgeno
      this[VIEW].listarPlatos(alergenoSeleccionado, nombreAlergeno);
      // Ahora que hemos pulsado en un alérgeno, tenemos que enlazar el método que se ejecutará al pinchar en sus platos
      this[VIEW].bindPlato(this.handlePlato);
    } else {
      throw new Error(`${nombreAlergeno} no es un nombre de un alérgeno.`);
    }
  };

  // Se ejecuta cada vez que se pincha en un menú
  handleMenu = (nombreMenu) => {
    if (nombreMenu) {
      const menuSeleccionado = this[MODEL].createMenu(nombreMenu, "");
      // Mostramos los platos del menú
      this[VIEW].listarPlatos(menuSeleccionado, menuSeleccionado.menu.name);
      // Ahora que hemos pulsado en un menú, tenemos que enlazar el método que se ejecutará al pinchar en sus platos
      this[VIEW].bindPlato(this.handlePlato);
    } else {
      throw new Error(`${nombreMenu} no es un nombre de un menú.`);
    }
  };

  // Se ejecuta cada vez que se pincha en un restaurante
  handleRestaurante = (nombreRestaurante) => {
    if (nombreRestaurante) {
      const restauranteSeleccionado = this[MODEL].createRestaurant(nombreRestaurante, "");
      this[VIEW].mostrarRestaurante(restauranteSeleccionado);
    } else {
      throw new Error(`${nombreRestaurante} no es un nombre de un restaurante.`);
    }
  };

  // Se ejecuta cada vez que se pincha en un plato
  handlePlato = (nombrePlato) => {
    if (nombrePlato) {
      const platoSeleccionado = this[MODEL].createDish(nombrePlato, "", [], "");
      this[VIEW].mostrarPlato(platoSeleccionado);
    } else {
      throw new Error(`${nombrePlato} no es un nombre de un plato.`);
    }
  };
}

export default Controlador;
