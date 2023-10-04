import connect from '../../../../middleware/connection_To_DB';
// const jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  // console.log("Request Dot Body Content from getAllTasks: ", req.body);
  try {
    if (connect) {
      console.log("Connected Successfully!");

      if (req.method == 'POST') {

        // console.log("From GetAllBookings, receiveid Token: - ", req.body.token);
        // const token = req.body.token;
        // const data = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("content of data : ", data);

        // NB: Need to Filter Users with activated flag
        console.log("Received Data: ", req.body);
        let theUsers = await connect.query("SELECT * FROM users u, staffcomments sc, tasks t WHERE u.user_id = sc.user_id AND t.task_id = sc.task_id AND t.task_id = $1 AND u.user_id <> $2",
        [
          Number(req.body.selectedTask_id),
          Number(req.body.teamleader_id)
        ]);

        if (theUsers.rowCount === 0 && theUsers.command === 'SELECT') {
          return res.status(404).json({ success: false, error: "No users found!" });
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