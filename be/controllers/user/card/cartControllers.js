import { ErrorNotFoundResponse } from "../../../error/errorResponse.js"
import Cart from "../../../models/shop/cartModel.js"
import Rating from "../../../models/shop/ratingModel.js"
function getSizeAndColor(data) {
    let arr = []

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const obj = {name : key, value : data[key].value};
        arr.push(obj);
      }
    }
    return arr
  }

const CartController = {
    getToCart : async (req,res) => {
        try {
            const cart = await Cart.findOne({ userId: req.user.id }).populate({
                path: 'items',
                populate: {
                    path: 'productId',
                    select : 'imdb name  category images.mainImage'
                }
            })    
            res.status(200).json({ cart : cart.items , total : cart.items.length  })
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    },
    getToCartThree : async (req,res) => {
        try {
            const cart = await Cart.findOne({ userId: req.user.id })
                .sort({ createdAt: -1 })
                .populate({
                    path: 'items',
                    populate: {
                        path: 'productId',
                        select: 'imdb name category images.mainImage'
                    }
                })
                .limit(3)
                .exec();
    
                res.status(200).json({
                    cart,
                    total : cart.items.length
                })
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    },
    addCart: async (req, res) => {
        try {
            // console.log(req.body);
            const {productId , quantity , price , salePrice } = req.body
            const attributes = getSizeAndColor(req.body.attributes)
            // const productId  = "67a32fb07162a2947a268b3e"
            // const quantity = 1
            // const price = 3000
            // const salePrice = 1000
            // const attributes = [{
            //     name : "Màu sắc",
            //     value : "Màu Trắng",
            // }]

            const cart = await Cart.findOne({ userId: req.user.id })
         
            if (!cart) {
                const newCart = new Cart({
                    userId : req.user.id,
                    items : [{
                        productId: productId,
                        quantity: quantity,
                        price: price,
                        salePrice: salePrice,
                        attributes: attributes
                    }]
                })
                
               
                if (newCart) {
                    await newCart.save()
                }
            }
            const existingItem = cart.items.find((item) => {
                return (
                    item.productId.equals(productId) 
                    &&  JSON.stringify(item.attributes) === JSON.stringify( attributes)
                );
            });
            console.log(existingItem);
            
            if (existingItem) {
                //nếu sản phẩm đã tồn tại, cập nhật số lượng
                existingItem.quantity += quantity;
            } else {
                //nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
                cart.items.push({
                    productId: productId,
                    quantity: quantity,
                    price: price,
                    salePrice: salePrice,
                    attributes: attributes});  
            }
             
     
            await cart.save();
            res.status(200).json({success: true})
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    },
    removeToCart : async (req,res) => {
        try {
            // console.log(req.body);
            const {productId , attributes } = req.body
            const deleteToCart = await  Cart.findOneAndUpdate(
                {userId : req.user.id},
                { $pull: { items: { productId, attributes: { $in: attributes } } } },
                { new: true }
            )
            if (deleteToCart) {
                res.status(200).json({message: "Delete To Cart success" , success : true})
            }
            else {
                res.status(404).json({ message: "Cart not found", success: false });
            }
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    },
    // removeMultipleFromCart: async (req, res) => {
    //     try {
    //         const { productsToRemove } = req.body; // productsToRemove là một mảng các đối tượng chứa productId và attributes
    //         const userId = req.user.id;
    
    //         // Xóa nhiều sản phẩm khỏi giỏ hàng
    //         const updatedCart = await Cart.findOneAndUpdate(
    //             { userId: userId },
    //             { $pull: { items: { $or: productsToRemove.map(product => ({
    //                 productId: product.productId,
    //                 attributes: { $in: product.attributes }
    //             })) } },
    //             { new: true }
    //         );
    
    //         if (updatedCart) {
    //             res.status(200).json({ message: "Products removed from cart successfully", success: true });
    //         } else {
    //             res.status(404).json({ message: "Cart not found", success: false });
    //         }
    //     } catch (error) {
    //         ErrorNotFoundResponse(res, error);
    //     }
    // },
    
    removeAllCart : async (req,res) => {
        try {
            const deleteAllCart = await  Cart.findOneAndUpdate(
                {userId : req.user.id},
                { items: [] },
                { new: true }
            )
            if (deleteAllCart) {
                res.status(200).json({message: "Delete All To Cart success" , success : true})
            } 
            else {
                res.status(404).json({ message: "Cart not found", success: false });
            }
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    },
    createRatingController: (req, res) => {
        try {
            const ratingFake = {
                ratingId: "67a32fb07162a2947a268b3e",
                userId: req.user.id,
                rating: 5,
                des: "Tuyet Voi",
                status: false
            }

            const createRating = Rating.create(ratingFake)
            console.log(createRating);
            if (createRating) {
                res.status(200).json({
                    messsage: "create done",
                    success: true,
                    createRating
                })
            }

        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    }
}

export default CartController