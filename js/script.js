window.addEventListener('DOMContentLoaded',() => {

// Tabs
// Timer
// Modal
// используем класси для карточек
// slider
// calculator
// forms

const tabs   =  require('./modules/tabs'),
		timer  =  require('./modules/timer'),
		modal  =  require('./modules/modals'),
		cards  =  require('./modules/cards'),
		slider =  require('./modules/slider'),
		calc   =  require('./modules/calc'),
		forms  =  require('./modules/forms');

tabs();
timer();
modal();
cards();
slider();
calc();
forms();

});
