import express from 'express';
import { createProductComment, getProductComment } from '../../controllers/shop/commentController.js';


const commentRouter = express.Router();

commentRouter.post('/add', createProductComment);
commentRouter.get('/:productId', getProductComment);

export default commentRouter