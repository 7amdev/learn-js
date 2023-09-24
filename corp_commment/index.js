// GLOBALS
const feedbacks = []; 
const form_el = document.querySelector('.form');
const textarea_el = document.querySelector('.form__textarea');
const form_count_el = document.querySelector('.form__count');
const form_submit_el = document.querySelector('.form__submit');
const characters_limit = 150;


// COUNTER COMPONENT
const textarea_input_handler = function (event) {
  const textarea_value = textarea_el.value;
  form_count_el.textContent = characters_limit - textarea_value.length;
};

textarea_el.addEventListener('input', textarea_input_handler);

// FORM COMPONENT
const show_form_submit_status = function (form_status) {
  const status = ( 
    form_status === 'valid' 
    ? 'form--valid' 
    : (
      form_status === 'invalid' 
      ? 'form--invalid'
      : ''
    )
  );

  form_el.classList.add(status);
  setTimeout(function () {
    form_el.classList.remove(status);
  }, 2000);
};
const form_submit_handler = function (event) {
  event.preventDefault();

  form_submit_el.disabled = true;

  const textarea_value  = textarea_el.value;
  const company_hashtag = textarea_value.split(' ').find(function (word) {
    return word.includes('#');
  });
  let form_is_valid = true;

  if (textarea_value.length < 5) form_is_valid = false;
  if (!company_hashtag) form_is_valid = false;
  
  if (!form_is_valid) {
    show_form_submit_status('invalid');
  
    form_submit_el.disabled = false;
    textarea_el.focus();
    return;
  }

  show_form_submit_status('valid');
    
  const feedback = {
    company: company_hashtag.slice(1),
    text: textarea_value,
    votes: 0,
    date: Date.now()
  };

  // POST / REGISTER feedback
  feedbacks.push(feedback);

  // Enable Submit button
  form_submit_el.disabled = false;
  // Reset Form 
  form_el.reset();
  // Textarea focus
  textarea_el.focus();
  // Reset conuter
  form_count_el.textContent = characters_limit;

  console.log(feedbacks);

};

form_el.addEventListener('submit', form_submit_handler);