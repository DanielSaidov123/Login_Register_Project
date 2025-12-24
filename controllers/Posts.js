import {
  getNextId,
  readPosts,
  readUsers,
  validateUser,
  writePosts,
  writeUsers,
} from "../utils/index.js";

export const GetPosts = async (req, res) => {
  try {
    res.status(200).send(await readPosts());
  } catch (err) {
    res.status(500).send({ err });
  }
};

export const CreatePost = async (req, res) => {
  try {
    const user = await validateUser(req.body.username, req.body.password);

    if (!user) {
      return res
        .status(401)
        .send({ err: "username or password is not good. try again" });
    }

    if (!req.body.title || !req.body.content) {
      return res.status(400).send({ err: "missing title or content" });
    }

    const postlist = await readPosts();

    const newpost = {
      id: getNextId(postlist),
      title: req.body.title,
      content: req.body.content,
      authorId: user.id,
      authorUsername: user.username,
    };

    postlist.push(newpost);
    await writePosts(postlist);

    res.status(201).send(newpost);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

export const UpdetPost = async (req, res) => {
  try {
    const user = await validateUser(req.body.username, req.body.password);

    if (!user) {
      return res
        .status(401)
        .send({ err: "username or password is not good. try again" });
    }

    if (!req.body.title || !req.body.content) {
      return res.status(400).send({ err: "missing title or content" });
    }
    const postlist = await readPosts();

    const id = req.params.id;
    const post = postlist.find((p) => p.id == id);

    (post.title = req.body.title || post.title),
      (post.content = req.body.content || post.content),
    await writePosts(postlist);

    res.status(201).send(postlist);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};


export const DeletePost = async (req, res) => {
  try {
    const user = await validateUser(req.body.username, req.body.password);

    if (!user) {
      return res
        .status(401)
        .send({ err: "username or password is not good. try again" });
    }

    const postlist = await readPosts();
    const id = req.params.id;

    const index = postlist.findIndex((p) => p.id == id);

    if (index === -1) {
      return res.status(404).send({ err: "post not found" });
    }

    const post = postlist[index];

    if (post.authorId !== user.id) {
      return res.status(403).send({ err: "not allowed to delete this post" });
    }

    postlist.splice(index, 1);
    await writePosts(postlist);

    res.status(200).send(post);  
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

