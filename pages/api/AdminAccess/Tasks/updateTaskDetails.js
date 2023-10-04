import connect from '../../../../middleware/connection_To_DB';
const jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  // console.log("Request Dot Body Content from getAllTasks: ", req.body);
  try {
    if (connect) {
      console.log("Connected Successfully!");

      if (req.method == 'POST') {
        console.log("Server Side (Received Data): ", req.body, " and Datatype is: ", typeof req.body);

        
        const token = req.body.token;
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log("content of data : ", data);


        // console.log('Connected Date: ', new Date(data.exp * 1000), ' || AND Current-DateTime is: ', new Date(), ' |||| AND is it expired?: ', new Date() > new Date(data.exp * 1000));


        // let updateTask = await connect.query("UPDATE staffcomments sc SET task_accomplished = 'Yes' FROM tasks t WHERE t.task_id = sc.task_id AND t.task_id = $1", 
        // [ 
        //   Number(req.body.task_id)
        // ]);
        let updateTask = await connect.query("UPDATE tasks t SET tasktitle = $1, starting_date = $2, ending_date = $3, tasktype = $4, comment_director = $5 FROM staffcomments sc WHERE t.task_id = sc.task_id AND t.task_id = $6", 
        [ 
          req.body.tasktitle,
          req.body.starting_date,
          req.body.ending_date,
          req.body.tasktype,
          req.body.comment_director,
          Number(req.body.task_id)
        ]);

        console.log("Command executed: ", updateTask.command);
        if (updateTask.rowCount === 0 && updateTask.command !== 'UPDATE') {
          return res.status(404).json({ success: false, error: "Erreur de Changement de Détails de la tâche!" });
        }
        else {
          if(updateTask)
            return res.status(200).json({ success: true });     
      }
      
    
    
    }
      else {
        return res.status(404).json({ success: false, error: "Méthode d'accès interdite!" });
      }
    }
    else {
      console.log("Erreur de Connexion à la BDD!");
    }
  } catch (error) {
    console.log(error);
  }

};

export default handler;