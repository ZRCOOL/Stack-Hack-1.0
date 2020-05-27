const express = require('express')
const {Todo,validateTodo} = require('../models/todo.js')
const middleware = require('../middlewares/middleware')

var router = express.Router()


const middlewareOrder = [middleware.isLoggedIn,middleware.isVerified]

router.get("/todo",middlewareOrder,async (req, res) => {
    try {
        
        const todo = await Todo.find({
            user_id: req.currentUser._id
        })
        res.send({
            success: true,
            message: todo
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Opps! Something went wrong..."
        })
    }
})

router.post("/todo",middlewareOrder,async (req, res) => 
    {
        try {
            var input = {
                task_title,
                label,
                due_date,
                priority,
            } = req.body
            const {error} = validateTodo(input)
    
            if(error)
            return res.status(400).send({
                success: false,
                message: error.details[0].message
              });
            input.user_id = req.currentUser._id
            const todo = new Todo(input)
            await todo.save()
            res.send({
                success: true,
                message: todo
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success: false,
                message: "Opps! Something went wrong..."
            })
        }


    })


module.exports = router