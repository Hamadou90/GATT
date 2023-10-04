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

        // let theTask = await connect.query("SELECT * FROM tasks");

        // let theTask = await connect.query("INSERT INTO tasks(duration, comment_director) VALUES($1, $2)", [
        //   req.body.duration,
        //   req.body.comment_director
        // ]);

        
        let theTask = await connect.query("INSERT INTO tasks(tasktitle, starting_date, ending_date, comment_director, teamleader_id, tasktype) VALUES($1, $2, $3, $4, $5, $6)", [
          req.body.tasktitle,
          req.body.starting_date,
          req.body.ending_date,
          req.body.comment_director,
          req.body.teamleader_id,
          String(req.body.tasktype)
        ]);

        if (theTask.rowCount === 0 && theTask.command !== 'INSERT') {
          return res.status(404).json({ success: false, error: "Erreur de Création de tâche!" });
        }
        else {
          
          
          let task_id = await connect.query('SELECT task_id FROM tasks ORDER BY task_id DESC LIMIT 1');
        let result = JSON.parse(JSON.stringify(task_id.rows[0])).task_id;
        console.log("the result of the Select Query: ", result);
        if(result !== null){
          let receivedTask_id = Number(result);
          let insertStaffComments;
            if(req.body.tasktype === 'Individual'){
              insertStaffComments = connect.query('INSERT INTO staffcomments(task_id, user_id) VALUES($1, $2)',
              [
                receivedTask_id,
                req.body.teamleader_id
              ]);

              return res.status(200).json({ success: true, result });
            }          
            else
            {            
              insertStaffComments = connect.query('INSERT INTO staffcomments(task_id, user_id) VALUES($1, $2)',
              [
                receivedTask_id,
                req.body.teamleader_id
              ]);
              
              let insertOtherSC;
              req.body.user_ids.forEach(user_id => {
                insertOtherSC = connect.query('INSERT INTO staffcomments(task_id, user_id) VALUES($1, $2)',
                [
                  receivedTask_id,
                  user_id
                ]);
              });

              return res.status(200).json({ success: true, result });
            }
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