import UserModel from "../../../models/auth/userModel.js"
import ProductModel from "../../../models/shop/productModel.js"

const Favorite = {
    addToList :  async (req,res) =>{
        try {
            const {id} = req.params
        
            if (id) {
                const products = await ProductModel.findById(id)
                if (products) {
                    const user = await UserModel.findById(req.user.id)
                    if (user) {
                        const index = user.favoriteProducts.findIndex(item => item.toString() === id.toString())
                        if (index === -1) {
                            user.favoriteProducts.push(id)
                            await user.save()
                            res.status(200).json({
                                message : "Thêm sản phẩm thành công",
                                success : true,

                            })
                        } else {
                            res.status(404).json({
                                message : "Sản phẩm đã có trong danh sách",
                                success : false
                            })
                        }
                    }
                }
            } else {
                res.status(402).json({message : "Id not found"})
            }
            
 
        } catch (error) {
            res.status(402).json({
                message : error.message,
                data : null
            })
        }
    },
    checkFavorite: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await UserModel.findById(req.user.id);

            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                    success: false
                });
            }

            const product = await ProductModel.findById(id);

            if (!product) {
                return res.status(404).json({
                    message: "Product not found",
                    success: false
                });
            }

            const isFavorite = user.favoriteProducts.some(item => item.toString() === id.toString());
           
            
            res.status(200).json({
                isFavorite,
                success: true
            });

        } catch (error) {
            res.status(403).json({
                message: error.message,
                data: null
            });
        }
    },
    removeToList : async (req , res ) => {
        try {
            const { id } = req.params;
            const user = await UserModel.findById(req.user.id);
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                    success: false
                });
            }
            const index = user.favoriteProducts.findIndex(item => item.toString() === id.toString())
            if (index === -1) {
                return res.status(404).json({
                    message : "Sản phẩm không có trong danh sách",
                    success : false
                })
            }
            user.favoriteProducts.splice(index, 1)
            await user.save()
            res.status(200).json({
                message : "Xóa sản phẩm yêu thích thành công",
                success : true,

            })
        } catch (error) {
            res.status(403).json({
                message: error.message,
                data: null
            });
        }
    }
}
export default Favorite