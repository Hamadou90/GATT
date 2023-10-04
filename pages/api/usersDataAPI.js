// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import users from "../../usersData/users";


export default function handler(req, res) {
  const {q} = req.query;
  console.log("Q = ", q);
  
  const keys = ['first_name', 'last_name', 'email'];
  
  // const searchFunction = data => data.filter(datum => datum.first_name.toLowerCase().includes(query) || datum.last_name.toLowerCase().includes(query) || datum.email.toLowerCase().includes(query));
  // // Best way of doing the above code:
  const searchFunction = data => data.filter(datum => keys.some(key => datum[key].toLowerCase().includes(q)));

  if(q && typeof q !== undefined){
    res.status(200).json({result: searchFunction(users).splice(0, 10)});
  }
  else{
    // res.status(200).json({result: (users).splice(0, 10)});
    res.status(200).json({result: (users)});
  }
  
}
