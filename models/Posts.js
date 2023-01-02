const mongoose = require('mongoose');
const User = require('../models/User');
const postSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    },
    location:{
        latitude :{
            type:String,
            required:true
        },
        longitude :{
            type:String,
            required:true
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:User
    }
},{
    timestamps: true
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
