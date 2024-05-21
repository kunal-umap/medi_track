const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/schema');
const Report = require('../model/reportModel')


exports.signup = async (req,res)=>{
    if(!req.body){
        res.status(406).json({err:"You have to fille"})
    }
    
    try {
        let {email,password,conformPassword,username,address ,mobileNo,bloodGroup,age,isDoc} = req.body;
        if(!email || !password || !conformPassword || !username){
            res.status(406).json({err:"You have to fille"})
            return;
        }
        if( password.length < 8 ){
            res.status(406).json({err:"password is not strong"})
            return;
        }
        // if( !mobileNo ){
        //     res.status(406).json({err:"enter mobile no"})
        // }
        if( username.length < 2 ){
            res.status(406).json({err:"choose another username"})
            return;
        }
        if( password !== conformPassword ){
            res.status(406).json({err:"password is not matching to conform password"})
            return;
        }
        if(! String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            res.status(406).json({err:"invalid email"})
        }
        //  password hashing 
        const hashPass = await bcrypt.hashSync(password,10);

        // using schema for doc stricture
        const newUser = new User({
            email,
            password:hashPass ,
            username,
            address, 
            mobileNo,
            bloodGroup,
            age,
            isDoc
        });


        newUser.save(newUser)
        .then(signup => {
            const emptyrepo = new Report({
                username
            })
            let a = emptyrepo.save(emptyrepo)
            res.json({signup})
        }).catch(error => {
            res.status(406).json({err : error.message || "some errore occured"})
        })

    } catch (error) {
        res.status(500).json({err: error.message || "Error occured"})
    }

}


exports.login =async (req,res)=>{

    // store usre data
    try {

        if(!req.body){
            err.status(406).json({err: "fields are empty"});
            return;
        }

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(406).json({err:"Not all fields have been entered"});
        }

        // find data from mongodb
        const user =await User.findOne({email});

        if(!user){
            return res.status(406).json({err: "no account "})
        }

        //  password cheack

        const passCheck = bcrypt.compare(password,user.password);

        if(!passCheck){
            return res.status(406).json({err: "error occured"})
        }

        // creat jet token 

        const verifyJwt = jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.json({verifyJwt,username: user.username,email: user.email,Name: user.name,isDoc: user.isDoc});
        
    } catch (error) {
        res.status(500).json({err:error.message || "Some error occured"})
    }

}

// delete function

exports.delete =async (req,res) => {
    try {
        await User.findByIdAndDelete(req.user_id)
        res.json({msg: "account deleted successfully"})
        
    } catch (error) {
        res.status(500).json({err: error.message || "error occured"})
    }
}

