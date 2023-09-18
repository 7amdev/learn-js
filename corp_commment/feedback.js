const FEEDBACK = (function () {
  const init = function () {
    console.log('Initialize Feedback Module...');
  };

  const feedback_vote_click_handler = function () {
    console.log('Vote item clicked....');
  };

  const update_view = function () {
    console.log('Update View....');
  };

  return {
    init,
    feedback_vote_click_handler
  };
}());