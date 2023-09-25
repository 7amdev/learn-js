// GLOBALS
const { fetch_mock } = fetch_mock_m;
const form_el = document.querySelector('.form');
const textarea_el = document.querySelector('.form__textarea');
const form_count_el = document.querySelector('.form__count');
const form_submit_el = document.querySelector('.form__submit');
const feedbacks_el = document.querySelector('.feedbacks');
const spinner_el  = document.querySelector('.spinner');
const characters_limit = 150;

const feedback_append_ui = function (data) {
  const { id, votes, text } = data;
  const company_name = data.company.toUpperCase();
  const initial = data.company.charAt(1).toUpperCase();
  const days_ago = Math.floor((Date.now() - new Date(data.date)) / (1000 * 60 * 60 * 24));

  const markup = (
    `<li tabindex="0" class="feedback" data-id="${id}">
      <button class="upvote">
        <i class="fas fa-sort-up upvote__icon"></i>
        <span class="upvote__count">${votes}</span>
      </button>
      <p class="feedback__initial">${initial}</p>
      <section class="feedback__content">
        <p class="feedback__company">${company_name}</p>
        <p class="feedback__text">
        ${text}
        </p>
      </section>
      <p class="feedback__date">${days_ago < 1 ? 'new' : `${days_ago}d`}</p>
    </li>`
  );

  feedbacks_el.insertAdjacentHTML('beforeend', markup);
};

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
  fetch_mock('http://localhost:5500/feedbacks', { 
    method: 'POST', 
    data: JSON.stringify(feedback)
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (response_data) {

    feedback_append_ui(response_data);

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
fetch_mock('http://localhost:5500/feedbacks')
.then(function (response) {
  return response.json();
})  
.then(function (feedbacks) {
  spinner_el.remove();
  
  feedbacks.forEach(function (feedback) {
    feedback_append_ui(feedback);
  });
})
.catch(function (error) {
  console.log(error);
});

const feedback_click_handler = function (event) {
  const current_el  = event.target;
  const upvote_el   = current_el.closest('.upvote'); // className.includes
  const feedback_el = current_el.closest('.feedback');
  const feedback_id = feedback_el && feedback_el.dataset.id;

  if (!feedback_el) return;

  if (upvote_el) {
    // PUT call
    fetch_mock(`http://localhost:5500/feedbacks/${feedback_id}/upvote`, {
      method: 'PUT'
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (response_data) {
      console.log(response_data);

      // Disable upvote button
      upvote_el.disabled = true;

      // Update upvote__count
      upvote_el.querySelector('.upvote__count').textContent = response_data.votes;

      // Hide .upvote__icon 
      upvote_el.querySelector('.upvote__icon').remove();
    })
    .catch(function (error) {
      console.log(error);
    });

    return;
  }

  feedback_el.classList.toggle('feedback--expand');

  // Inside feedback-item check id the CLICK event source
  // is from the btn.upvote or its child.

  // If so, do upvote actions and unShow the icon 
  // If not, expand feedback item heigth
};

feedbacks_el.addEventListener('click', feedback_click_handler);