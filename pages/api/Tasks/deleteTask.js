import connect from '../../../middleware/connection_To_DB';
// const jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  // console.log("Request Dot Body Content from getAllTasks: ", req.body);
  try {
    if (connect) {
      console.log("Connected Successfully!");

      if (req.method == 'POST') {
        console.log("Server Side (Received Data): ", req.body, " and Datatype is: ", typeof req.body);
        
        let updateTask = await connect.query("UPDATE tasks SET task_deleted='Yes' WHERE task_id=$1", [ req.body ]);

        console.log("Command executed: ", updateTask.command);
        if (updateTask.rowCount === 0 && updateTask.command !== 'UPDATE') {
          return res.status(404).json({ success: false, error: "Erreur de Suppression de la tâche!" });
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