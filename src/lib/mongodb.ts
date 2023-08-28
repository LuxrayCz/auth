import mongoose from "mongoose";

const Schema = mongoose.Schema;
mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!);
mongoose.Promise = global.Promise;

const userModel = () => {
  const schema = new Schema(
    {
      username: { type: String, unique: true, required: true },
      hash: { type: String, unique: true, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.hash;
    },
  });

  return mongoose.models.User || mongoose.model("User", schema);
};
export const db = {
  User: userModel(),
};
