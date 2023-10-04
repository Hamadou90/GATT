import connect from '../../../../middleware/connection_To_DB';
// const jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  
  try {
    if (connect) {
      console.log("Connected Successfully!");
      console.log('The req.body content is: ', req.body);

      if (req.method == 'POST') {
        

        // let theDirector = await connect.query("SELECT * FROM directions d, users u WHERE u.user_id = d.director_id");
        let theDirector = await connect.query("SELECT * FROM directions d, users u WHERE d.director_id = u.user_id AND d.direction_id = $1",
        [
          req.body.direction_id
        ]);
        // let theDirector = await connect.query("SELECT * FROM bookings AS b, \"Users\" AS u, packages AS p WHERE p.package_id = b.package_id AND b.user_id = u.\"User_id\" AND u.\"User_id\" = $1", [
        //   req.body.user_id
        // ]);

        if (theDirector.rowCount === 0 && theDirector.command === 'SELECT') {
          return res.status(404).json({ success: false, error: "Pas de Directeur trouvé!" });
        }
        else {
          let result = JSON.parse(JSON.stringify(theDirector.rows[0]));
          console.log(result);


          return res.status(200).json({ success: true, result });

        }
      }
      else {
        return res.status(404).json({ success: false, error: "This method is not allowed!" });
      }
    }
    else {
      console.log("Erreur de Connection!");
    }
  } catch (error) {
    console.log(error);
  }

};

export default handler;