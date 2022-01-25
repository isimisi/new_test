function addUserMetaData(user, context, callback) {
  const axios = require("axios");

  const url = "https://juristic-api-gateway.herokuapp.com/metadata/auth0";
  const body = { email: user.email, token: configuration.token };

  const options = {
    method: "POST",
    url,
    headers: { "content-type": "application/json" },
    data: body,
  };

  const response = axios(options)
    .then((res) => {
      const { user: dbUser, access_token, organization } = res.data;

      user.user_metadata = user.user_metadata || {};
      user.user_metadata = {
        ...user.user_metadata,
        dbUser,
        access_token,
        organization,
      };

      auth0.users
        .updateUserMetadata(user.user_id, user.user_metadata)
        .then(function() {
          console.log("finish");
          callback(null, user, context);
        })
        .catch(function(err) {
          console.log(err);
          callback(err);
        });
    })
    .catch((err) => {
      callback(null, user, context);
    });
}
