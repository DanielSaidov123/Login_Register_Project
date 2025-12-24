import {
  getNextId,
  readUsers,
  writeUsers,
} from "../utils/index.js";

export const CreateCurses = async (req, res) => {
  try {
    if (!req.body.username) {
      return res.status(404).send({ msg: "username is not goood" });
    }
    const listsuser = await readUsers();
    const us = listsuser.find((u) => u.username === req.body.username);
    if (us) {
      return res.status(404).send({ msg: "username is not goood. try again" });
    }
    const newuser = {
      id: getNextId(listsuser),
      username: req.body.username,
      email: req.body.email || "",
      password: "",
    };
    listsuser.push(newuser);
    await writeUsers(listsuser);
    res.status(200).send(newuser);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const Connectiontest = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res
        .status(404)
        .send({ msg: "You have not entered a password or username." });
    }
    const listsuser = await readUsers();
    const user = listsuser.find(
      (u) =>
        u.username === req.body.username && u.password === req.body.password
    );
    if (!user) {
      return res
        .status(404)
        .send({ msg: "username or password is not goood. try again" });
    }

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(404).send(err);
  }
};

