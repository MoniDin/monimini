//
const { Router } = require('express')
//generate random number
const { v4: uuidv4 } = require('uuid');
//upload email attachment
const multer = require('multer')

const path = require('path')
const nodemailer = require('nodemailer');
const router = Router()
//const cors = require('cors')
//const corsOptions	=	{		
//    origin:	'http://localhost:8008'
//}

//declare count variable
let count = 0
// declare piclink variable
let piclink
const storage = multer.diskStorage({
    destination: function(req,file,cb){

        cb(null, path.join(__dirname , '..' ,'uploads'))
          },
    filename: async function(req,file,cb){
        count += 1
        ////console.log('count:' + count)
        let fname
        let extn = file.originalname.lastIndexOf('.')
        ext = file.originalname.slice(extn,)
        //console.log(ext)
        //console.log(typeof(ext))
        if(ext === '.jpg' && '.jpeg'){
        let picname = 'customer' + count + ext
        piclink = picname
        fname = picname
    }else{
        //console.log('invalid picture format')
        fname = 'default.jpg'
        piclink = 'default.jpg'
    }
    //console.log(fname)
        cb(null, fname )
          }
})
const upload = multer({storage:storage})


//home page


router.post('/api', upload.single('item_pic'), function(req, res) {
    // declare random cookie id
    let cid = uuidv4()
    let { fullname,email,employer,
        office_loc,itemcomments,loan,
        loandate,packageplan,referrer } = req.body
//console.log('piclink : ' + piclink)
let cookie = req.cookies.who
//console.log(cookie)
//console.log(path.join(__dirname ,'..', 'uploads'  ))
if(cookie == null || undefined){
    //console.log(req.body)
    var mailTransport = nodemailer.createTransport({        
        service: 'Gmail',        
        auth: {                
            user: process.env.user,                
            pass: process.env.password,        
        } 
    }); 
          mailTransport.sendMail({        
              from: process.env.user,        
              to: email,        
              subject: 'Loan Applicant',
              html: '<h1>MoniDinau</h1>\n<p>Applicant details <br> ' + 
              '<br><b>name:</b> ' + fullname + '<br><b>email:</b>' + email + '<br><b>item:</b> ' + itemcomments + '<br><b>loan amount:</b>' + loan + '<br><b>loan date:</b>' + loandate + '</p>'        
              ,attachments:[{ 
                  filename: piclink,
                  path: path.join(__dirname ,'..' , 'uploads' , piclink )
                }],
                generateTextFromHtml: true,
            }, function(err){        
                  if(err) console.error( 'Unable to send email: ' + err ); 
                }); 
                
                res.cookie( 'who', cid, {
                    expires : new Date(Date.now() + 1000000),
                    httpOnly: true
                })
                res.redirect('/')
    
} else { res.redirect('/')}

                        
            //get all incoming parameters
            // if the cookie is still valid do not accept input
            //filter parameters to stop stupid scripts
            //use the parameters in composing email
            //set cookie and send to server 
            //

})

router.get('*',function(req, res){
    res.sendFile(path.join(__dirname , 'build','index.html'))
  })

module.exports = router

