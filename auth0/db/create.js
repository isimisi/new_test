function create(user, callback) {
  const mysql = require("mysql");
  const bcrypt = require("bcrypt");

  const connection = mysql.createConnection({
    host: configuration.DB_HOST,
    user: configuration.DB_USER,
    password: configuration.DB_PASSWORD,
    database: configuration.DB_DATABASE,
  });

  connection.connect();

  const query = "INSERT INTO users SET ?";

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return callback(err);

    const splittedName = user.user_metadata.full_name.split(" ");
    const first_name = splittedName[0];
    const last_name = splittedName[1];

    const insert = {
      password: hash,
      email: user.email,
      status: "need_confirmation",
      first_name,
      last_name,
      employer: user.user_metadata.employer,
      organization_id: 14,
    };

    connection.query(query, insert, (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback();
      callback(null);
    });
  });
}
