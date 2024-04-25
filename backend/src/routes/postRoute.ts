import express from 'express';
const router = express.Router();
import postController from "../service/post/postController";
import authenticate from "../middleware/auth";

// create post

router.post("/createPost", authenticate, (req, res) => postController.createPostController(req, res));
//update post 
router.patch("/updatePost/:id", authenticate, (req, res) => postController.updatePostController(req, res));
// delete post
router.delete("/deletePost/:id", authenticate, (req, res) => postController.deletePostController(req, res));
// like dislike post
router.put("/like/:id", authenticate, (req, res) => postController.likeAndDislikeController(req, res));
// get post by Id 
router.get("/getPost/:id", authenticate, (req, res) => postController.getPostController(req, res));
// get Timeline post 
router.post("/getTimelinePost/:username", authenticate, (req, res) => postController.getTimelinePostsController(req, res));
// get all posts
router.get("/getAllPost", authenticate, (req, res) => postController.getAllPostsController(req, res));



export default router;