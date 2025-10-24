import crypto from "node:crypto";

import bcrypt from "bcrypt";
import DBLocal from "db-local";

import { SALT_ROUNDS } from "./config.js";

const { Schema } = new DBLocal({ path: "./database" });

const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export class UserRepository {
  //* CREACION DE USUARIO
  //* -------------------------
  static async create([username, password]) {
    Validation.username(username);
    Validation.password(password);

    // Verificar que no exista el usuario
    const user = User.findOne({ username });
    if (user) {
      throw new Error("El nombre de usuario ya existe.");
    }

    // Generar id único para el usuario
    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    password = hashedPassword;

    // Guardas el usuario en la base de datos
    User.create({ _id: id, username, password }).save();
    return id;
  }

  //* LOGIN DE USUARIO
  //* -------------------------
  static async login([username, password]) {
    Validation.username(username);
    Validation.password(password);

    const user = User.findOne({ username });
    if (!user) {
      throw new Error("El nombre de usuario no existe.");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Nombre de usuario o contraseña incorrectos.");
    }

    const { password: _, ...publicUser } = user;

    return publicUser;
  }
}

class Validation {
  static username(username) {
    if (typeof username !== "string" || username.length < 3) {
      throw new Error(
        "El nombre de usuario debe ser una cadena de al menos 3 caracteres."
      );
    }
  }
  static password(password) {
    if (typeof password !== "string" || password.length < 6) {
      throw new Error(
        "La contraseña debe ser una cadena de al menos 6 caracteres."
      );
    }
  }
}
