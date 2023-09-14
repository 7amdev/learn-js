const APP = (function () {
  let character_count = 0;
  let word_count = 0;
  let twitter_count = 0;
  let facebook_count = 0;
  const text_editor_el      = document.querySelector('.text-editor');
  const word_count_el       = document.querySelector('.stat__word-count');
  const character_count_el  = document.querySelector('.stat__char-count');
  const twitter_count_el    = document.querySelector('.stat__twitter-count');
  const facebook_count_el   = document.querySelector('.stat__fb-count');

  const init = function () {
    text_editor_el.addEventListener('input', text_editor_input_handler);

    twitter_count = parseInt(twitter_count_el.textContent, 10);
    facebook_count = parseInt(facebook_count_el.textContent, 10);

    word_count_el.textContent = character_count;
    character_count_el.textContent = word_count;
  };

  const text_editor_input_handler = function () {
    const content = text_editor_el.value.replace(/\s+/g, ' ');
    const content_words = ( 
      content
        .split(' ')
        .filter(function (value) { 
            return value !== '';
        })
    ); 
    
    character_count = text_editor_el.value.length;
    twitter_count   = 280 - character_count; 
    facebook_count  = 2200 - character_count;
    word_count = content_words.length;
    
    update_view();
  };
  
  const update_view = function () {
    word_count_el.textContent       = word_count;
    character_count_el.textContent  = character_count;
    twitter_count_el.textContent    = twitter_count;
    facebook_count_el.textContent   = facebook_count;

    if (twitter_count < 0) twitter_count_el.classList.add('stat__value--limit');
    else twitter_count_el.classList.remove('stat__value--limit');

    if (facebook_count < 0) facebook_count_el.classList.add('stat__value--limit');
    else facebook_count_el.classList.remove('stat__value--limit');
  
  };

  document.addEventListener('DOMContentLoaded', init)
}()); 

