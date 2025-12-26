import express from "express"
import dotenv from "dotenv";
import path from "path"

import {ENV} from "./lib/env.js"
import { connectDB } from "./lib/db.js";

dotenv.config();
console.log("DB_URL loaded:", process.env.DB_URL ? "YES" : "NO");


const app=express()

const __dirname=path.resolve()

app.get("/", (req, res)=>{
    res.status(200).json({msg:"sucess from api "})
});

app.get("/books", (req, res)=>{
    res.status(200).json({msg:"this is book endpoin"})
});


//make our app ready for deployment
if(ENV.NODE_ENV=="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/{*any}", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}



const startServer = async()=>{
    try{
        await connectDB();
        app.listen(ENV.PORT, ()=>console.log("server is running on port:", ENV.PORT));
        } catch(error){
            console.error("Error starting the server", error);
        }
};

startServer();
    
// const startServer = async () => {
//   await connectDB();

//   app.listen(ENV.PORT, () => {
//     console.log("server is running on port:", ENV.PORT);
//   });
// };

// startServer();
