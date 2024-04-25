import { message, statusCode } from '../../utils/commonFunction/constant';
import { messageEnum } from '../../utils/enums/messageEnum';
import {
    createPost,
    updatePost,
    deletePost,
    likeAndDislike,
    getPost,
    getTimelinePosts,
    getAllPosts,
} from './postServices';
import { Request, Response } from 'express';

//create post
async function createPostController(req: Request, res: Response) {
    try {
        const newPost = await createPost(req.body);
        res.status(statusCode.success).json({
            newPost,
            message: messageEnum.POST_CREATED_SUCCESSFULL,
        });
    } catch (err) {
        console.log(err);
        res.status(statusCode.serverError).json({
            message: messageEnum.POST_CREATED_FAILD,
            err,
        });
    }
}

// update post

async function updatePostController(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        const body = req.body;
        const updatedPost = await updatePost(userId, body);
        res.status(statusCode.success).json({
            updatedPost,
            message: messageEnum.POST_UPDATED_SUCCESSFULLY,
        });
    } catch (err) {
        console.log(err);
        res.status(statusCode.serverError).json({
            message: messageEnum.POST_UPDATED_FAILED,
            err,
        });
    }
}

//delete post

async function deletePostController(req: Request, res: Response) {
    try {
        const userId: any = req.params.id;
        const body = req.body;
        const deletedPost = await deletePost(userId, body);
        res.status(statusCode.success).json({
            deletedPost,
            message: messageEnum.POST_DELETE_SUCCESSFULLY,
        });
    } catch (err) {
        console.log(err);
        res.status(statusCode.serverError).json({
            message: messageEnum.POST_DELETION_FAILED,
            err,
        });
    }
}

//like and dislike  post

async function likeAndDislikeController(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const body = req.body;
        const post = await likeAndDislike(id, body);
        res.status(statusCode.success).json({
            post,
            message: messageEnum.POST_LIKE_DISLIKE,
        });
    } catch (err) {
        console.log(err);
        res.status(statusCode.serverError).json({
            message: messageEnum.POST_LIKE_DISLIKE_ACTION_FAILED,
            err,
        });
    }
}

// get post

async function getPostController(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const post = await getPost(id);
        res.status(statusCode.success).json({
            post,
            message: messageEnum.POST_HAS_BEEN_FATCH_SUCCESSFULL,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: messageEnum.POST_FATCH_FAILED,
            err,
        });
    }
}

// get timeline

async function getTimelinePostsController(req: Request, res: Response) {
    try {
        const username = req.params.username;
        const posts = await getTimelinePosts(username);
        res.status(statusCode.success).json({
            posts,
            message: messageEnum.TIMELIN_POST_HAS_BEEN_FATCH,
        });
    } catch (err) {
        console.log(err);
        res.status(statusCode.serverError).json({
            message: messageEnum.TIMELINE_POST_FATCHING_FAILED,
            err,
        });
    }
}

//get all post

async function getAllPostsController(req: Request, res: Response) {
    try {
        const posts = await getAllPosts();
        res.status(200).json({
            posts,
            message: 'Posts have been fetched Successfully',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Posts fetch failed',
            err,
        });
    }
}

export default {
    createPostController,
    updatePostController,
    deletePostController,
    likeAndDislikeController,
    getPostController,
    getTimelinePostsController,
    getAllPostsController
};
