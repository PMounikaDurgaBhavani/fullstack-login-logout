const express=require('express');
const authentication=require('../middlewares/authenticate');
const {postTask,getTask,deleteTask,updateTask}=require('../controllers/task');

const router=express.Router();

router.post("/tasks",authentication,postTask);
router.get("/tasks",authentication,getTask);
router.delete("/tasks/:id",authentication,deleteTask);
router.put("/tasks/:id",authentication,updateTask);

module.exports=router;