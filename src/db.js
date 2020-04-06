const Pool = require("pg").Pool;
const pool = new Pool({
  user: "freelancer",
  host: "freelancerproject.csglr5v9qttk.eu-west-2.rds.amazonaws.com",
  database: "postgres",
  password: "hashnathbail",
  port: 5432,
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

const getUsername = (request, response) => {
  let username = request.body.username;
  pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rowCount === 0) {
        console.log("empty array");
        return response.status(401).json({ error: "User does not exist" });
      }

      console.log("second point");

      response.status(200).json(results.rows);
    }
  );
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

const addFriend = (request, response) => {
  let userid = request.body.friend;
  let friend = request.body.userid;
  pool.query(
    "INSERT INTO friendconnection (userid, friend) VALUES ($1, $2)",
    [friend, userid],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send({ error: "posting error" });
      } else {
        response.status(201).json(results.rows);
      }
    }
  );
};

const getPost = (request, response) => {
  let id = request.query.id;
  console.log(request.body.id)
  console.log(request.query.id)
  pool.query(
    "SELECT * FROM jobposting WHERE jobid=$1",
    [id],
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

const seePost = (request, response) => {
 
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
        "SELECT * FROM jobposting WHERE uid=$1",
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
    "SELECT *, TO_CHAR(date, 'Dy DDth Mon HH12:MI:SS') AS datecol FROM message m FULL JOIN users u ON m.senderid = u.uid WHERE m.receiverid = $1 ORDER BY date DESC",
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
  let senderid = request.body.senderid;
  let receiverid = request.body.receiverid;
  console.log(header, content, senderid, receiverid);
  pool.query(
    "INSERT INTO message (date, header, content, senderid, receiverid) VALUES (current_timestamp, $1, $2, $3, $4)",
    [header, content, senderid, receiverid],
    (error, results) => {
      if (error) {
        console.log(error);
        response
          .status(500)
          .send({ error: "posting error" + request.body.rows });
      } else {
        response.status(201).json(results.row);
      }
    }
  );
};

const makePost = (request, response) => {
  console.log(request);
  let title = request.body.title;
  let content = request.body.content;
  let dd = request.body.dd;
  let jobtype = request.body.jobtype;
  let uid = request.body.uid;
  pool.query(
    "INSERT INTO jobposting (title, content,  deadline, jobtype, uid) VALUES ($1, $2, $3, $4, $5)",
    [title, content, dd, jobtype, uid],
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

const editPost = (request, response) => {
  console.log(request, response);
  let title = request.body;
  let content = request.body.content;
  let dd = request.body.dd;
  let jobtype = request.body.jobtype;
  let uid = request.body.id;
  let jobid = request.body.jobid;
  pool.query(
    // "UPDATE jobposting (title, content, deadline, jobtype) VALUES ($1, $2, $3, $4) WHERE jobid=$5",
    "UPDATE jobposting SET title = $1, content = $2, deadline = $3, jobtype = $4 WHERE jobid=$5",
    [title, content, dd, jobtype, jobid],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send({ error: "editing error" });
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
  console.log(user);
  pool.query("SELECT * FROM users WHERE uid=$1", [user], (error, results) => {
    console.log("sdasdaa");
    if (error) {
      throw error;
    }
    console.log("sdasdasdasdaxa");

    response.status(200).json(results.rows);
  });
};

const getReceiverId = (request, response) => {
  let uid = request.query.id;
  pool.query(
    "SELECT senderid FROM message WHERE receiverid = $1",
    [uid],
    (error, results) => {
      console.log("receiverid check");
      if (error) {
        console.log("well that sucks");
        throw error;
      }
      console.log("yay you haven't messed up yet");
      response.status(200).json(results.rows);
    }
  );
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

const getJob = (request, response) => {
  let pid = request.query.id;
  console.log(pid);
  pool.query(
    "SELECT * FROM project WHERE projectid = $1",
    [pid],
    (error, results) => {
      console.log("receiverid check");
      if (error) {
        console.log("well that sucks");
        throw error;
      }
      console.log("yay you haven't messed up yet");
      response.status(200).json(results.rows);
    }
  );
};

const getFriend = (request, response) => {
  let uid = request.query.id;
  console.log(uid);
  pool.query(
    "SELECT uid, username FROM friendconnection join users u on friendconnection.friend = u.uid where userid=$1",
    [uid],
    (error, results) => {
      console.log("receiverid check");
      if (error) {
        console.log("well that sucks");
        throw error;
      }
      console.log("yay you haven't messed up yet");
      response.status(200).json(results.rows);
    }
  );
};

const getApplication = (request, response) => {
  let appid = request.query.id;
  console.log(appid)
  pool.query(
    "SELECT * FROM application where jobid=$1",
    [appid],
    (error, results) => {
      if (error) {
        console.log("well that sucks");
        throw error;
      }
      console.log("yay you haven't messed up yet");
      response.status(200).json(results.rows);
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


const editUser = (request, response) => {
  console.log("check1")
  let uid = request.body.id;
  let password = request.body.pass;
  let email = request.body.email;
  let description = request.body.description;
  let location = request.body.location;
  let industry = request.body.industry;
  let first = request.body.first;
  let last = request.body.last;
  console.log(uid + password + email + description + location + industry + first + last)
  console.log("ID check: " + email)
  if (password === undefined) {
    pool.query("UPDATE Users SET email= $1, description=$2, location=$3, industry=$4, firstname=$5, lastname=$6 WHERE uid=$7",
      [email, description, location, industry, first, last, uid], (error, results) => {
        console.log("check2");
        if (error) {
          throw error;
        }
        console.log("sdasdasdasdaxa");

        response.status(200).json(results.rows);
      });
  }
  else {
    pool.query("UPDATE Users SET email= $1, description=$2, location=$3, industry=$4, firstname=$5, lastname=$6, password=$7 WHERE uid=$8",
    [email, description, location, industry, first, last,password, uid], (error, results) => {
      console.log("check3");
      if (error) {
        throw error;
      }
      console.log("sdasdasdasdaxa");

      response.status(200).json(results.rows);
    });
  }


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
  sendMessage,
  editUser,
  getReceiverId,
  editPost,
  getPost,
  getUsername,
  getFriend,
  getJob,
  addFriend,
  getApplication,
};
