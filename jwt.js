const jwt = require ('jsonwebtoken');

const secret = "asdfghgfndgshdfjnmdmasdn"

const user = {
    id: 1,
    username: "johndoe",
    admin: true
};

const token = jwt.sign(user, secret, { expiresIn: '1h'});

console.log(token);

// jwt.verify(token, secret, (err, decoded)=>{
//     if(err){
//         console.log('token is not valid')
//     } else{
//         console.log(decoded)
//     }
// })

const decode = jwt.verify(token, secret);