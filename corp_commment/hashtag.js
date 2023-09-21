const hashtag_m = (function () {
  const init = function () {};

  const hashtag_markup = function (company_name) {
    const markup =  
      `<button class="button hashtag">
        #${company_name}
      </button>`;

      return markup;
  };

  const hashtag_list = function (companies, company_fn) {
    let hashtag_list = "";
    let company_list = company_fn && company_fn();

    console.log(company_list);

    companies.forEach(function (company_name) {
      hashtag_list += hashtag_markup(company_name);
    });

    return hashtag_list;
  };

  return {
    init,
    hashtag_list
  };
}());