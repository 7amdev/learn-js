const APP = (function () {
  let form_character_limnit = 150;
  const form_el = document.querySelector('.form');
  const form_textarea_el = document.querySelector('.form__textarea');
  const form_count_el = document.querySelector('.form__count');
  const feedback_vote_el = document.querySelector('.feedback__vote');
  const hashtag_btn_els = document.querySelectorAll('.hashtag');

  const init = function () {
    console.log('Corpcomment intitialized...');
    // Initialization
    form_count_el.textContent = form_character_limnit

    // Add event listeners
    form_el.addEventListener('submit', form_submit_handler);
    form_textarea_el.addEventListener('input', form_textarea_input_handler)
    feedback_vote_el.addEventListener('click', feedback_vote_click_handler);
    hashtag_btn_els.forEach(function (hashtag_btn_el) {
      hashtag_btn_el.addEventListener('click', hashtag_click_handler);
    });
    // implement count-down character
  };

  const form_submit_handler = function (e) {
    e.preventDefault();

    console.log('Form has been submitted...');
  };

  const form_textarea_input_handler = function (e) {
    form_count_el.textContent = form_character_limnit - parseInt(form_textarea_el.value.length, 10);
  };

  const feedback_vote_click_handler = function () {
    console.log('Vote item clicked....');
  };

  const hashtag_click_handler = function (e) {
    console.log(e.target.innerText.trim());
  };
  
  document.addEventListener('DOMContentLoaded', init);
}());