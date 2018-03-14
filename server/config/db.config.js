import mongoose from "mongoose";
import Promise from "bluebird";
import environment from "./env.json";

export default class DBConfig {
    static init() {

      const URL = (environment.NODE_ENV === "production") ? environment.MONGO_URI
                                                          : environment.MONGO_URI;

      mongoose.Promise = Promise;
      mongoose.connect(URL, { useMongoClient: true });
      mongoose.connection.on("error", console.error.bind(console, "An error ocurred with the DB connection: "));
    }
};
