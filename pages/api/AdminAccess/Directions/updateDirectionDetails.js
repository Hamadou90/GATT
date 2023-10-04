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
        let updateDirectorCategory;
        let updateTask = await connect.query("UPDATE directions d SET direction_name = $1, direction_acronym = $2, director_id = $3 FROM users u WHERE u.user_id = d.director_id AND d.direction_id = $4", 
        [ 
          req.body.direction_name,
          req.body.direction_acronym,
          Number(req.body.director_id),
          Number(req.body.direction_id)
        ]);
        
        if(updateTask){
          updateDirectorCategory = await connect.query("UPDATE users SET category = 'Director' WHERE user_id = $1", 
          [ 
            Number(req.body.director_id)
          ]);

        }

        console.log("Command executed: ", updateTask.command);
        if (updateTask.rowCount === 0 && updateTask.command !== 'UPDATE') {
          return res.status(500).json({ success: false, error: "Erreur de Changement de Détails de la direction!" });
        }
        else {
          if(updateTask)
            return res.status(200).json({ success: true });
        }
      
    

    }
      else {
        return res.status(405).json({ success: false, error: "Méthode Non Autorisée!" });
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