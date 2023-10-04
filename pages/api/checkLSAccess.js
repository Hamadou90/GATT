// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // console.log("Can the localStorage really be accessed from the backedn side?: ", req.localStorage)

  const jwt =  require('jsonwebtoken');
const private_key = 'pizza1234';
const payload = { username: 'john', email: 'john@gmail.com' };
// Create a JSON Web Token (JWT)
const token = jwt.sign(payload, private_key, {expiresIn: '5s'});
console.log("The token is: ",token);
// After 6s: verify signature (it will fail)
try {
  setTimeout(() => {
    const data = jwt.verify(token, private_key);
    console.log("Is it expired? ", data);
    
    res.status(200).json({ name: 'John Doe' , expiry: data.TokenExpiredError})
    
  }, 6000)
  
} catch (error) {
  console.log("The error of Expiry: ", error.message);
}

res.status(200).json({ name: 'John Doe' })

}
