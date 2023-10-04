import connect from '../../../../middleware/connection_To_DB';
const jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  // console.log("Request Dot Body Content from getAllTasks: ", req.body);  
  console.log("Request Dot Body Content from getBookings: ", req.body);

  try {
    if (connect) {
      console.log("Connected Successfully!");

      // console.log("Received Data: ", req.body);
      if (req.method === 'POST') {
        
        // console.log("Received Data: ", req.body);
        console.log("From getMyTasks, receiveid Token: - ", req.body.token);

        const token = req.body.token;
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log("content of data : ", data);

        // ---------------- Details on checking expiration duration of the token Start
        // // ----------- Can be used to verify if give access to resource api or not !!!
        //
        // console.log('Date de création: ', new Date(data.iat * 1000), ' AND Expiry Date: ', new Date(data.exp * 1000), '| And duration is: ', (data.exp - data.iat) / 3600, 'hours');
        // 
        // ---------------- Details on checking expiration duration of the token End
        

        // console.log("From GetAllBookings, receiveid Token: - ", req.body.token);
        // const token = req.body.token;
        // const data = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("content of data : ", data);

        let theTasks = await connect.query("SELECT * FROM tasks t, staffcomments sc, users u WHERE t.task_id = sc.task_id AND u.user_id = sc.user_id AND u.email = $1 ORDER BY t.status DESC, t.ending_date ",
        [
          data.email
        ]);

        // let theTasks = await connect.query("SELECT * FROM tasks t, staffcomments sc, users u WHERE t.task_id = sc.task_id AND u.user_id = sc.user_id AND u.email = $1",
        // [
        //   req.body.email
        // ]);
        // let theTasks = await connect.query("SELECT * FROM bookings AS b, \"Users\" AS u, packages AS p WHERE p.package_id = b.package_id AND b.user_id = u.\"User_id\" AND u.\"User_id\" = $1", [
        //   req.body.user_id
        // ]);

        if (theTasks.rowCount === 0 && theTasks.command === 'SELECT') {
          return res.status(404).json({ success: false, error: "Pas de Tâche trouvée!" });
        }
        else {
          let result = JSON.parse(JSON.stringify(theTasks.rows));
          console.log(result);


          return res.status(200).json({ success: true, result });

        }
      }
      else {
        return res.status(404).json({ success: false, error: "Méthode non authorisée!" });
      }
    }
    else {
      console.log("Erreur de connexion!");
    }
  } catch (error) {
    console.log(error);
  }

};

export default handler;