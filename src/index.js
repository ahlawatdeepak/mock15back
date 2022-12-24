const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const connect = require("../Connect/Connect")
const req = require("express/lib/request")
const PORT = process.env.PORT || 8000
mongoose.set('strictQuery', true)
const {UserModal,tickeModal,bookmarkModal}=require("../Models/data.model")



const app = express()
app.use(express.json())
app.use(cors())

app.get("/",async(req,res)=>{
     try {
         let data=await UserModal.find()
         res.send({data:data})
        
     } catch (error) {
        res.status(501).send(error.message)
     }
})



app.post("/signup",async(req,res)=>{
    try {
       const data = await UserModal.create(req.body)
       res.send({message:"Signup successfully",data:data})
    } catch (error) {
        res.status(501).send({message:error.message})
    }
})


app.post("/login",async(req,res)=>{
     
      

      try {
        
        const {email,password}=req.body
        let data=await UserModal.findOne({email,password})
        if(data){
            res.send({message:"login successfully",data:data})
        }
        else{
            res.status(400).send({message:"User Not found"})
        }

      } catch (error) {
        res.status(501).send(error.message)
      }


})




app.post("/tickets",async(req,res)=>{
      let {category,title,message}=req.body
      console.log(category,title,message)
    try {
          let time=new Date().getTime()
          let all={...req.body,time}
          console.log(all)
        let data=await tickeModal.create(all)

        res.send({message:"ticket created successfully",data:data})
        
    } catch (error) {
        res.status(501).send({message:"error.message"})
    }
      
})


app.get("/ticket",async(req,res)=>{
           
    const {sort='asc',filter}=req.query


      if(filter){
             try {
                let data2=await tickeModal.find({category:filter}).sort({['time']:sort==='asc' ? 1 : -1})
                res.send({data:data2})
             } catch (error) {
                res.status(501).send(error.message)
             }
      }
else{
    try {
           
        let data2=await tickeModal.find({}).sort({['time']:sort==='asc' ? 1 : -1})
        res.send({data:data2})
      
    


} catch (error) {
    res.status(501).send(error.message)
}
}

   
})






app.post("/bookmark",async(req,res)=>{
  
  try {
        console.log(req.body)
      let data=await bookmarkModal.create(req.body)

      res.send({message:"bookmark created successfully",data:data})
      
  } catch (error) {
      res.status(501).send({message:"error.message"})
  }
    
})
app.get("/bookmark",async(req,res)=>{
    try {
        let data=await bookmarkModal.find()
        
        res.send({data:data})
  
  
    } catch (error) {
        res.status(501).send(error.message)
    }
  })







app.listen(PORT, async () => {
    await connect()
    console.log(`Database Connected and app listening on port ${PORT}`)
})