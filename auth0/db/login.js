function login(email, password, callback) {
  const axios = require("axios");
  const url = "https://api.juristic.io/auth0/login";
  const body = {
    email,
    password,
  };

  const options = {
    method: "POST",
    url,
    headers: { "content-type": "application/json" },
    data: body,
  };

  axios(options)
    .then((res) => {
      const user = res.data;

      callback(null, {
        user_id: user.id.toString(),
        email: user.email,
      });
    })
    .catch((err) => {
      callback(err);
    });
}
