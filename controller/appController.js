const nodemailer =require('nodemailer');
const Mailgen = require('mailgen');

const {EMAIL , PASSWORD} = require('../env.js')

// sending mails using testing account
const singup = async (req,res) =>{

     let testAccount = await nodemailer.createTestAccount();

     const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: testAccount.user,
          pass: testAccount.pass,
        }
      });

     let message ={

        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Email is received by nishant", // plain text body
        html: "<b>Email is received by nishant</b>", // html body
      };

      transporter.sendMail(message).then((info)=>{
        return res.status(201).json(
            {msg:"you should receive an email",
            info : info.messageId,
            preview : nodemailer.getTestMessageUrl(info) 
        })
      }).catch(error => {
        return res.status(500).json({error});
      })
    
    // res.status(201).json("Signup Sucessfully...!");
}

/*
* sending emails using gmail account
*/
const getbill = (req,res)=>{
   // getting email from user while making post req
    const {userEmail} = req.body;

    // creating a object of transporter
    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
        } 
   };

   let transporter =  nodemailer.createTransport(config);

   let Mailgenerater = new Mailgen({
    theme : "default",
    product : {
        name : "Mailgen",
        link : 'https://mailgen.js/'
    }
   });

   let response = {
    body:{
        name : "Daily Learning is important",
        intro : "tour bill has arrived",
        table: {
            data : [
                {
                    item : "Learning Nodemailer ",
                    description : "A Backend application",
                    price : "$10",
                }
            ]
        },
        outro : "Looking forward to learn more about Nodejs"
    }
   };

// generating emails using mailgen library
   let mail = Mailgenerater.generate(response);

   let message = {
    from : EMAIL,
    to : userEmail,
    subject : "Place order",
    html : mail,
   };

   transporter.sendMail(message).then(()=>{
    return res.status(201).json({
        msg: "You should receive a email"
    })
   }).catch(error => {
    return res.status(404).json({error})
   });

    //res.status(201).json("getbill Sucessfully...!");

}

module.exports={
    singup,
    getbill
};