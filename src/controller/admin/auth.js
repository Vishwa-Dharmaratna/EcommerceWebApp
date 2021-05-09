
const User=require('../../models/user');
const jwt = require('jsonwebtoken');



exports.signup=(req,res)=>{

    
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(user) return res.status(400).json({
            message :"Admin alredy registerd"
        })
    })

    const { firstName, lastName, email, password } = req.body;
    //const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
      role:"admin"
    });

    _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }

        if(data){
            return res.status(201).json({
                user:"admin created succesfuly..."
            })
        }

    });
  }

  exports.signin=(req,res)=>{

    User.findOne({email:req.body.email})
    .exec((error,user)=>{
      if(error) return res.status(400).json({error});
      if(user){

        if(user.authenticate(req.body.password) && user.role==='admin'){

          const token = jwt.sign({ _id: user._id }, 'MERNSCRET',{expiresIn:'1h'});
          const{_id,firstName,lastName,email,role,fullName}=user;
          res.status(200).json({
            token,
            user:{_id,firstName,lastName,email,role,fullName}
          });


        }else{
          return res.status(400).json({
            message:"invalid password"
          })
        }

      }else{
        return res.status(400).json({message:'somthing went wrong'});
      }
  })
  }

  exports.requireSignin=(req,res,next)=>{

    const token=req.headers.authorization.split(" ")[1];
    const user=jwt.verify(token,'MERNSCRET')
    req.user=user;
    next();

  }