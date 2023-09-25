const fetch_mock_m = (function () {

  const feedbacks = [
    {
      id: 1,
      company: "Starbucks",
      text: "I really wish #Starbucks would use wrappers for hot drinks as a standart, i keep burning my hands an am tired of bothering the employee.",
      votes: 545,
      date: new Date("2023-09-20T00:00:00")
    },
    {
      id: 2,
      company: "Netflix",
      text: "Since yday on mobile #netflix keeps bufferig the video, it keeps happening even when i redownload the app. I'm in an area with decent internet connection",
      votes: 340,
      date: new Date("2023-09-22T00:00:00")
    },
    {
      id: 3,
      company: "Amazon",
      text: "Since yday on mobile #netflix keeps bufferig the video, it keeps happening even when i redownload the app. I'm in an area with decent internet connection",
      votes: 192,
      date: new Date("2023-09-23T00:00:00")
    },
  ];
  
  const fetch_mock = function (url_p, options = {}) {
    const url = url_p && new URL(url_p) || undefined;
    const { method = 'GET' } = options;
    const data = options.data && JSON.parse(options.data) || undefined;
    const pathname = url.pathname.slice(1).split('/');
    const params = pathname.reduce(function (acc, curr_value, index, array) {
      if (index % 2 === 0){
        acc = {
          ...acc, 
          [curr_value]: array[index + 1]
        };
      }
      return acc;
    }, {});
    const action = pathname[pathname.length - 1]; 
  
  
    const json_create = function (response_data) {  
      return function () {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve(response_data);
          }, 1000);
        });
      };
    };
  
    return new Promise(function (resolve, reject) {
      let response;
  
      if (method === 'POST' && !data) 
        reject('Provide data attribute for POST method.');
        // throw new Error('Provide data attribute for POST method.');
  
      if (method === 'GET') {
        let results = [...feedbacks];
        results = results.sort(function (a, b) {
          // descending order
          if (a.votes < b.votes) return 1;
          if (a.votes > b.votes) return -1;
          return 0;
        });
  
        response = {
          status: 200,
          ok: true,
          json: json_create(results)
        };
      }
      
      if (method === 'POST') {
        // Set a new id
        const new_id = feedbacks.map(function (feedback) {
          return feedback.id;
        }).reduce(function (acc, curr_value) {
          if (acc < curr_value) acc = curr_value;
          return acc;
        }, 0) + 1;
  
        // Add new entry into feedbacks
        const new_entry = {
          ...data,
          id: new_id
        };
  
        feedbacks.push(new_entry);
  
        console.log(feedbacks);
  
        // return a response with the new entry including the id
        response = {
          status: 200,
          ok: true,
          json: json_create(new_entry)
        };
      } 
  
      if (method === 'PUT' ) {
        const feedback_id = +params.feedbacks;
        let result;
  
        console.log(feedbacks);
        if (action === 'upvote') {
          result = feedbacks.find(function (feedback) {
            // Mutates [feedbacks], the original item
            if (feedback.id === feedback_id) {
              feedback.votes += 1;
            }
            
            // Return a new array with no linkage to [feedbacks]
            return feedback.id === feedback_id;
          });
        }
      
        response = {
          status: 200,
          ok: true,
          json: json_create(result)
        };
      } 
  
      setTimeout(function () {
        resolve(response);
      }, 1000);
    });
  };
  
  return {
    fetch_mock
  }
})();
