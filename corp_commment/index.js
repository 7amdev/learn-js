// GLOBALS 
const textarea_el = document.querySelector('.form__textarea');
const form_count_el = document.querySelector('.form__count');
const characters_limit = 150;


// COUNTER COMPONENT
const textarea_input_handler = function (event) {
  const text_value = textarea_el.value;
  form_count_el.textContent = characters_limit - text_value.length;
};

textarea_el.addEventListener('input', textarea_input_handler);