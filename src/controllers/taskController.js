import Task from '../models/Tasks';
import {getPagination} from '../libs/getPagination';

export const findAllTasks = async (req, res) => {
    try {
      const { title, page, size } = req.query;
  
      const condition = title
        ? { title: { $regex: new RegExp(title), $options: "i" } }
        : {};
  
      const { limit, offset } = getPagination(page, size);
  
      const data = await Task.paginate(condition, { offset, limit });
  
      return res.json({
        totalItems: data.totalDocs,
        tasks: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Something went wrong retrieving the tasks",
      });
    }
  };
  
export const createTask=async(req,res)=>{

    if(!req.body.title){
        return res.status(400).send({message:'content cannot be empty'})
    }

    try {
        const newTask =new Task({
            title:req.body.title,
            description:req.body.description,
            done:req.body.done ? req.body.done :false
        });
        const taskSaved=await newTask.save();
       
        res.json(taskSaved)
    
    } catch (error) {
        res.status(500).json({
            message : error.message || "something goes wrong creating a tasks"
        })
    }
}

export const findOneTask= async(req,res)=>{
    const {id}=req.params;

    try {      
        const taks= await Task.findById(id)     
        if(!taks) return res.status(400)
                            .json({message:`Task with id ${id} does not exists`})
        res.json(taks)      
    } catch (error) {
        res.status(500).json({
            message : error.message || `Error Retriving taks with id:${id}`
        })      
    }
}

export const deleteTask=async(req,res)=>{
    const {id}=req.params;

    try {
        await Task.findByIdAndDelete(id)
        res.json({
            message:'Task were deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message : `Cannot delete task  with id:${id}`
        })  
    }
}

export const finAllDoneTaks=async(req,res)=>{
    try {
        const tasks=await Task.find({done:true});
        res.json(tasks)
    } catch (error) {
        res.status(500).json({
            message : "error"
        })  
    }
}

export const updateTask=async(req,res)=>{
    try {
        const updatedTask= await Task.findByIdAndUpdate(req.params.id,req.body)

        res.json({message:'task was updated'})
    }catch (error) {
        res.status(500).json({
            message : "error"
        })  
    }
}