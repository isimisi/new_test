function addUserMetaData(user, context, callback) {
  const axios = require("axios");

  const url = "https://api.juristic.io/metadata/auth0";
  const body = {
    email: user.email,
    token: configuration.token,
    user_id: user.user_id,
    name: user.name,
  };

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

      context.idToken["https://juristic.io/meta"] = user.user_metadata;

      auth0.users
        .updateUserMetadata(user.user_id, user.user_metadata)
        .then(function() {
          callback(null, user, context);
        })
        .catch(function(err) {
          callback(err);
        });
    })
    .catch((err) => {
      callback(null, user, context);
    });
}
