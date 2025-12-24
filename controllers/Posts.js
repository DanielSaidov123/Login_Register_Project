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
    console.log(user.username);

    if (!user) {
      res
        .status(404)
        .send({ err: "username or password is not goood. try again" });
    }
    const postlist = await readPosts();
    const newpost = {
      id: getNextId(postlist),
      title: req.bady.title,
      content: req.bady.content,
      authorId: user.id,
      authorUsername: user.username,
    };
    postlist.push(newpost);
    await writePosts(postlist);
    res.status(200).send(newpost);
  } catch (err) {
    res.status(404).send({ err });
  }
};
