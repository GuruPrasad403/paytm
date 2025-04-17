import express from 'express'
import { router } from './router/index.js'
import cors from 'cors'
import { db,port } from './config/config.js'
import ConneetToDB from './config/db.js'
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/", router)

app.get("/", (req,res,next)=>{
    try {
    res.status(200).json({
        msg:"This is an Backend"
    }) 
    } catch (error) {
        next(error)
    }
})
// Handle errors
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: status
        }
    });
    next()
});
try {
    ConneetToDB(db) && app.listen(port, ()=> console.log("Server is Running in the Port 3000"))
 
} catch (error) {

    console.log("Error While Starting the Server",error)
}
