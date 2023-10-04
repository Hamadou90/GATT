import connect from '../../../../middleware/connection_To_DB';
// const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');


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

        // let insertDirection = await connect.query("SELECT * FROM tasks");

        // const password = CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString();
        // console.log("The encrypted Password is: ", password);
        let updateDirectorCategory;
        let insertDirection = await connect.query("INSERT INTO directions(direction_name, direction_acronym, director_id) VALUES($1, $2, $3)", [
          req.body.direction_name,
          req.body.direction_acronym,
          Number(req.body.director_id)
        ]);

        if(insertDirection && req.body.director_id !== '0'){
          updateDirectorCategory = await connect.query("UPDATE users SET category = 'Director' WHERE user_id = $1", 
          [ 
            Number(req.body.director_id)
          ]);

        }

        if (insertDirection.rowCount === 0 && insertDirection.command !== 'INSERT') {
          return res.status(500).json({ success: false, error: "Erreur Serveur: Insertion non éffectuée!" });
        }
        else {
          let result = JSON.parse(JSON.stringify(insertDirection.rows));
          console.log(result);


          return res.status(200).json({ success: true, result, director_id: Number(req.body.director_id) });

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