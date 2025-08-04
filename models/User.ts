// models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for a User document
export interface IUser extends Document {
  email: string;
  password: string; // This will store the hashed password
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Export the Mongoose model. If the model already exists, use it; otherwise, create it.
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
