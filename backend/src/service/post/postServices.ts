import post from '../../models/postModel';
import ErrorMessageEnum from '../../utils/enums/ErrorMessageEnum';
import { IPost } from '../../utils/interface/IPost';
import user from '../../models/userModel'

//create post

const createPost = async (data: IPost) => {
    try {
        const newPost = new post({
            ...data,
        });
        await newPost.save();
        return newPost;
    } catch (error) {
        throw error;
    }
};

// update post

const updatePost = async (id: string, body: IPost) => {
    try {
        const updatedPost: any = await post.findById(id);
        if (updatedPost.userId === body.userId) {
            await post.updateOne(body);
            return updatedPost;
        } else {
            throw new Error(ErrorMessageEnum.UPDATE_ONLY_POST);
        }
    } catch (error) {
        throw error;
    }
};

// delete post 

const deletePost = async (id: string, body: IPost) => {
    try {
        const deletedPost: any = await post.findById(id);
        if (deletedPost.userId === body.userId) {
            await post.deleteOne();
            return deletedPost;
        } else {
            throw new Error(ErrorMessageEnum.YOU_CAN_DELETE_ONLY_YOUR_POST);
        }
    } catch (error) {
        throw error;
    }
};

//like and dislike posts

const likeAndDislike = async (id: string, body: IPost) => {
    try {
        const Post: any = await post.findById(id);
        if (!Post.likes.includes(body.userId)) {
            await Post.updateOne({ $push: { likes: body.userId } });
        } else {
            await Post.updateOne({ $pull: { likes: body.userId } });
        }

        return post;
    } catch (error) {
        throw error;
    }
};

//get post

const getPost = async (id: string) => {
    try {

        const Post = await post.findById(id);
        return Post;
    } catch (error) {
        throw error;
    }
}

//get  timeline  post
const getTimelinePosts = async (username: string) => {
    try {
        const currentUser: any = await user.findOne({ username: username });
        const userPosts = await post.find({ userId: currentUser.id });
        const timelinePosts = await Promise.all(
            currentUser.followings.map((friendId: any) => {
                return post.find({ userId: friendId });
            })
        );

        return userPosts.concat({ ...timelinePosts });
    } catch (error) {
        throw error;
    }
};

//get all posts

const getAllPosts = async () => {

    try {
        const Post = await post.aggregate([{ $sample: { size: 40 } }]);
        return Post;
    } catch (error) {
        throw error;
    }
};

export { createPost, updatePost, deletePost, likeAndDislike, getPost, getTimelinePosts, getAllPosts };
