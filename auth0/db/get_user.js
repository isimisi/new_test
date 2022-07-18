function getByEmail(email, callback) {
  const axios = require("axios");
  const url = "https://api.juristic.io/auth0/get_user";
  const body = {
    email,
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

      if (!user.id) {
        return callback(null);
      }

      callback(null, {
        user_id: user.id.toString(),
        email: user.email,
      });
    })
    .catch((err) => {
      callback(new WrongUsernameOrPasswordError(email));
    });
}
