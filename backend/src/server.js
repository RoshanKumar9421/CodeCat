import express from "express"
import dotenv from "dotenv";
import {ENV} from "./lib/env.js"

dotenv.config();

const app=express()

console.log(ENV.PORT)
console.log(ENV.DB_URL)

app.get("/", (req, res)=>{
    res.status(200).json({msg:"sucess from api "})
});

app.listen(ENV.PORT, ()=>console.log("server is running on port:", ENV.PORT))