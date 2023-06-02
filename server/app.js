const express = require("express");
const mongoose = require("mongoose");
const studentSchema = require("./models/studentDetails");
var bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const port = 5000;


app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.options("*", cors());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000
  })
);
mongoose.connect('mongodb://localhost:27017/studentDetails', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.get("/test", async (req, res) => {
    res.json("hiii");
  });

  app.get("/studenDetails", async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
  
    try {
      // execute query with page and limit values
      const posts = await studentSchema.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      // get total documents in the Posts collection
      const count = await studentSchema.countDocuments();
  
      // return response with posts, total pages, and current page
      res.json({
        posts,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (err) {
      console.error(err.message);
    }
  });

  app.post("/addStudents", function(req, res){
    const newUser = new studentSchema({
        id: req.body.id,
        name: req.body.name,
        totolmarks: req.body.totolmarks,
        age: req.body.age
    });

    newUser.save().then(()=>{
        res.send("saved");
    }).catch((err)=>{
        console.log(err);
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));