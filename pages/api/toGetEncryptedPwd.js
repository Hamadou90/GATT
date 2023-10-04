// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const CryptoJS = require('crypto-js');

  let password = 'admin';

  const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString();
  console.log("The encrypted Password is: ", encryptedPassword);
  
  
  // Decryption Section
  let encryptedStr = 'U2FsdGVkX18lZHpFD2GGrkoVkjP+xHup9PzJR6Gzd90=';
  const decryptedString = CryptoJS.AES.decrypt(encryptedStr, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8);
  const decryptedPassword = CryptoJS.AES.decrypt('U2FsdGVkX1/iN90sfehdXFVMFBEkD1IB3t5m4JZjgyw=', process.env.AES_SECRET).toString(CryptoJS.enc.Utf8);
  const decryptedPasswordMHA = CryptoJS.AES.decrypt('U2FsdGVkX18iRudeZe7HZzvqeYZRiBfCFsVko8KkFxU=', process.env.AES_SECRET).toString(CryptoJS.enc.Utf8);

  
  res.status(200).json({ name: 'John Doe', encryptedPassword  : encryptedPassword, decryptedString: decryptedPassword, decryptedPassword: decryptedPassword, decryptedPasswordMHA: decryptedPasswordMHA })
}
