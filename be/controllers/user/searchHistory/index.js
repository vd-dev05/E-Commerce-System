import UserModel from "../../../models/auth/userModel.js";
import Search from "../../../models/shop/searchModel.js";

const SearchController = async (req, res) => {
    try {
        // const {search} = req.body
        if (!req.body.search){
            throw new Error("Search can't be empty");
        }
        const search = await Search.create({userId : req.user.id, search : req.body.search,  status : false})
        if (search) {        
            const updateSearchUser = await UserModel.findByIdAndUpdate(req.user.id, { $push: {  historySearch :search._id  } }).select('historySearch')
            if (!updateSearchUser) throw new Error("Something went wrong while updating address");
            res.status(201).json({ message: "Search created successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSearch = async (req, res) => {
    try {
        const search = await Search.find({userId : req.user.id})
        .populate({path : "userId", select : "name"})
        .sort({createdAt : -1})
        .limit(3)
        .select('search status _id') 
        if (!search) throw new Error("No search found");
        res.status(200).json({ search, message: "Search found successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export default SearchController