import aplicacion from './MVC/practicaAplicacion.js';

const historyActions = {
  init: () => {
    aplicacion.handleInit();
  },
  plato: () => aplicacion.handlePlato(),
  categoria: () => aplicacion.handleCategoria(),
  alergeno: () => aplicacion.handleAlergeno(),
  menu: () => aplicacion.handleMenu(),
  restaurante: () => aplicacion.handleRestaurante(),
};

window.addEventListener('popstate', (event) => {
  if (event.state) {
    historyActions[event.state.action](event);
  }
});

history.replaceState({ action: 'init' }, null);
