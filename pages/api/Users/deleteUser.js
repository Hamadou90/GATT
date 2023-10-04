import connect from '../../../middleware/connection_To_DB';
// const jwt = require('jsonwebtoken');


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

        // let updateUser = await connect.query("SELECT * FROM tasks");
        let updateUser = await connect.query("UPDATE users SET activated = 'No' WHERE user_id = $1", [
          // req.body.username,
          req.body.email,
          // req.body.password,
          // Date.Datetime(),
          // Number(req.body.user_id)
        ]);

        if(updateUser){
          return res.status(200).json({success: true})
        }
        else{
          res.status(404).json({ success: false, error: "La modification n'a pas abouti, reéssayez svp!"})
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