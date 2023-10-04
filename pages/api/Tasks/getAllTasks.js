import connect from '../../../middleware/connection_To_DB';
// const jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  // console.log("Request Dot Body Content from getAllTasks: ", req.body);
  try {
    if (connect) {
      console.log("Connected Successfully!");

      if (req.method == 'GET') {

        const {q} = req.query;
        console.log("Query = ", q);
        
        const keys = ['tasktitle'];
        
        // const searchFunction = data => data.filter(datum => datum.first_name.toLowerCase().includes(query) || datum.last_name.toLowerCase().includes(query) || datum.email.toLowerCase().includes(query));
        // // Best way of doing the above code:
        const searchFunction = data => data.filter(datum => keys.some(key => datum[key].toLowerCase().includes(q.toLowerCase())));


        // console.log("From GetAllBookings, receiveid Token: - ", req.body.token);
        // const token = req.body.token;
        // const data = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("content of data : ", data);

        let theTasks = await connect.query("SELECT * FROM tasks t, staffcomments sc, users u WHERE t.task_id = sc.task_id AND u.user_id = sc.user_id AND t.teamleader_id = u.user_id AND task_deleted <> 'Yes' ORDER BY t.status DESC, t.ending_date");
        // let theTasks = await connect.query("SELECT * FROM bookings AS b, \"Users\" AS u, packages AS p WHERE p.package_id = b.package_id AND b.user_id = u.\"User_id\" AND u.\"User_id\" = $1", [
        //   req.body.user_id
        // ]);

        if (theTasks.rowCount === 0 && theTasks.command === 'SELECT') {
          return res.status(404).json({ success: false, error: "No Tasks found!" });
        }
        else {

          
          let result = JSON.parse(JSON.stringify(theTasks.rows));
          console.log(result);
          
          
          if(q && typeof q !== undefined && q !== ''){
            return res.status(200).json({success:true, result: searchFunction(result).splice(0, 10)});
          }
          else{
            return res.status(200).json({ success: true, result });
          }

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