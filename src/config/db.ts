import mongoose from "mongoose";
export const connectDB = ()=>{
    mongoose.connect(process.env.DATABASE_URL as string)
    .then(()=>{
        console.log("connected to database")
    })
    .catch((err)=>{
        console.log(err)
        process.exit(1)
    })
}