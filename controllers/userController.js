const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = 'mysecrettoken'

const userController = {
    getAllUsers:async(req,res) => {
        try {
            const user = await User.find();
            res.json(user);
        } catch (error) {
            console.error('Error getting all users: ', error);
            res.status(500).json({messge:'Internal Server Error'});
        }
    },
    registerUser: async(req,res) => {
        try {
            const user = await User.find;
            const {userId,name,lastName,email,password,telephone}= req.body;

            const userData = {
                userId:userId,
                name:name,
                lastName:lastName,
                email:email,
                password: await bcrypt.hash(password,10),telephone:telephone
            }

            const newUser = new User(userData);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);

        } catch (error) {
            console.error('error registering user: ',error);
            res.status(500).json({message: 'Internal Server Error'})
        }
    },
    login: async(req,res) => {
        try {
            const{email,password} = req.body;
            const user = await User.find({email:email});
            if(!user){
                return res.status(400).json({message:"incorrect email or password"})
            }

            const isPasswordValid = await bcrypt.compare(password,user[0].password);
            const token = jwt.sign({userId: user.id},jwt_secret,{expiresIn:"1h"});

            res.json({message:"you have entered correctly", token});

        } catch (error) {
            console.error('failed to login ',error);
            res.status(500).json({message: 'Internal Server Error'})
        }
    },
    createUser: async(req,res) => {
        const userData = req.body;
        try {
            const newUser = new User(userData);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            console.error('Error creating user: ', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    updateUser: async(req,res) => {
        try {
            const{_id} = req.params;
            const userUpdate = await User.findOneAndUpdate({_id:_id},{$set:{name:'Pablo'}});

            res.json(userUpdate);

        } catch (error) {
            console.error('Error updating user', error);
            res.status(500).json({message: 'Internal Server Error'})
        }
    },
    deleteUser: async(req,res) => {
        try {
            const {_id} = req.params;
            const deleteUser = await User.findOneAndDelete({_id:_id});
            res.json(deleteUser)
        } catch (error) {
            console.error('Error when deleting users',error);
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
}

module.exports = userController;