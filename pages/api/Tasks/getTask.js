import connect from '../../../middleware/connection_To_DB';

const handler = async (req, res) => {
  try {
    if (connect) {
      if (req.method == 'POST') {
        let place = await connect.query("SELECT * FROM tasks WHERE \"taskslug\" = $1",
          [req.body.slug]);

        if (place.rowCount === 0 && place.command === 'SELECT') {
          res.status(404).json({ success: false, error: "Tâche non trouvé!" });
        }
        else {
          let result = JSON.parse(JSON.stringify(place.rows[0]));
          res.status(201).json({ success: true, result });
        }
      }
      else {
        res.status(404).json({ success: false, error: "This method is not allowed!" });
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