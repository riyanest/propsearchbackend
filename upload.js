const axios = require("axios");

axios
  .post("http://loacalhost:5000/", {
    todo: "Buy the milk"
  })
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });
