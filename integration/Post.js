import mongoose from "mongoose";

const Post = new mongoose.Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    time: {type: Date},
    edit: {type: Boolean, default: false}
})

export default mongoose.model('Post', Post)