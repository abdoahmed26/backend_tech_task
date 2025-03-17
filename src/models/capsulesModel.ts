import mongoose from "mongoose";

const capsuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    },
    release_date:{
        type: Date,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const Capsules = mongoose.model('Capsule', capsuleSchema)

export default Capsules