function create(user, callback) {
  const axios = require("axios");
  const url = "https://api.juristic.io/auth0/create";
  const body = {
    user,
  };

  const options = {
    method: "POST",
    url,
    headers: { "content-type": "application/json" },
    data: body,
  };

  axios(options)
    .then((res) => {
      callback(null);
    })
    .catch((err) => {
      callback(err);
    });
}
