function verify(email, callback) {
  const axios = require("axios");
  const url = "https://api.juristic.io/auth0/verify";
  const body = { email };

  const options = {
    method: "POST",
    url,
    headers: { "content-type": "application/json" },
    data: body,
  };

  axios(options)
    .then((res) => {
      callback(null, true);
    })
    .catch((err) => {
      callback(err);
    });
}
