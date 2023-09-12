const COUNTER = (function () {  
  // Variables
  const ACTIONS = Object.freeze({ 
    INCREASE: 'INCREASE', 
    DECREASE: 'DECREASE', 
    RESET: 'RESET',
    LIMIT: 'LIMIT'  
  });
  let counter = 0;
  let counter_container_el;
  let title_el;
  let decrease_btn;
  let increase_btn;
  let reset_btn;
  let counter_el;
  
  // Inits and Event Listeners
  const init = function () {
    counter_container_el = document.querySelector('.counter__container');
    title_el = document.querySelector('.counter__title');
    decrease_btn = document.querySelector('.counter__control--decrease');
    increase_btn = document.querySelector('.counter__control--increase');
    reset_btn = document.querySelector('.counter__reset');
    counter_el = document.querySelector('.counter__value');

    add_event_listeners();
    update_view();
  };

  const add_event_listeners = function () {
    decrease_btn.addEventListener('click', decrease_timer_handler);
    increase_btn.addEventListener('click', increase_timer_handler);
    reset_btn.addEventListener('click', reset_timer_handler);;
  };

  const decrease_timer_handler = function () {
    counter = counter - 1;
    if (counter < 0) counter = 0;

    update_view(ACTIONS.DECREASE);
  };

  const increase_timer_handler = function () {
    counter = counter + 1; 

    if (counter > 5) {
      counter = 5;
      update_view(ACTIONS.LIMIT);
      return;
    }
    
    update_view(ACTIONS.INCREASE);
  };

  const reset_timer_handler = function () {
    counter = 0;
    update_view(ACTIONS.RESET);
  };

  const update_view = function (action) {
    switch (action) {
      case ACTIONS.LIMIT: {
        title_el.innerHTML = 'Limit! Buy <b>Pro</b> for >5';
        decrease_btn.disabled = true;
        increase_btn.disabled = true;
        counter_container_el.classList.add('counter__container--limit');

        break;
      }
      case ACTIONS.RESET: {
        if (decrease_btn.disabled) decrease_btn.disabled = false;
        if (increase_btn.disabled) increase_btn.disabled = false;
        counter_container_el.classList.remove('counter__container--limit');
        title_el.innerHTML = 'Fancy counter';

        break;
      }
    }
    
    counter_el.textContent = counter;
  }; 

  document.addEventListener('DOMContentLoaded', init);
}());
