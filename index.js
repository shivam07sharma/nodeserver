import express from "express";
import 'dotenv/config'
import mongoose from "mongoose";
const app=express();
const PORT=process.env.PORT;
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
app.get('/',(req,res)=>{
    res.send("First page");
})
const userDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    password:String
});

const users = mongoose.model('users', userDataSchema);


app.get('/userdata', async (req, res) => {
    try {
        const userData = await users.findOne({});

        if (!userData) {
            return res.status(404).json({ message: "User data not found" });
        }

        const processedData = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
        };
        res.json(processedData);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.listen(PORT,()=>{
    console.log("App listening at port "+PORT);
})