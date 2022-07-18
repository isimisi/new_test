function changePassword(email, newPassword, callback) {
  const axios = require("axios");
  const url = "https://api.juristic.io/auth0/change_password";
  const body = {
    email,
    newPassword,
  };

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
