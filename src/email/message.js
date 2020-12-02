const nodemailer = require('nodemailer')


// //step 1 create transpoter
// let transporter = nodemailer.createTransport({
//    service:'gmail',
//    auth:{
//        user:'zenielebrahim1@gmail.com',
//        pass:'zorrofire'
//    } 
// })

// //step 2 
// let mailOptions = {
//     from:'zenielebrahim1@gmail.com',
//     to:'safuraebrahimwork@gmail.com',
//     subject:'Testing and Testing',
//     text:'This is a test please ignore this message.'
// }

// //step 3 
// transporter.sendMail(mailOptions, (err, data)=>{
// if(err){
// throw new Error('Could not send email====================================================')
// }

// console.log('email sent')
// }) 



const sendWelcomeMessage = (user)=>{
let transporter = nodemailer.createTransport({
   service:'gmail',
   auth:{
       user:'zenielebrahim1@gmail.com',
       pass:'zorrofire'
   } 
})

let mailOptions = {
    from:'zenielebrahim1@gmai.com',
    to:user.email,
    subject:'Thanks for joining in!',
    text:`Welcome to the app, ${user.name}. Let me know how you get along with the app.`
}




transporter.sendMail(mailOptions, (err, data)=>{
if(err){
throw new Error('Could not send email')
}

console.log('email sent')
}) 
}



const sendCancelationMessage = (user)=>{
    let transporter = nodemailer.createTransport({
       service:'gmail',
       auth:{
           user:'zenielebrahim1@gmail.com',
           pass:'zorrofire'
       } 
    })
    
    let mailOptions = {
        from:'zenielebrahim1@gmai.com',
        to:user.email,
        subject:'Your account has been cancelled.',
        text:`We are sad to see you leave, ${user.name}. Let us know what we could have done better to have kept you.`
    }
    
    
    
    
    transporter.sendMail(mailOptions, (err, data)=>{
    if(err){
    throw new Error('Could not send email')
    }
    
    console.log('email sent')
    }) 
    }

module.exports = {sendWelcomeMessage, sendCancelationMessage}