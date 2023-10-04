import connect from '../../../middleware/connection_To_DB';
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


        
        // let commentTask = await connect.query("UPDATE tasks t, staffcomments sc, SET sc.task_accomplished = 'Yes' WHERE t.task_id = sc.task_id AND sc.task_id = $1", 
        // [ 
        //   Number(req.body.task_id)
        // ]);

        
        let commentTask = await connect.query("UPDATE staffcomments sc SET description = $1 FROM tasks t WHERE t.task_id = sc.task_id AND sc.task_id = $2", 
        [ 
          req.body.description,
          Number(req.body.task_id),
        ]);

        console.log("Command executed: ", commentTask.command);
        if (commentTask.rowCount === 0 && commentTask.command !== 'UPDATE') {
          return res.status(404).json({ success: false, error: "Erreur de commentaire de la tâche!" });
        }
        else {
          if(commentTask)
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