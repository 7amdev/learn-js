const APP = (function () {
  const { 
    feedback_list, 
    feedback_vote_click_handler,
    feedback_get_unique_company,
    feedback_add
  } = feedback_m;
  const form_el             = document.querySelector('.form');
  const form_textarea_el    = document.querySelector('.form__textarea');
  const form_count_el       = document.querySelector('.form__count');
  const feedbacks_el        = document.querySelector('.feedbacks');
  const hashtags_el         = document.querySelector('.hashtags');
  
  let form_character_limit = 150;
  let feedback_vote_els;
  let hashtag_btn_els;
  let filter = {};
  
  const init = function () {
    console.log('Corpcomment intitialized...');

    // Initialization
    form_count_el.textContent = form_character_limit;

    // Add event listeners
    form_el.addEventListener('submit', form_submit_handler);
    form_textarea_el.addEventListener('input', form_textarea_input_handler);    
 
    // render
    render_feedback_ui();
    render_hashtags_ui();    
  };

  const render_feedback_ui = function () {
    //  Reset List
    feedbacks_el.innerHTML = '';
    feedbacks_el.insertAdjacentHTML('beforeend', feedback_list(filter));

    feedback_vote_els = document.querySelectorAll('.feedback__vote');
    feedback_vote_els.forEach(function (feedback_vote_btn_el) {
      const { has_voted } = feedback_vote_btn_el.dataset;
      if (!(has_voted === 'true')) {
        feedback_vote_btn_el.addEventListener('click', (
          function () {
            return function (event) {
              feedback_vote_click_handler(event);
              render_feedback_ui();
            };
          }()
        ));
      }
    });
  };

  const render_hashtags_ui = function () {
    const companies = feedback_get_unique_company();

    hashtags_el.innerHTML = '';
    hashtags_el.insertAdjacentHTML('beforeend', hashtag_list(companies));

    hashtag_btn_els = document.querySelectorAll('.hashtag');
    hashtag_btn_els.forEach(function (hashtag_btn_el) {
      hashtag_btn_el.addEventListener('click', hashtag_click_handler);
    });
  };
  const hashtag_markup = function (company_name) {
    const markup =  
      `<button class="button hashtag">
        #${company_name}
      </button>`;

      return markup;
  };
  const hashtag_list = function (companies) {
    let hashtag_list = "";

    companies.forEach(function (company_name) {
      hashtag_list += hashtag_markup(company_name);
    });

    return hashtag_list;
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

    const feedback_entry_markup = feedback_add(new_entry);
    render_feedback_ui();
    render_hashtags_ui();

    // POST feedback 
    form_el.classList.add('form--success');
    setTimeout(function () {
      form_el.classList.remove('form--success');
    }, 2000);

    form_el.reset();
    form_textarea_input_handler();
  };

  const form_textarea_input_handler = function (e) {
    const chararacter_length = form_character_limit - parseInt(form_textarea_el.value.length, 10);

    form_count_el.textContent = chararacter_length; 
  };
  
  const hashtag_click_handler = function (e) {
    const current_hashtag_btn  = e.currentTarget;
    const current_hashtag_name = current_hashtag_btn.innerText.trim().slice(1);
    
// for loop made all the difference, since i can RETURN 
// out of the function controlling the execution...

    for (let i = 0; i < hashtag_btn_els.length; i += 1) {
      const hashtag_btn_el = hashtag_btn_els[i];
      if (hashtag_btn_el.classList.contains('button--active')) {
        h_name = hashtag_btn_el.innerText.trim().slice(1);

        if (current_hashtag_name.toLowerCase() === h_name.toLowerCase()) {
          hashtag_btn_el.classList.remove('button--active');
          hashtag_btn_el.blur();

          delete filter.company;
          render_feedback_ui();
          return;
        }

        hashtag_btn_el.classList.remove('button--active');
      }
    }

    if (!current_hashtag_btn.classList.contains('button--active')) {
      current_hashtag_btn.classList.add('button--active');
      filter = {
        ...filter,
        company: current_hashtag_name
      };
    } 
    
    render_feedback_ui();
  };
  
  document.addEventListener('DOMContentLoaded', init);
}());