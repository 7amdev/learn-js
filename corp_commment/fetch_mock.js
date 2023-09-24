const fetch_mock = function (url, options = {}) {
  const { method = 'GET' } = options;
  const data = options.data && JSON.parse(options.data) || undefined;

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
      response = {
        status: 200,
        ok: true,
        json: json_create(feedbacks)
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

      // return a response with the new entry including the id
      response = {
        status: 200,
        ok: true,
        json: json_create(new_entry)
      };
    } 

    setTimeout(function () {
      resolve(response);
    }, 1000);
  });
};
