import connect from '../../../middleware/connection_To_DB';
// const jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  // console.log("Request Dot Body Content from getAllTasks: ", req.body);
  try {
    if (connect) {
      console.log("Connected Successfully!");

      if (req.method == 'POST') {
        // NB: Need to Filter Users with activated flag
        console.log("Received Data: ", req.body);
        let theUsers = await connect.query("SELECT * FROM users u, directions d WHERE u.direction_id = d.direction_id AND u.email = $1",
        [
          req.body.email
        ]);

        if (theUsers.rowCount === 0 && theUsers.command === 'SELECT') {
          return res.status(404).json({ success: false, error: "No users found!" });
        }
        else {
          let result = JSON.parse(JSON.stringify(theUsers.rows[0]));
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