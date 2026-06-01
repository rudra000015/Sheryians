



const express = require("express");
const noteModel = require("./models/notes.model")
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors()); 
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));






app.post("/notes", async (req,res)=>{
    try {
        if(!req.body || !req.body.title || !req.body.description) {
            return res.status(400).send({
                msg:"Title and description are required",
                received: req.body
            })
        }
        const title = req.body.title;
        const description = req.body.description;

        const note = await noteModel.create({
            title:title,
            description:description
        })
        res.status(200).send({
            msg:"post created",
            note
        })
    } catch(err) {
        res.status(500).send({
            msg:"Error creating note",
            error:err.message
        })
    }
})



app.get("/notes" , async(req,res)=>{
    const notes = await noteModel.find();

  res.status(200).json({
    msg:"got the notes",
    notes
  })

})


app.delete("/notes/:id",async (req,res)=>{
    const id = req.params.id;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        msg:"deleted successfully"
    })
})


app.patch("/notes/:id" ,async (req,res)=>{
    const id = req.params.id;
const description = req.body.description;
    await noteModel.findByIdAndUpdate(id ,{description});
    res.status(200).json({
        msg:"updated successfully"
    })
})

app.use((req,res)=>{
      const filePath = path.join(__dirname, "..", "public", "index.html");
      res.sendFile(filePath, (err) => {
            if(err) {
                  res.status(500).json({msg:"Public folder not found. Make sure to build and copy frontend files.", error: err.message})
            }
      })
})


module.exports = app