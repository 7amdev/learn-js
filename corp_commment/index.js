const APP = (function () {
  const { 
    feedback_list, 
    feedback_vote_click_handler,
    feedback_add
  } = feedback_m;
  const form_el             = document.querySelector('.form');
  const form_textarea_el    = document.querySelector('.form__textarea');
  const form_count_el       = document.querySelector('.form__count');
  const feedbacks_el        = document.querySelector('.feedbacks');
  const hashtag_btn_els     = document.querySelectorAll('.hashtag');
  
  let form_character_limit = 150;
  let feedback_vote_els;
  
  const init = function () {
    console.log('Corpcomment intitialized...');

    // Initialization
    form_count_el.textContent = form_character_limit;
    feedbacks_el.insertAdjacentHTML('beforeend', feedback_list());
    feedback_vote_els = document.querySelectorAll('.feedback__vote');

    // Add event listeners
    form_el.addEventListener('submit', form_submit_handler);
    form_textarea_el.addEventListener('input', form_textarea_input_handler);    
    hashtag_btn_els.forEach(function (hashtag_btn_el) {
      hashtag_btn_el.addEventListener('click', hashtag_click_handler);
    });
    feedback_vote_els.forEach(function (feedback_vote_btn_el) {
      feedback_vote_btn_el.addEventListener('click', feedback_vote_click_handler);
    });
  };

  const form_submit_handler = function (event) {
    event.preventDefault();

    const form_data = new FormData(form_el);
    const company_name_rx = /#[a-z]+/g;
    let new_entry = Object.fromEntries(form_data);
    let company_name = new_entry.message.match(company_name_rx);

    if (!company_name || company_name.length > 1) {
      form_el.classList.remove('form--success');
      form_el.classList.add('form--error');
      return;
    }

    new_entry = {
      ...new_entry,
      votes: 0,
      company: company_name[0].slice(1),
      created_at: Date.now()
    };

    feedbacks_el.insertAdjacentHTML('beforeend', feedback_add(new_entry));

    // POST feedback 
    form_el.classList.add('form--success');
  };

  const form_textarea_input_handler = function (e) {
    const chararacter_length = form_character_limit - parseInt(form_textarea_el.value.length, 10);

    form_count_el.textContent = chararacter_length; 
  };
  
  const hashtag_click_handler = function (e) {
    console.log(e.target.innerText.trim());
  };
  
  document.addEventListener('DOMContentLoaded', init);
}());