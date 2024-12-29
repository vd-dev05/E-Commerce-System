import AddressModel from "../../models/addressModel.js";

const addAddress = async (req, res) => {
    try {

        const { userId, address, city, pincode, phone, notes } = req.body;

        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.json({
                success: false,
                message: 'Invalid data provide!'
            })
        }

        const newAddress = AddressModel({
            userId, address, city, pincode, phone, notes
        })

        await newAddress.save();

        res.json({
            success: true,
            message: 'Address created successfully!',
            data: newAddress
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const fetchAllAddress = async (req, res) => {
    try {
        const { userId } = req.params
        if (!userId) {
            return res.json({
                success: false,
                message: 'User id is required!'
            })
        }
        const address = await AddressModel.find({ userId })

        res.json({
            success: true,
            data: address
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const updateAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params;
        const formData = req.body

        if (!userId || !addressId) {
            return res.json({
                success: false,
                message: 'User and address id is required!'
            })
        }

        const address = await AddressModel.findOneAndUpdate({
            _id: addressId, userId
        }, formData, { new: true })

        if (!address) {
            return res.json({
                success: false,
                message: 'Address not found'
            })
        }
        res.json({
            success: true,
            message: 'Address updated successfully!',
            data: address
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const removeAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        if (!userId || !addressId) {
            return res.json({
                success: false,
                message: 'User and address id is required!'
            })
        }
        const address = await AddressModel.findOneAndDelete({ _id: addressId, userId })

        if (!address) {
            return res.json({
                success: false,
                message: 'Address not found'
            })
        }

        res.json({
            success: true,
            message: 'Address deleted successfully!'
        })


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { addAddress, fetchAllAddress, updateAddress, removeAddress }