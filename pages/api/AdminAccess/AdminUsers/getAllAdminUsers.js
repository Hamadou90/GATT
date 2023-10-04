import connect from '../../../../middleware/connection_To_DB';
// const jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  // console.log("Request Dot Body Content from getAllTasks: ", req.body);
  try {
    if (connect) {
      console.log("Connected Successfully!");

      if (req.method == 'GET') {

        // console.log("From GetAllBookings, receiveid Token: - ", req.body.token);
        // const token = req.body.token;
        // const data = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("content of data : ", data);

        let theAdminUsers = await connect.query("SELECT * FROM admins");
        // let theAdminUsers = await connect.query("SELECT * FROM bookings AS b, \"Users\" AS u, packages AS p WHERE p.package_id = b.package_id AND b.user_id = u.\"User_id\" AND u.\"User_id\" = $1", [
        //   req.body.user_id
        // ]);

        if (theAdminUsers.rowCount === 0 && theAdminUsers.command === 'SELECT') {
          return res.status(404).json({ success: false, error: "No users found!" });
        }
        else {
          let result = JSON.parse(JSON.stringify(theAdminUsers.rows));
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