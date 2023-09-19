const feedback_m = (function () {
  // @todo
  // [] generate random color index

  const feedbacks = [
    {
      company: "Starbucks",
      votes: 593,
      message: "I really wish #Starbucks would use wrappers for hot drinks as a standart, i keep burning my hands an am tired of bothering the employee.",
      created_at: new Date("2023-09-15T03:24:00")
    },
    {
      company: "Netflix",
      votes: 422,
      message: "Since yday on mobile #netflix keeps bufferig the video, it keeps happening even when i redownload the app. I'm in an area with decent internet connection.",
      created_at: new Date("2023-09-16T03:24:00")
    },
    {
      company: "Amazon",
      votes: 310,
      message: "Since yday on mobile #netflix keeps bufferig the video, it keeps happening even when i redownload the app. I'm in an area with decent internet connection.",
      created_at: new Date("2023-09-17T03:24:00")
    }
  ];

  const colors = ['#505da6', '#7550a6', '#508ba6'];
  let feedbacks_ui = [];
  let color_idx = 0;

  const init = function () {
    console.log('Initialize Feedback Module...');
  };

  const feedback_vote_click_handler = function () {
    // @todo

    console.log('Vote item clicked....');
  };

  const feedback_template = function (data) {
    const date_diff = Date.now() - new Date(data.created_at);
    const date_diff_in_days = Math.floor(date_diff / (1000 * 3600 * 24));
    
    // if date_diff < 1 label = new
    if (date_diff_in_days < 1) 

    if (color_idx >= colors.length) color_idx = 0;

    const markup = 
      `<section tabindex="0" class="feedback">
        <div class="feedback__container">
          <button class="feedback__vote">
            <i class="fas fa-sort-up feedback__upvote"></i>
            <span class="feedback__count">${data.votes}</span>
          </button>
          <div class="feedback__initial-bck" style="background-color: ${colors[color_idx++]};">
            <p class="feedback__initial">${data.company.charAt(0).toUpperCase()}</p>
          </div>
          <div class="feedback__message-wrapper">
            <p class="feedback__company">${data.company}</p>
            <p class="feedback__message">${data.message}</p>
          </div>
          <p class="feedback__time">${date_diff_in_days < 1 ? "new": date_diff_in_days + "d"}</p>
        </div>
      </section>`;
    
    return markup;
  };

  const feedback_list = function () {
    feedbacks.forEach(function (feedback) {
      feedbacks_ui.push(feedback_template(feedback));
    });

    return feedbacks_ui.join("");;
  };

  const feedback_add = function (new_entry) {
    feedbacks.push(new_entry);

    return feedback_template(new_entry);
  };

  return {
    init,
    feedback_vote_click_handler,
    feedback_list,
    feedback_add
  };
}());