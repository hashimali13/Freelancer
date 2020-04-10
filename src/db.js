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

const searchBarUser = (request, response) => {
  let search = request.body.search;
  let search1 = "%" + search + "%";
  console.log(search1);
  pool.query(
    "SELECT * FROM users WHERE username LIKE $1 OR description LIKE $1 OR email LIKE $1 OR email LIKE $1 OR industry LIKE $1 OR languages LIKE $1",
    [search1],
    (error, results) => {
      if (error) {
        throw error;
        console.log(results.rows);
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

const searchBarPost = (request, response) => {
  let search = request.body.search;
  let search1 = "%" + search + "%";
  console.log(search1);
  pool.query(
    "SELECT * FROM jobposting WHERE title LIKE $1 OR content $1 OR jobtype LIKE $1",
    [search1],
    (error, results) => {
      if (error) {
        throw error;
        console.log(results.rows);
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

const getUsername = (request, response) => {
  let username = request.body.username;
  let username1 = "%" + username + "%";
  console.log(username1);
  pool.query(
    "SELECT * FROM users WHERE username LIKE $1",
    [username1],
    (error, results) => {
      if (error) {
        throw error;
        console.log(results.rows);
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
  console.log(request.body.id);
  console.log(request.query.id);
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
  let title = request.body.title;
  let content = request.body.content;
  let dd = request.body.dd;
  let jobtype = request.body.jobtype;
  //let uid = request.body.id;
  let jobid = request.body.jobid;
  pool.query(
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

const deletePost = (request, response) => {
  console.log("delete post called in db.js");
  let jobid = request.body.jobid;
  pool.query(
    "DELETE FROM jobposting WHERE jobid= $1",
    [jobid],
    (error, results) => {
      if (error) {
        console.log("error in deletepost call");
        throw error;
      }
      console.log("have you tried setting it to wumbo, i.e. success brotha");
      response.status(200).json(results.row);
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

const getFriends = (request, response) => {
  let userid = request.query.user;
  console.log(userid);
  pool.query(
    "SELECT * FROM friendconnection f FULL JOIN users u ON f.friend = u.uid WHERE f.userid = $1",
    [userid],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rowCount === 0) {
        console.log("no friends");
        return response.status(401).json({ error: "No friends on list" });
      }
      response.status(200).json(results.rows);
      console.log(results.rows);
    }
  );
};

const getPostedProjects = (request, response) => {
  let pid = request.query.id;
  pool.query(
    "SELECT * FROM project WHERE pid = $1",
    [pid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
      console.log(results.rows);
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
  console.log(appid);
  pool.query(
    "SELECT * FROM application join users u on application.uid = u.uid where jobid=$1",
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

const createApplication = (request, response) => {
  let uid = request.body.uid;
  let username = request.body.username;
  let cv = request.body.cv;
  let content = request.body.content;
  let jobid = request.body.jobid;
  console.log(uid, username, cv, content, jobid);
  pool.query(
    "INSERT INTO application (uid, username, cv, content, jobid) VALUES ($1, $2, $3, $4, $5)",
    [uid, username, cv, content, jobid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createComment = (request, response) => {
  let uid = request.body.uid;
  let date = request.body.date;
  let cid = request.body.cid;
  let comment = request.body.comment;
  pool.query(
    "INSERT INTO comments (uid, date, pid, content) VALUES ($1, $2, $3, $4)",
    [uid, date, cid, comment],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createUpdate = (request, response) => {
  let uid = request.body.uid;
  let date = request.body.date;
  let jid = request.body.jid;
  let content = request.body.content;
  pool.query(
    "INSERT INTO jobupdates (uid, postdate, jid, content) VALUES ($1, $2, $3, $4)",
    [uid, date, jid, content],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};


const getComments = (request, response) => {
  let postid = request.query.id;
  console.log(postid);
  pool.query(
    "SELECT * from comments join users u on comments.uid = u.uid where  pid=$1",
    [postid],
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

const getUpdates = (request, response) => {
  let updateid = request.query.id;
  pool.query(
    "SELECT * from jobupdates join users u on jobupdates.uid = u.uid where  jid=$1 ORDER BY postdate DESC",
    [updateid],
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

const getFiles = (request, response) => {
  let projectid = request.query.id;
  pool.query(
    "SELECT * from files where  projectid=$1",
    [projectid],
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

const deleteApplication = (request, response) => {
  let postid = request.body.id;
  console.log(postid);
  pool.query(
    "DELETE from application  where  appid=$1",
    [postid],
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

const deleteFromDb = (request, response) => {
  let key = request.body.key;
  pool.query("DELETE from files  where  key=$1", [key], (error, results) => {
    if (error) {
      console.log("well that sucks");
      throw error;
    }
    console.log("yay you haven't messed up yet");
    response.status(200).json(results.rows);
  });
};

const deleteAllApplications = (request, response) => {
  let postid = request.body.id;
  console.log(postid);
  pool.query(
    "DELETE from application  where  jobid=$1",
    [postid],
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

const deleteAllComments = (request, response) => {
  let postid = request.body.id;
  console.log(postid);
  pool.query(
    "DELETE from comments  where  pid=$1",
    [postid],
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

const createJob = (request, response) => {
  let uid = request.body.uid;
  let deadline = request.body.deadline;
  let deliverables = request.body.deliverables;
  let jobtype = request.body.jobtype;
  let title = request.body.title;
  let postdate = request.body.postdate;
  let pid = request.body.pid;
  pool.query(
    "INSERT INTO project (uid, deadline, deliverables, jobtype,title,postdate,pid) VALUES ($1, $2, $3, $4, $5,$6,$7)",
    [uid, deadline, deliverables, jobtype, title, postdate, pid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const postFile = (request, response) => {
  let projectid = request.body.projectid;
  let location = request.body.location;
  let key = request.body.key;
  let title = request.body.title;
  pool.query(
    "INSERT INTO files (projectid, location, key, title) VALUES ($1, $2, $3, $4)",
    [projectid, location, key, title],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const editUser = (request, response) => {
  console.log("check1");
  let uid = request.body.id;
  let password = request.body.pass;
  let email = request.body.email;
  let description = request.body.description;
  let location = request.body.location;
  let industry = request.body.industry;
  let first = request.body.first;
  let last = request.body.last;
  console.log(
    uid + password + email + description + location + industry + first + last
  );
  console.log("ID check: " + email);
  if (password === undefined) {
    pool.query(
      "UPDATE Users SET email= $1, description=$2, location=$3, industry=$4, firstname=$5, lastname=$6 WHERE uid=$7",
      [email, description, location, industry, first, last, uid],
      (error, results) => {
        console.log("check2");
        if (error) {
          throw error;
        }
        console.log("sdasdasdasdaxa");

        response.status(200).json(results.rows);
      }
    );
  } else {
    pool.query(
      "UPDATE Users SET email= $1, description=$2, location=$3, industry=$4, firstname=$5, lastname=$6, password=$7 WHERE uid=$8",
      [email, description, location, industry, first, last, password, uid],
      (error, results) => {
        console.log("check3");
        if (error) {
          throw error;
        }
        console.log("sdasdasdasdaxa");

        response.status(200).json(results.rows);
      }
    );
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
  createUpdate,
  getJob,
  addFriend,
  getFriends,
  getComments,
  getUpdates,
  getApplication,
  deletePost,
  createJob,
  deleteApplication,
  deleteAllApplications,
  deleteAllComments,
  createApplication,
  createComment,
  searchBarUser,
  searchBarPost,
  postFile,
  getFiles,
  deleteFromDb,
  getPostedProjects,
};
