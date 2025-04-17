import express from 'express'
import { router } from './router/index.js'
import cors from 'cors'
import { db,port } from './config/config.js'
import ConneetToDB from './config/db.js'
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/", router)


try {
    ConneetToDB(db) && app.listen(port, ()=> console.log("Server is Running in the Port 3000"))
 
} catch (error) {

    console.log("Error While Starting the Server",error)
}
