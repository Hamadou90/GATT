import connect from '../../../../middleware/connection_To_DB';
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
        let updateUser = null;

        if(req.body.activate){
          updateUser = await connect.query("UPDATE users SET activated = 'Yes' WHERE user_id = $1", [            
            Number(req.body.user_id)
          ]);         
        }else{
          updateUser = await connect.query("UPDATE users SET username = $1, email = $2, password = $3, updated_on = $4, direction_id = $5 WHERE user_id = $6", [
            req.body.username,
            req.body.email,
            req.body.password,
            new Date(),
            Number(req.body.direction_id),
            // Date.Datetime(),
            Number(req.body.user_id)
          ]);
        }


        if(updateUser && updateUser !== null){
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