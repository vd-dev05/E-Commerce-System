import { SearchTop } from "../../../config/index.js";
import ProductModel from "../../../models/shop/productModel.js";
import Search from "../../../models/shop/searchModel.js";

const TopSearch = {
    getAllTopSearch: async (req, res) => {
        const response = await Search.aggregate([
            {
                $group: {
                    _id: "$search",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    search: "$_id",
                    count: 1,
                    _id: 0
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 10
            }
        ]);
        const mappedResponse = response.map(item => ({
            ...item,
            search: mapSearchTerm(item.search),
        }));
        
    
        
        res.status(200).json({ mappedResponse, message: "Top search found successfully" });

    },
}
const mapSearchTerm = (searchTerm) => {
    return SearchTop[searchTerm] || searchTerm; // Trả về giá trị ánh xạ hoặc giữ nguyên nếu không tìm thấy
};
export default TopSearch