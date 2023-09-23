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
    form_el.classList.add('form--invalid');
    setTimeout(function () {
      form_el.classList.remove('form--invalid');
    }, 2000);

    form_submit_el.disabled = false;
    textarea_el.focus();
    return;
  }

  form_el.classList.add('form--valid');
  setTimeout(function () {
    form_el.classList.remove('form--valid');
  }, 2000);

    
  const feedback = {
    company_name: company_hashtag.slice(1),
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
