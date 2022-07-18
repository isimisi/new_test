function remove(id, callback) {
  const axios = require("axios");
  const url = "https://api.juristic.io/auth0/delete";
  const body = {
    id,
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
