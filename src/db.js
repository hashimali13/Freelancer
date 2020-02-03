const Pool = require('pg').Pool
const pool = new Pool({
  user: 'freelancer',
  host: 'freelancerproject.csglr5v9qttk.eu-west-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'hashnathbail',
  port: 5432
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    console.log('sdasdaa')
    if (error) {

      throw error
    }
    console.log('sdasdasdasdaxa')

    response.status(200).json(results.rows)
  })
}

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

const createUser = (request, response) => {
  console.log(request.body.user)
  let user = request.body.user;
  let pass = request.body.pass;
  let email = request.body.email;
  let dob = request.body.dob;
  pool.query('INSERT INTO users (username, password, email, dob) VALUES ($1, $2, $3, $4)', [user, pass, email, dob], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send({ error: "user error" });

    }
    else {
      response.status(201).json(results.row)
    }
  })
}

const searchUser = (request, response) => {
  let user = request.body.user;
  pool.query('SELECT * FROM users where uid=$1', [user], (error, results) => {
    console.log('sdasdaa')
    if (error) {
      throw error
    }
    console.log('sdasdasdasdaxa')

    response.status(200).json(results.rows)
  })
}

const searchProjects = (request, response) => {
  let user = request.query.user;
  console.log(user)
  pool.query('SELECT uid FROM users where username=$1', [user], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rowCount === 0) {
      console.log("unauthorized")
      return response.status(401).json({ error: 'User does not exist' })
    }
    let uid = results.rows[0].uid
    pool.query('SELECT * FROM project where uid=$1', [uid], (error, results) => {
      if (error) {
        throw error
      }
      if (results.rowCount === 0) {
        console.log("no projects")
        return response.status(402).json({ error: 'User does not have any projects.' })
      }
      
      console.log(results.rows[0])
      response.status(200).json(results.rows)
    })
    
  })
}


const authUser = (request, response) => {
  console.log(request.query)
  let username = request.query.user;
  let password = request.query.pass;
  pool.query('SELECT * FROM users WHERE username=$1 AND password=$2', [username, password], (error, results) => {
    if (error) {
      throw error
    }

    if (results.rowCount === 0) {
      console.log("unauthorized")
      return response.status(401).json({ error: 'invalid username or password' })
    }
    response.status(200).json(results.rows)
  })
}


module.exports = {
  getUsers,
  searchUser,
  createUser,
  authUser,
  getProjects,
  searchProjects
}
