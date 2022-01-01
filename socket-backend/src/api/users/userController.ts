import { Data } from "./../../config";
import { getDatabase } from "./../../database";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../schemas/user";
import jwt from "jsonwebtoken";
export const loginUser = async (req: Request, res: Response) => {
  const db = getDatabase();
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "Sufficient data not provided" });
    }

    const isUser = await db.collection<User>("users").findOne({
      email: email,
    });

    if (!isUser) {
      return res.status(404).send({ message: "No User Found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, isUser.password);
    if (isPasswordCorrect) {
      const tokenData: any = {};
      tokenData._id = isUser._id;
      tokenData.userName = isUser.userName;

      const token = jwt.sign(tokenData, Data.JWT_SECRET_TOKEN);
      return res.status(200).send({
        message: " User Found",
        token: token,
        data: {
          userName: isUser.userName,
          email: isUser.email,
        },
      });
    }

    return res.status(404).send({ message: "User noddt found" });
  } catch (error) {
    return res.status(500).send({ message: "Backend lmao ded" });
  }
};

export const signupNewUser = async (req: Request, res: Response) => {
  const db = getDatabase();
  try {
    const { email, password, userName } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).send({ message: "Sufficient data not provided" });
    }
    const isUserAlreadyPresent = await db
      .collection<User>("users")
      .findOne({ email });
    if (isUserAlreadyPresent) {
      return res
        .status(400)
        .send({ message: "User with this email already present!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await db.collection<User>("users").insertOne({
      email,
      password: hashedPassword,
      userName,
    });
    const tokenData: any = {};
    tokenData._id = newUser.insertedId;
    tokenData.userName = userName;

    const token = jwt.sign(tokenData, Data.JWT_SECRET_TOKEN);
    if (newUser) {
      return res
        .status(200)
        .send({ message: "User added successfuly", token: token });
    }
    return res.status(500).send({ message: "Failed to add user" });
  } catch (error) {
    return res.status(500).send({ message: "Failed to add user" });
  }
};
