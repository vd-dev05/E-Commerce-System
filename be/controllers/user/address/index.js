import Address from "../../../models/shop/addressModel.js";
import mongoose, { get } from "mongoose";

const AddressProfile = {
    createAddress: async (req, res) => {
        try {

            const { address, phone, name } = req.body;
            if (!address) return res.status(400).json({ message: "Address is required" });
            if (!phone) return res.status(400).json({ message: "Phone number is required" });

            const data = {
                _id: new mongoose.Types.ObjectId(),
                userId: req.user.id,
                name: name || req.user.name,
                phone: phone,
                address: address,
                is_default: false,
                status: false
            }
            const newAddress = await Address.create(data);
            if (!newAddress) throw new Error("Something went wrong while creating address");
            if (newAddress) {
                res.status(201).json({ message: "Address created successfully" });

            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateAddress: async (req, res) => {
        try {
            // console.log(req.params.id);
            // console.log(req.body);
            if (req.body.status === false) {
              
                const updateAllddress = await Address.updateMany({ userId: req.user.id }, { is_default: false });
                if (!updateAllddress) throw new Error("Something went wrong while updating address");
                if (updateAllddress) {
                    const updateAddress = await Address.findByIdAndUpdate(req.params.id, {is_default : true});
                    if (!updateAddress) throw new Error("Something went wrong while updating address");
                    res.status(201).json({ message: "Address updated successfully", success : true });
                }
          
              
            } 
            if (req.body.status === true) {
                const updateAddress = await Address.findByIdAndUpdate(req.params.id, { name : req.body.name, phone : req.body.phone, address : req.body.address,});
                if (!updateAddress) throw new Error("Something went wrong while updating address");
                res.status(201).json({ message: "Address updated successfully", success : true });
            }
           
            
        } catch (error) {
            console.log(error);
            
            res.status(500).json({ message: error.message });
        }
    },
    getAddress: async (req, res) => {
        try {
            const address = await Address.find({ userId: req.user.id });
            if (!address) throw new Error("No address found");
            res.status(200).json({ address, message: "Address found successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
export default AddressProfile;