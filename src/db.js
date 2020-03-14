const Pool = require("pg").Pool;
const pool = new Pool({
  user: "freelancer",
  host: "freelancerproject.csglr5v9qttk.eu-west-2.rds.amazonaws.com",
  database: "postgres",
  password: "hashnathbail",
  port: 5432
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users", (error, results) => {
    console.log("sdasdaa");
    if (error) {
      throw error;
    }
    console.log("sdasdasdasdaxa");

    response.status(200).json(results.rows);
  });
};

const getProjects = (request, response) => {
  pool.query("SELECT * FROM jobposting", (error, results) => {
    console.log("Why did the chicken cross the road?");
    if (error) {
      throw error;
    }
    console.log("so he didnt get drafted");

    response.status(200).json(results.rows);
  });
};

const seePost = (request, response) => {
  let jobid = request.query.jobid;
  pool.query(
    "SELECT * FROM jobposting WHERE jobid=$1",
    [jobid],
    (error, results) => {
      console.log("please work");
      if (error) {
        console.log("code didnt work buddy");
        throw error;
      }
      console.log("yh idk");

      response.status(200).json(results.rows);
    }
  );
};

const getProfile = (request, response) => {
  let uid = request.query.uid;
  console.log(uid);
  pool.query(
    "SELECT skill FROM users INNER JOIN usertoskill u ON users.uid = u.uid INNER JOIN skill s ON u.skillid = s.skillid WHERE users.uid=$1",
    [uid],
    (error, results) => {
      console.log("getprofile work check");
      if (error) {
        console.log("straight outta luck tbh broski");
        throw error;
      }
      console.log("past the error mark dudette");

      response.status(200).json(results.rows);
    }
  );
};

const getMessages = (request, response) => {
  let uid = request.query.id;
  console.log(uid);
  pool.query(
    "SELECT *, TO_CHAR(date, 'Dy DDth Mon HH12:MI:SS') AS datecol FROM message m FULL JOIN users u ON m.senderid = u.uid WHERE m.receiverid = $1 ORDER BY datecol",
    [uid],
    (error, results) => {
      console.log("getMessages check");
      if (error) {
        console.log("unlucky bro, maybe next time");
        throw error;
      }
      console.log("You blummin well did it");
      response.status(200).json(results.rows);
    }
  );
};

const sendMessage = (request, response) => {
  let header = request.body.header;
  let content = request.body.content;
  let senderid = request.body.uid;
  let receiverid = request.body.receiverid;
  pool.query(
    "INSERT INTO messages (header, content, senderid, receiverid) VALUES ($1, $2, $3, $4)",
    [header, content, senderid, receiverid],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send({ error: "posting error" });
      } else {
        response.status(201).json(results.row);
      }
    }
  );
};

const makePost = (request, response) => {
  console.log(request.body.title);
  let title = request.body.title;
  let content = request.body.content;
  let pd = request.body.pd;
  let dd = request.body.dd;
  let jobtype = request.body.jobtype;
  let uid = request.body.uid;
  pool.query(
    "INSERT INTO jobposting (title, content, postdate, deadline, jobtype, uid) VALUES ($1, $2, $3, $4, $5, $6)",
    [title, content, pd, dd, jobtype, uid],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send({ error: "posting error" });
      } else {
        response.status(201).json(results.row);
      }
    }
  );
};

const createUser = (request, response) => {
  console.log(request.body.user);
  let user = request.body.user;
  let pass = request.body.pass;
  let email = request.body.email;
  let dob = request.body.dob;
  pool.query(
    "INSERT INTO users (username, password, email, dob) VALUES ($1, $2, $3, $4)",
    [user, pass, email, dob],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send({ error: "user error" });
      } else {
        response.status(201).json(results.row);
      }
    }
  );
};

const searchUser = (request, response) => {
  let user = request.query.id;
  console.log(user)
  pool.query("SELECT * FROM users where uid=$1", [user], (error, results) => {
    console.log("sdasdaa");
    if (error) {
      throw error;
    }
    console.log("sdasdasdasdaxa");

    response.status(200).json(results.rows);
  });
};

const searchProjects = (request, response) => {
  let user = request.query.user;
  let user2 = request.body.user;
  console.log(user);
  console.log(user2);
  pool.query(
    "SELECT uid FROM users WHERE username=$1",
    [user],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rowCount === 0) {
        console.log("unauthorized");
        return response.status(401).json({ error: "User does not exist" });
      }
      let uid = results.rows[0].uid;
      pool.query(
        "SELECT * FROM project WHERE uid=$1",
        [uid],
        (error, results) => {
          if (error) {
            throw error;
          }
          if (results.rowCount === 0) {
            console.log("no projects");
            return response
              .status(402)
              .json({ error: "User does not have any projects." });
          }

          console.log(results.rows[0]);
          response.status(200).json(results.rows);
        }
      );
    }
  );
};

const authUser = (request, response) => {
  console.log(request.query);
  let username = request.query.user;
  let password = request.query.pass;
  pool.query(
    "SELECT * FROM users WHERE username=$1 AND password=$2",
    [username, password],
    (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rowCount === 0) {
        console.log("unauthorized");
        return response
          .status(401)
          .json({ error: "invalid username or password" });
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getUsers,
  searchUser,
  createUser,
  authUser,
  getProjects,
  seePost,
  searchProjects,
  getProfile,
  getMessages,
  makePost,
  sendMessage
};
