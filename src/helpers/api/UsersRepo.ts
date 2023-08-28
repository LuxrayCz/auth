import { db } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const User = db.User;

const authenticate = async ({ username, password }: { username: string; password: string }) => {
  const user = await User.findOne({ username: username });
  if (!(user && bcrypt.compareSync(password, user.hash))) {
    throw "Username or password is incorrect";
  }
  const token = jwt.sign({ sub: user.id }, process.env.JWT_KEY!, { expiresIn: "1d" });
  return {
    ...user.toJSON(),
    token,
  };
};
const getAll = async () => {
  const users = await User.find();
  return users;
};
const getById = async (id: string | null) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("Could not find user");
  }
  return user;
};

const create = async (user: userParams) => {
  const { username, password, firstName, lastName } = user;
  if (await User.findOne({ username })) {
    throw `Username ${username} is already taken`;
  }
  const hash = await bcrypt.hashSync(password, 10);
  const newUser = new User({ username, hash, firstName, lastName });
  await newUser.save();
  return newUser;
};

const update = async (id: string, params: params) => {
  const user = await User.findById(id);
  if (!user) {
    return new Response("User not found");
  }

  if (user.username !== params?.username && (await User.findOne({ username: params.username }))) {
    return new Response(`Username ${params.username} is already taken`);
  }

  if (params.hash) {
    params.hash = bcrypt.hashSync(params.hash, 10);
  }

  Object.assign(user, params);

  await user.save();
  return new Response("OK");
};

const _delete = async (id: string | null) => {
  await User.findByIdAndDelete(id);
};

export const userRepo = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
