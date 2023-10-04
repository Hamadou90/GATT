import connect from '../../../../middleware/connection_To_DB';
// const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');


const handler = async (req, res) => {
  // console.log("Request Dot Body Content from getAllTasks: ", req.body);
  try {
    if (connect) {
      console.log("Connected Successfully!");

      if (req.method == 'POST') {
        console.log("Server Side (Received Data): ", req.body);

        // console.log("From GetAllBookings, receiveid Token: - ", req.body.token);
        // const token = req.body.token;
        // const data = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("content of data : ", data);

        // let theUsers = await connect.query("SELECT * FROM tasks");

        const password = CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString();
        console.log("The encrypted Password is: ", password);

        let theUsers = await connect.query("INSERT INTO users(username, email, password, direction_id) VALUES($1, $2, $3, $4)", [
          req.body.username,
          req.body.email,
          password,
          Number(req.body.direction_id)
          // req.body.password
        ]);

        if (theUsers.rowCount === 0 && theUsers.command === 'SELECT') {
          return res.status(404).json({ success: false, error: "No Tasks found!" });
        }
        else {
          let result = JSON.parse(JSON.stringify(theUsers.rows));
          console.log(result);


          return res.status(200).json({ success: true, result });

        }
      }
      else {
        return res.status(404).json({ success: false, error: "This method is not allowed!" });
      }
    }
    else {
      console.log("Connection Error!");
    }
  } catch (error) {
    console.log(error);
  }

};

export default handler;