import { User } from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authMiddleware } from "../middleware/auth.js"

export const createUser = async (req, res) =>{
    try{

        const {name, email, password, username, mobile} = req.body

        if(!name || !email || !password || !username || !mobile){
            return res.status(400).json({
                success: false,
                message: "please enter all fields"
            })
        }

        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success: false,
                message: "user already exists"
            })
        }

        user = await User.create({
            name, 
            email,
            password,
            username,
            mobile
        })

        const token = await user.generateToken()

        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly : true,
            SameSite: "none",
            secure: true
        }

        res.cookie("token", token, options).status(201).json({
            success: true,
            message: "User created successfully",
            user, 
            token
        })

        // res.staus(201).json({
        //     success: true,
        //     message: "user created successfully"
        // })

    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// export const createUser = async (req, res) => {
//     try {
//         // Parsing body
//         const {name, email, password, username, mobile} = req.body
//         // console.log(req.body)

//         // Checking body data
//         if(!name || !email || !password || !username || !mobile) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please enter all fields..."
//             })
//         }

//         const hash = await bcrypt.hash(password, 10) 
//         // Creating user
//         const user = await User.create({
//             name,
//             email,
//             password: hash,
//             username,
//             mobile
//         })

//         // Sending response
//         res.status(201).json({
//             success: true,
//             message: "User created successfully"
//         })
        
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

export const getUsers = async (req, res) => {
    try {
        // Find Users
        const users = await User.find()

        // Checking conditions
        if(!users){
            return res.status(404).json({
                success: false,
                message: "No user found"
            })
        }
        // Send response
        res.status(200).json({
            success: true,
            users
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
        // Parse id
        // Find user by id
        // Checking conditions
        // Send response
        const id = req.params.id
        const user = await User.findById(id)

        if(!user){
            return res.status(400).json({
                success: false,
                message: "no user found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateUser = async(req, res) =>{
    try{
        const {name, email, password, username, mobile} = req.body

        const id = req.params.id

        if(!name || !email || !password || !username || !mobile) {
            return res.status(400).json({
                success: false,
                message: "please enter all fields"
            })
        }

        const user = await User.findByIdAndUpdate(
            id,
            { name, email, password, username, mobile }
        );

        if(!user){
            res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        else{
            res.status(200).json({
                success: true,
                message: "user updates successfully",
                user
            })
        }
       
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteUser = async (req, res)=>{
    try{
        const {name, email, password, username, mobile} = req.body

        const id = req.params.id

        if(!name || !email || !password || !username || !mobile) {
            return res.status(400).json({
                success: false,
                message: "please enter all fields"
            })
        }

        const user = await User.findByIdAndDelete(id)

        if(!user){
            res.status(404).json({
                success: false,
                message: "user not found"
            })
        } else{
            res.status(200).json({
                success: true,
                message: "user deleted successfully"
            })
        }
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const loginUser = async(req, res) =>{
    try{
        const{email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "please provide email and password"
            })
        }
        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(404).json({
                success: fakse,
                message: "user not found"
            })
        }

        const isMatch = user.comparePassword(password);

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            secure: true,
            httpOnly: true,
            sameSite: "none"
        }

        res.cookie("token", token, options).status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            token
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const myProfile = async (req, res)=>{
    try{

        // token destructring
        const id = req.user
        // finding user
        const user = await User.findById(id);

        // checking user
        if(!user){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        // sending response
        res.status(200).json({
            success: true,
            user 
        })

    } catch(error){
       res.status(500).json({
        success: false,
        message: error.message
       })
    }
}