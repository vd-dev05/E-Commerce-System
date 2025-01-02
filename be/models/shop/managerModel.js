import mongoose from "mongoose";

const managerSchema = mongoose.Schema({
    logo: String,
    manager_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    manager_name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'manager'
    }
}, { timestamps: true }
)

const ManagerModel = mongoose.model('manager', managerSchema)

export default ManagerModel