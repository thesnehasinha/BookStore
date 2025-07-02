import express from 'express';
import Book from '../models/bookModel.js'

const router = express.Router();

router.post('/addbook',async(req,res)=>{
    const {title,author,genre,publishedDate} = req.body;

    const newBook = new Book({title,author,genre,publishedDate});
    try{
        await newBook.save();

        // res.status(201).send("Book is added successfully");
        res.status(201).json({message:"Book is added successfully"})
    }
    
    catch(error){
        // res.status(400).send("Book Couldnot be added");
        res.status(400).json({message:"Book Couldnot be added",error:error.message});
    }
})
router.get('/addbook',async(req,res)=>{
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const skip = (page-1)*limit;
        const books = await Book.find().skip(skip).limit(limit);
        const totalBooks = await Book.countDocuments();
        const totalPages = Math.ceil(totalBooks / limit);

        res.status(200).json({
            books,
            pagination: {
                currentPage: page,
                totalBooks: totalBooks,
            },
        });
    } catch (error) {
        res.status(500).json({message: 'Error fetching book',error: error.message });
    }
});

// Get all books with pagination
router.get('/allbooks', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const books = await Books.find().skip(skip).limit(limit);
        const totalBooks = await Books.countDocuments();
        const totalPages = Math.ceil(totalBooks / limit);

        res.status(200).json({
            books,
            pagination: {
                currentPage: page,
                totalPages,
                totalBooks
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching the books", error: error.message });
    }
});

// DELETE a book by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }

        const deletedBook = await Books.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
});
router.put('/Book/:id', async (req,res)=>{
    try{
        const {id} = req.params;

        const updatedBookData = req.body;

        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({message: 'Invalid Book ID'});
        }

        const updatedBook = await Books.findByIdAndUpdate(id, updatedBookData, {new:true});

        if(!updatedBook) res.status(404).json({message: 'Book Not found'});

        res.status(200).json(updatedBook,{message: "Book updated Successfully"});
    }
    catch(error){
        res.status(500).json({message: 'Error updating the book', error: error.message});
    }
});


export default router;