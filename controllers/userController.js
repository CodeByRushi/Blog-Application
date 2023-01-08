const User = require('../models/User');
const Post = require('../models/Posts');
const alert = require('alert');
// import alert from 'alert';
 

module.exports.home=function(req,res){

    return res.send("HI from server");
}


module.exports.showSignUp = function(req,res){
    if(req.isAuthenticated()){
        console.log("it is already authenticated");
        return res.redirect('/user/profile');
    }
    return res.render('signup');
}

module.exports.showSignIn = function(req,res){
    if(req.isAuthenticated()){
        console.log("it is already authenticated");
        return res.redirect('/user/profile');
    }
    return res.render('signin');
}

module.exports.createUser = function(req,res){
    console.log(req.body.name);

    if(req.body.password != req.body.psw_repeat)
    {
        console.log("Password does not match!");
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}, function(err,data){
        if(err){
            console.log("error in finding user while signUp",err);
            return;
        }
        if(!data){
            User.create(req.body, function(err, data){
                if(err){
                    console.log("error in creating user while signUp",err);
                    return;
                }
                console.log("Record created in db");
                return res.redirect('/user/signin');
            });

        }else{
            console.log("User already exists");
            return res.redirect('back');
        }
    })
}

module.exports.showProfile = function(req, res){

    Post.find({},function(err, posts){
        if(err){console.log("error in fetching posts",err); return;}

        let count = 0;
        for(i of posts){
            if(i.active){
                count++;
            }
        }
        return res.render('profile', {
            title:'profile',
            user:req.user,
            posts:posts,
            activePosts:count
        });
    });
    
    
}

module.exports.createSession = function(req,res){
    return res.redirect('/user/profile');
}

module.exports.addPost = function(req,res){
    let activeStatus = false;
    if(req.body.active == "active")
        activeStatus = true;

    console.log(activeStatus); 
    Post.create({
        title : req.body.title,
        body : req.body.body,
        createdBy : req.user.name,
        active : activeStatus,
        location :{
            latitude :req.body.latitude,
            longitude: req.body.longitude
        }
    }, function(err, data){
        if(err){
            console.log("error in creating user while signUp",err);
            return;
        }
        console.log("Record created in db");
        alert("Successfully stored");
        return res.redirect('/user/profile');
    });

}
module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.redirect('/user/signin');
      });
    
}
module.exports.delete_post = function(req,res){
    // console.log(req.body.deletecheck.checked);
    let id = req.query.id;
    Post.findByIdAndDelete(id, function(err){//this method identifies by ID and delete it.
        if(err)//failure
        {
            console.log("Error in deletion", err);
            return;
        }
        console.log(req.query.id);
        console.log("deleted");
        return res.redirect("back");//successfully deleted then redirect to same page
    });
    
    // res.redirect("back");
}

module.exports.update_post= function(req,res){
    console.log(req.query.id);
    Post.findById(req.query.id, function(err,posts){
        if(err){ console.log('hi man!! it an error'); return}
        return res.render('updateForm',{
        title:'Edit Page',
        posts:posts
        });
    });
}
module.exports.modify_post = function(req,res){
    let activeStatus = false;
    if(req.body.active == "active")
        activeStatus = true;
    Post.updateOne({_id:req.query.id},{$set:{
        title : req.body.title,
        body : req.body.body,
        createdBy : req.user.name,
        active : activeStatus,
        location :{
            latitude :req.body.latitude,
            longitude: req.body.longitude
        }
    }} ,function(err,Data){
        if(err){
            console.log('error while updating'); 
            return;
        }
        // console.log("Details Updated", todoData);
        return res.redirect('/user/profile');
    });
    
}

module.exports.getPosts = function (req,res){

    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    console.log("Searching posts from ", latitude, " ", longitude);
    Post.find({
        location:{
            latitude:latitude,
            longitude:longitude
        },
        active:true
    },function(err, posts){
        if(err){console.log("error in fetching posts",err); return;}
        console.log(posts);
        res.json({
            posts
        });
        
    });
    // return;
};