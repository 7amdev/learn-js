const feedback_m = (function () {
  const feedbacks = [
    {
      id: 1,
      company: "Starbucks",
      votes: 593,
      message: "I really wish #Starbucks would use wrappers for hot drinks as a standart, i keep burning my hands an am tired of bothering the employee.",
      created_at: new Date("2023-09-15T03:24:00")
    },
    {
      id: 2,
      company: "Netflix",
      votes: 422,
      message: "Since yday on mobile #netflix keeps bufferig the video, it keeps happening even when i redownload the app. I'm in an area with decent internet connection.",
      created_at: new Date("2023-09-16T03:24:00")
    },
    {
      id: 3,
      company: "Amazon",
      votes: 593,
      message: "Since yday on mobile #netflix keeps bufferig the video, it keeps happening even when i redownload the app. I'm in an area with decent internet connection.",
      created_at: new Date("2023-09-17T03:24:00")
    }
  ];

  const colors = ['#505da6', '#7550a6', '#508ba6'];
  let color_idx = 0;

  const init = function () {
    console.log('Initialize Feedback Module...');
  };

  const feedback_vote_click_handler = function (event) {
    const vote_btn_el = event.currentTarget;
    const { id } = vote_btn_el.dataset;

    feedbacks.forEach(function (feedback) {
      if (feedback.id === +id) {
        feedback.votes++;
        feedback.has_voted = true;
      }
    });
  };

  const feedback_template = function (data) {
    // @TODO Show/Hide upvote icon id has_voted is set to true
    const date_diff = Date.now() - new Date(data.created_at);
    const date_diff_in_days = Math.floor(date_diff / (1000 * 3600 * 24)); 

    if (color_idx >= colors.length) color_idx = 0;

    const markup = 
      `<section tabindex="0" class="feedback">
        <div class="feedback__container">
          <button class="feedback__vote" data-id="${data.id}" ${data.has_voted ? 'data-has_voted="' + data.has_voted + '"' : ""} >
            ${
              !data.has_voted && 
              '<i class="fas fa-sort-up feedback__upvote"></i>' || 
              ''
            }
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

  const feedback_list = function (filter = {}) {    
    let feedback_list_markup = "";
    let results = [...feedbacks];
    const { company } = filter;

    if (company) {
      results = results.filter(function (result) {
        return result.company.toLowerCase() === company.toLowerCase();
      });
    }
        
    results
      .sort(function (a, b) {
        // Descending order
        if (a.votes > b.votes) return -1;
        else if (a.votes < b.votes) return 1;
        return 0;
      })
      .forEach(function (feedback) {
        feedback_list_markup += feedback_template(feedback);
      });

    return feedback_list_markup;
  };

  const feedback_add = function (new_entry) {
    new_entry.id = feedbacks.reduce(function (acc, curr_value) {
      const { id } = curr_value;

      if (id > acc) acc = id;

       return acc;
    }, 0) + 1;

    feedbacks.push(new_entry);

    return feedback_template(new_entry);
  };

  const feedback_get_unique_company = function () {
    return (
      feedbacks.map(function (feedback) {
        return feedback.company;
      }).filter(function (value, index, array) {
        return array.indexOf(value) === index;
      })
    );
  };

  return {
    init,
    feedback_vote_click_handler,
    feedback_list,
    feedback_get_unique_company,
    feedback_add
  };
}());