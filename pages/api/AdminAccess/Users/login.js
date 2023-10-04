// import connect from '../../middleware/connection_To_DB';
import connect from '../../../../middleware/connection_To_DB';
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  try {
    if (connect) {
      console.log("Connected Successfully!");

      // console.log(CryptoJS.AES.encrypt('PASSWD', 'secret123'));

      if (req.method == 'POST') {
        // let user = await connect.query("SELECT * from users WHERE email = $1 AND password = $2",
        //   [
        //     req.body.username,
        //     req.body.password
        //   ]);
        let useCase = 1;
        let user = await connect.query("SELECT * from users WHERE email = $1",
          [
            req.body.username
          ]);
          // Admin User query
        let adminUser = await connect.query("SELECT * from admins WHERE admin_email = $1",
          [
            req.body.username
          ]);

          console.log('The UserRowCount is: ', user.rowCount);
          console.log('The AdminUserRowCount is: ', adminUser.rowCount);
        
          if (user.rowCount === 0 && user.command === "SELECT" && adminUser.rowCount === 0 && adminUser.command === "SELECT") {
            // res.status(404).json({ success: false, error: "User Not Found!" });
              res.status(404).json({ success: false, error: "Désolé compte inexistant!" });
          }         
          else {
            let result;
            
            if(user.rowCount !== 0){
              // useCase = 1;
              result = JSON.parse(JSON.stringify(user.rows[0]));
            }
            else{
              useCase = 2;
              result = JSON.parse(JSON.stringify(adminUser.rows[0]));
            }
            console.log(result);
             
            // Decryption section
            let bytes;
            if(useCase && useCase === 2){
              bytes = CryptoJS.AES.decrypt(result.admin_password, process.env.AES_SECRET);
            }
            else{
              bytes = CryptoJS.AES.decrypt(result.password, process.env.AES_SECRET);
            }
            console.log(bytes);

            let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
            console.log("DecryptedPassword is: ", decryptedPassword);
            //  Encrypted Password Verification
            if (req.body.password === decryptedPassword) {
              
              //  UseCase 2 Start
              if(useCase && useCase === 2){
                
                // Verifying if the account is activated or not
                if(result.admin_activated !== 'Yes'){
                  res.status(404).json({ success: false, error: "Erreur, votre compte administrateur est inactif!" });
                }
                else{
                  console.log('Yes, the password verification is okay!!!');
                  // let accountType;
                  let token = jwt.sign({ email: result.admin_email, name: result.admin_username, category: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });

                  // if(result.category === 'Simple User')
                  //   accountType = 1;
                  // else
                  //   accountType = 2;
                  res.status(200).json({ success: true, token, email: result.admin_email, username: result.admin_username, accountType: 3 });
                  // if ((req.body.email == result.email && req.body.password == result.password) || (req.body.username == result.username && req.body.password == result.password))
                  // if (req.body.email == result.email  || req.body.username == result.username && req.body.password == result.password)
                  // {
                  //   // let token = jwt.sign({ email: result.Email, name: result.Name }, process.env.JWT_SECRET, { expiresIn: '2d' });
                  //   res.status(200).json({ success: true, email: result.email, name: result.username });
                  // }
                  // else {
                  //   res.status(404).json({ success: false, error: "Erreur Username/Mot-de-passe, Reéssayez svp!" });
                  // }
    
                }
              }
              else{
                
                // Verifying if the account is activated or not
                if(result.activated === 'No'){
                  res.status(404).json({ success: false, error: "Erreur, votre compte n'est pas activé!" });
                }
                else{
                  console.log('Yes, the password verification is okay!!!');
                  let accountType;
                  let token = jwt.sign({ email: result.email, name: result.username, category: result.category }, process.env.JWT_SECRET, { expiresIn: '1d' });

                  if(result.category === 'Simple User')
                    accountType = 1;
                  else
                    accountType = 2;
                    
                  res.status(200).json({ success: true, token, email: result.email, username: result.username, accountType: accountType });
                  // if ((req.body.email == result.email && req.body.password == result.password) || (req.body.username == result.username && req.body.password == result.password))
                  // if (req.body.email == result.email  || req.body.username == result.username && req.body.password == result.password)
                  // {
                  //   // let token = jwt.sign({ email: result.Email, name: result.Name }, process.env.JWT_SECRET, { expiresIn: '2d' });
                  //   res.status(200).json({ success: true, email: result.email, name: result.username });
                  // }
                  // else {
                  //   res.status(404).json({ success: false, error: "Erreur Username/Mot-de-passe, Reéssayez svp!" });
                  // }
    
                }
              }
              //  UseCase 1 End


            }
            else{
              res.status(404).json({ success: false, error: "Erreur de Mot-de-passe, Reéssayez svp!" });
            }





            

          }






        // let user = await connect.query("SELECT * FROM \"Users\" WHERE \"Email\" = $1", [
        //   req.body.email
        // ]);

        // if (user.rowCount === 0 && user.command === 'SELECT') {
        //   res.status(404).json({ success: false, error: "User Not Found!" });
        // }
        // else {
        //   let result = JSON.parse(JSON.stringify(user.rows[0]));
        //    console.log(result);
          
        //   let bytes = CryptoJS.AES.decrypt(result.Password, process.env.AES_SECRET);
        //    console.log(bytes);

        //   let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
        //    console.log(decryptedPassword);
        //   //  Encrypted Password Verification
        //   if (req.body.email === result.Email && req.body.password === decryptedPassword) {

        //     // Checking if the account is Activated or not
        //     if(result.accountStatus === 'Deactivated'){
        //       res.status(201).json({ success: false, error: "Your account is not activated!" });
              
        //     }
        //     else{
        //       let token = jwt.sign({ email: result.Email, name: result.Name }, process.env.JWT_SECRET, { expiresIn: '2d' });
        //       res.status(200).json({ success: true, token, email: result.Email, name: result.Name });
        //     }
        //   }
        //   else {

        //     res.status(404).json({ success: false, error: "You have entered invalid credentials!" });
        //   }
        // }

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