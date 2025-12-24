import {
  getNextId,
  readPosts,
  readUsers,
  validateUser,
  writePosts,
  writeUsers,
} from "../utils/index.js";

export const GetUsers = async (req, res) => {
  try {
    const users = await readUsers();

    const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);

    res.status(200).send(usersWithoutPasswords);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};


export const UpdateProfile = async (req, res) => {
  try {
    const { username, password, email, newPassword } = req.body;

    const user = await validateUser(username, password);
    if (!user) {
      return res.status(401).send({ err: "invalid credentials" });
    }

    const users = await readUsers();
    const index = users.findIndex((u) => u.username === username);

    if (index === -1) {
      return res.status(404).send({ err: "user not found" });
    }

    if (email) users[index].email = email;
    if (newPassword) users[index].password = newPassword;

    await writeUsers(users);

    const { password: _, ...userWithoutPassword } = users[index];
    res.status(200).send(userWithoutPassword);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

export const DeleteAccount = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await validateUser(username, password);
    if (!user) {
      return res.status(401).send({ err: "invalid credentials" });
    }

    // מחיקת משתמש
    const users = await readUsers();
    const filteredUsers = users.filter((u) => u.username !== username);
    await writeUsers(filteredUsers);

    // בונוס: מחיקת כל הפוסטים שלו
    const posts = await readPosts();
    const filteredPosts = posts.filter(
      (p) => p.authorId !== user.id
    );
    await writePosts(filteredPosts);

    res.status(200).send({ msg: "account deleted successfully" });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};
