import { db } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
const User = db.User;

const authenticate = async ({ username, password }: { username: string; password: string }) => {
  //FIND USER
  const user = await User.findOne({ username: username });
  // CHECK IF IT MATCH
  if (!(user && bcrypt.compareSync(password, user.hash))) {
    throw "Username or password is incorrect";
  }
  const responseUser = {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    updatedAt: user.updatedAt,
  };

  const JWT_EXPIRES_IN = 6000;

  //CREATE TOKEN
  const token = jwt.sign({ sub: user.id }, process.env.JWT_KEY!, { expiresIn: JWT_EXPIRES_IN });

  //SET COOKIES OPTIONS
  const cokie_max_age = JWT_EXPIRES_IN * 5;
  const cookiesOptions = {
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV !== "development",
    maxAge: cokie_max_age,
  };

  //CREATE RESPONSE
  const response = new NextResponse(
    JSON.stringify({
      user: responseUser,
      status: "success",
      token,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );

  await Promise.all([
    response.cookies.set(cookiesOptions),
    response.cookies.set({
      name: "logged-in",
      value: "true",
      maxAge: cokie_max_age,
    }),
  ]);

  return response;
};
const getAll = async () => {
  const users = await User.find();
  return users;
};
const getById = async (id: string | null) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return new Response("could not find user", { status: 404 });
    }
    return user;
  } catch (error) {
    return new Response("could not find user", { status: 404 });
  }
};
const getByUsername = async (username: string) => {
  try {
    const user: UserFromDb | null = await User.findOne({ username });
    if (!user) {
      return new Response("could not find user", { status: 404 });
    }
    return user;
  } catch (error) {
    return new Response("could not find user", { status: 404 });
  }
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

  Object.assign(user, params);

  await user.save();
  return new Response("OK");
};
const update2 = async (id: string, params: params) => {
  const updatedUser = await User.findByIdAndUpdate(id, params, { new: true });
  return updatedUser;
};

const _delete = async (id: string | null) => {
  await User.findByIdAndDelete(id);
};

const verifyPassword = async (password: string, hash: string) => {
  const verified = await bcrypt.compareSync(password, hash);
  console.log(verified);
  return verified;
};

export const userRepo = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getByUsername,
  verifyPassword,
  update2,
};
