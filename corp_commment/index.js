// GLOBALS
const form_el = document.querySelector('.form');
const textarea_el = document.querySelector('.form__textarea');
const form_count_el = document.querySelector('.form__count');
const form_submit_el = document.querySelector('.form__submit');
const feedbacks_el = document.querySelector('.feedbacks');
const spinner_el  = document.querySelector('.spinner');
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
  fetch_mock('./feedbacks', { 
    method: 'POST', 
    data: JSON.stringify(feedback)
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (response_data) {
    const feedback_markup = 
      `<li tabindex="0" class="feedback">
          <button class="upvote">
            <i class="fas fa-sort-up upvote__icon"></i>
            <span class="upvote__count">${response_data.votes}</span>
          </button>
          <p class="feedback__initial">${response_data.company.charAt(1).toUpperCase()}</p>
          <section class="feedback__content">
            <p class="feedback__company">${response_data.company.toUpperCase()}</p>
            <p class="feedback__text">
            ${response_data.text}
            </p>
          </section>
          <p class="feedback__date">new</p>
        </li>`;

      feedbacks_el.insertAdjacentHTML('beforeend', feedback_markup);

      // Enable Submit button
      form_submit_el.disabled = false;
      // Reset Form 
      form_el.reset();
      // Textarea focus
      textarea_el.focus();
      // Reset conuter
      form_count_el.textContent = characters_limit;
  })
  .catch(function (error) {
    console.log(error);
  });
};

form_el.addEventListener('submit', form_submit_handler);

// FEEDBACK-LIST COMPONENT
fetch_mock('./feedbacks')
.then(function (response) {
  return response.json();
})  
.then(function (feedbacks) {
  spinner_el.remove();
  
  feedbacks.forEach(function (feedback) {
    const days_ago = Math.floor((Date.now() - new Date(feedback.date)) / (1000 * 60 * 60 * 24));
    
    const feedback_markup = 
      `<li tabindex="0" class="feedback">
          <button class="upvote">
            <i class="fas fa-sort-up upvote__icon"></i>
            <span class="upvote__count">${feedback.votes}</span>
          </button>
          <p class="feedback__initial">${feedback.company.charAt(1).toUpperCase()}</p>
          <section class="feedback__content">
            <p class="feedback__company">${feedback.company.toUpperCase()}</p>
            <p class="feedback__text">
            ${feedback.text}
            </p>
          </section>
          <p class="feedback__date">${days_ago < 1 ? 'new' : days_ago}d</p>
        </li>`;

    feedbacks_el.insertAdjacentHTML('beforeend', feedback_markup);
  });
})
.catch(function (error) {
  console.log(error);
});
