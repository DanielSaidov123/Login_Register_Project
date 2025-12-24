import fs from 'fs/promises'



export async function readFromFile(fileName) {
  try {
    const data = await fs.readFile(fileName, "utf8");
    const arr = JSON.parse(data);
    return arr
  } catch (err) {
    console.error("Error reading from file:", err);
    return null;
  }
}


export async function writeToFile(fileName, data) {
  try {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2), "utf8");
    console.log("File written successfully");
  } catch (err) {
    console.error("Error writeing from file:", err);
  }
}

export const getNextId = (todos) => {
  if (!todos || todos.length === 0) {
    return 1;
  }
  let maxValue = 0;
  todos.forEach((todo) => {
    if (todo.id > maxValue) {
      maxValue = todo.id;
    }
  });
  return maxValue + 1;
};

export  async function readUsers() { 
    return await readFromFile('data/users.json')
 }


export  async function  writeUsers(data) { 
    return await writeToFile('data/users.json',data)
}


export  async function readPosts() { 
    return await readFromFile('data/posts.json')
 }


export  async function  writePosts(data) { 
    return await writeToFile('data/posts.json',data)
}


export async function validateUser(username, password) {
  const users = await readUsers();
  const user = users.find(u => u.username === username && u.password === password);
  return user;
}