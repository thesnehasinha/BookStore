import express from 'express';
import mongoose from 'mongoose';
// import cors from 'cors';
import Book from './models/bookModel';
import dotenv from 'dotenv';
dotenv.config();

//Middlewares
const app = express();
app.use(express.json());
// app.use(cors());

//Routes
app.get('/', (req, res) => {res.send('Welcome to MERN Backend')});
app.post('/addbook',async(req,res)=>{
    const{title, author, genre, publishedDate} = req.body;

    const newBook = new Book({title,author,genre,publishedDate});

    try{
        await newBook.save();
        res.status(201).json({message: "Book is added successfully"});
    }
    catch(error){
        res.status(400).json({message: "Book couldn't be added",error: error.message});
    }
})


// DB connection and Server Startup 
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Database connected successfully");
    app.listen(process.env.PORT,(err)=>{
    if (err) console.log("Server couldn't run");

    console.log('My server is running fine');
});
})
.catch(()=>{
    console.log("DB not connected")
})



