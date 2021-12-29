import { getDatabase } from "./../../database";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../schemas/user";
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
      return res.status(200).send({
        message: " User Found",
        data: {
          name: isUser.name,
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
    const { email, password, name } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ message: "Sufficient data not provided" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await db.collection<User>("users").insertOne({
      email,
      password: hashedPassword,
      name,
    });

    if (newUser) {
      return res.status(200).send({ message: "User added successfuly" });
    }
    return res.status(500).send({ message: "Failed to add user" });
  } catch (error) {
    return res.status(500).send({ message: "Failed to add user" });
  }
};
