const COUNTER = (function () {  
  // Variables
  let counter = 0;
  let decrease_btn;
  let increase_btn;
  let reset_btn;
  let counter_el;
  let gopro_el;
  
  // Inits and Event Listeners
  const init = function () {
    decrease_btn  = document.querySelector('.counter__control--decrease');
    increase_btn  = document.querySelector('.counter__control--increase');
    reset_btn     = document.querySelector('.counter__reset');
    counter_el    = document.querySelector('.counter__number');
    gopro_el      = document.querySelector('.counter__gopro');

    // Hide message "Go pro"
    gopro_el.style.visibility = 'hidden'; 

    add_event_listeners();
    update_counter(counter);
  };

  const add_event_listeners = function () {
    decrease_btn.addEventListener('click', decrease_timer_handler);
    increase_btn.addEventListener('click', increase_timer_handler);
    reset_btn.addEventListener('click', reset_timer_handler);;
  };

  const decrease_timer_handler = function () {
    if (counter === 0) return;

    counter = counter - 1;
    update_view(counter);
  };

  const increase_timer_handler = function () {
    if (counter === 5) return;

    counter = counter + 1; 
    update_view(counter);
  };

  const reset_timer_handler = function () {
    counter = 0;
    update_view(counter);
  };

  // Methods
  const update_view = function (new_value) {
    if (counter === 5 && gopro_el.style.visibility === 'hidden') 
      gopro_el.style.visibility = 'visible';
    else if (counter <= 5 && gopro_el.style.visibility === 'visible') 
      gopro_el.style.visibility = 'hidden';
    
    counter_el.innerHTML = new_value;
  }; 

  document.addEventListener('DOMContentLoaded', init);
}());
