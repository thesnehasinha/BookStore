import mongoose from "mongoose";
 const bookSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        author:{
            type: String,
            required: true,
        },
        genre:{
            type: String,
            required: true,
        },
        publishedDate:{
            type: Number,
            required: true,
            min: [1000, "Published year cannot be before 1000"],
            max: [new Date().getFullYear(), "Published Year cannot be later than the current year"]
        }
    }
 )

 const Book = mongoose.model('Book',bookSchema);

 export default Book;