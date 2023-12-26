const asyncHandler = require('express-async-handler');
const Task = require('../models/task.model.js');
const Users = require('../models/user.model.js');
const sendTaskMail = require('../utils/sendTaskMail.js');

//GET current Users Tasks
const getTasksByUserId = asyncHandler(async(req,res)=> {    
    const tasks = await Task.find({user_id: req.user.id}) //from token_validation
    res.status(200).json(tasks);
});

//POST Task
const createTask = asyncHandler(async (req, res) => {
    try{
        const { user_id, assignedBy, task } = req.body
        if (!user_id || !assignedBy || !task) {
            res.status(400)
            throw new Error('All fields are mandatory!');
        }
        
        const TaskObj = await Task.create(req.body);
        const userDetails = await Users.findById(user_id);

        sendTaskMail({
            receipientEmail: userDetails.email,
            receipientName: `${userDetails.fname} ${userDetails.lname}`,
            task,
            managerName: assignedBy
        });

        if (!TaskObj) {
            res.status(404)
            throw new Error('Request body is not found!');
        }
        return res.status(200).json(TaskObj)
    }catch(error){
        res.status(500).json({ error: error.message , status: "FAILED"});
    }
});

//GET Task by id (task's obj id)
const getTaskById = asyncHandler(async(req,res)=> {    
    const task = await Task.findById(req.params.id)  //from token_validation
    res.status(200).json(task)
});

module.exports = {getTasksByUserId, createTask, getTaskById}