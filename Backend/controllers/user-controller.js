const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')
const { fields } = require('../constants.js')


// GET all users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

//GET all users whose 'designation' is 'Manager'
const getManagers = asyncHandler(async (req, res) => {
    const users = await User.find({ designation: 'Manager' });
    res.status(200).json(users);
});

//POST user
const createUser = asyncHandler(async (req, res) => {
    const body_fields = Object.keys(req.body);

    //Checks all fields(keys) are present in request body 
    //(checks if two arrays content same)
    for (const v of new Set([...fields, ...body_fields])) {
        if (fields.filter(e => e === v).length !== body_fields.filter(e => e === v).length) {
            res.status(401);
            throw new Error('All fields are madatory!')
        }
    };

    const { email } = req.body;
    const avilableUSer = await User.findOne({ email })
    if (avilableUSer) {
        res.status(403)
        throw new Error('Email is already registered!')
    }
    //Encrypt the password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create(req.body)
    if (user) {
        res.status(201).json({
            id: user.id,
            email: user.email
        })
    }
    else {
        res.status(404)
        throw new Error('User data is not valid')
    }
});

//----------------------------------------------------------------------------------

//GET single users
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    res.status(200).json(user);
});

//----------------------------------------------------------------------------------

//POST
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401)
        throw new Error('All fields are mandatory!')
    }
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404)
        throw new Error('Email is not Registered!')
    }
    else if (user && await bcrypt.compare(password, user.password.toString())) {
        const accesstoken = jwt.sign({
            user: {
                id: user.id,
                email: user.email,
                empID: user.empID,
                fname: user.fname,
                lname: user.lname,
                workLocation: user.workLocation,
                designation: user.designation,
                address: user.address,
                user_type: user.user_type
                //add more fields acc. to need after completing backend then we will use it now we use getUser
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '120min' }
        );

        res.status(200).json({ message: 'Logged In Successfully.', id: user.id, accesstoken });
    }
    else {
        res.status(401)
        throw new Error('Password is Incorrect')
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404)
        throw new Error('User not Found')
    }
    await User.deleteOne({ _id: user.id })
    res.status(200).json(user)
});

//PUT
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const user = await User.findById(req.user.id);        //directly get from token_validator middleware

    if (!user) {
        res.status(404)
        throw new Error('User not Found')
    }
    else if (user && await bcrypt.compare(password, user.password.toString())) {
        res.status(403)
        throw new Error('This is your old password!')
    }

    //Encrypt the password
    user.password = await bcrypt.hash(password, 10);
    // console.log(password)

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        user,
        { new: true }            //IMP
    );
    res.status(200).json(updatedUser)
});

//PUT : update user type (req.params.empID)
const updateUserType = asyncHandler(async (req, res) => {
    const { user_type } = req.body;
    if (!user_type) {
        res.status(401)
        throw new Error('All fields are mandatory!')
    }
    const user = await User.findOne({ empID: req.params.empID })

    if (!user) {
        res.status(404)
        throw new Error('User not Found')
    }
    user.user_type = user_type;
    const updatedUser = await User.findByIdAndUpdate(
        user.id,                 //as we have only empID in params
        user,
        { new: true }            //IMP
    );
    res.status(200).json(updatedUser)

});

const updateDesignation = asyncHandler(async (req, res) => {
    const { designation } = req.body;
    if (!designation) {
        res.status(401)
        throw new Error('All fields are mandatory!')
    }
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404)
        throw new Error('User not Found')
    }
    user.designation = designation;
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        user,
        { new: true }            //IMP
    );
    res.status(200).json(updatedUser)
});

//PUT
const forgotPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404)
        throw new Error('User not Found')
    }
    else if (user && await bcrypt.compare(password, user.password.toString())) {
        res.status(403)
        throw new Error('This is your old password!')
    }

    //Encrypt the password
    user.password = await bcrypt.hash(password, 10);
    // console.log(password)

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        user,
        { new: true }            //IMP
    );
    res.status(200).json(updatedUser)
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = { getUsers, getManagers, createUser, getUser, loginUser, deleteUser, resetPassword, updateUserType, updateDesignation, forgotPassword, currentUser }