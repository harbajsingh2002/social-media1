import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const PostSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4()
        },
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            max: 500,
        },
        img: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const posts = mongoose.model("Post", PostSchema);
export default posts