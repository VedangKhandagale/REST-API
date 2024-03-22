const express= require('express')
const router = express.Router()
const Student = require('../models/student')
//Get All
router.get('/',async(req,res)=>{
    try {
        const students = await  Student.find();
        res.json(students)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
//Get One
router.get('/:id', getStudent,(req, res) => {
    res.json(res.student)
})
//Create One
router.post('/', async(req, res) => {
    const student = new  Student ({
        name : req.body.name,
        age: req.body.age,
        grade: req.body.grade
    })
    try{
        const savedStudent = await student.save()
        res.status(201).json(savedStudent)
    }catch(err){
        res.status(400).json({message: err.message})
    }


})
//Update One
router.patch('/:id', getStudent,async(req, res) => {
    if(req.body.name != null ){
        res.student.name = req.body.name
    }
    if(req.body.age != null ){
        res.student.age = req.body.age
    }
    if(req.body.grade != null ){
        res.student.grade = req.body.grade
    }
    try {
        const updatedStudent = await  res.student.save()
        res.json(updatedStudent)
    } catch (err) {
        res.status(400).json({ message: err.message})

        
    }

})
//Delete One
router.delete('/:id',getStudent, async(req, res) => {
    try {
        await  res.student.deleteOne()
        res.json({message:'Deleted student'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

async function getStudent(req, res, next) {
    let student;
    try {
        student = await Student.findById(req.params.id);
        if(student==null) return res.status(404).json({ message: 'cannot find student'})
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
    res.student = student
    next()
}

module.exports = router