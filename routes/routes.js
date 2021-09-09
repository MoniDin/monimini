//
const { Router } = require('express')
//generate random number
const uuidv4 = require('uuid/v4')
//upload email attachment
const multer = require('multer')
const dotenv = require("dotenv").config()
const path = require('path')
const nodemailer = require('nodemailer');
const router = Router()
const cors = require('cors')
const corsOptions	=	{		
    origin:	'http://localhost:8080'
}

//declare count variable
let count = 0
// declare piclink variable
let piclink
const storage = multer.diskStorage({
    destination: async function(req,file,cb){

        cb(null, path.join(__dirname , '..' , 'client','uploads'))
          },
    filename: async function(req,file,cb){
        count += 1
        //console.log('count:' + count)
        let fname
        let extn = file.originalname.lastIndexOf('.')
        ext = file.originalname.slice(extn,)
        console.log(ext)
        console.log(typeof(ext))
        if(ext === '.jpg' && '.jpeg'){
        let picname = 'customer' + count + ext
        piclink = picname
        fname = picname
    }else{
        console.log('invalid picture format')
        fname = 'default.jpg'
        piclink = 'default.jpg'
    }
    console.log(fname)
        cb(null, fname )
          }
})
const upload = multer({storage:storage})


//home page
router.post('/api', cors(corsOptions), upload.single('item_pic'), async function(req, res) {
    // declare random cookie id
    let cid = uuidv4()
    let { fullname,email,employer,
        office_loc,itemcomments,loan,
        loandate,packageplan,referrer } = req.body
//console.log('piclink : ' + piclink)
let cookie = req.cookies.who
console.log(cookie)
if(cookie !== null || undefined){
    console.log(req.body)
    var mailTransport = nodemailer.createTransport({        
        service: 'Gmail',        
        auth: {                
            user: process.env.user,                
            pass: process.env.password,        
        } 
    }); 
          mailTransport.sendMail({        
              from: process.env.user,        
              to: 'uminpeter@gmail.com',        
              subject: 'Loan Applicant',
              html: '<h1>MoniDinau</h1>\n<p>Applicant details <br> ' + 
              '<br><b>name:</b> ' + fullname + '<br><b>email:</b>' + email + '<br><b>item:</b> ' + itemcomments + '<br><b>loan amount:</b>' + loan + '<br><b>loan date:</b>' + loandate + '</p>'        
              ,attachments:[{ 
                  filename: piclink,
                  path: path.join(__dirname  , '..' ,'client', 'uploads' , piclink )
                }],
                generateTextFromHtml: true,
            }, function(err){        
                  if(err) console.error( 'Unable to send email: ' + err ); 
                }); 
                
                res.cookie( 'who', cid, {
                    expires : new Date(Date.now() + 1000000),
                    httpOnly: true
                })
                res.redirect('http://localhost:8080/')
    
} else { res.redirect('http://localhost:8080/')}

                        //res.send(null)

            //get all incoming parameters
            // if the cookie is still valid do not accept input
            //filter parameters to stop stupid scripts
            //use the parameters in composing email
            //set cookie and send to server 
            //

})

module.exports = router

