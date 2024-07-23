import { Schema } from "mongoose";
import { FormEvent } from "react";

interface PostRecipe {
  _id?: string;
  creator?: {
    username: string;
  };
  tag: string;
  recipe: string;
}

interface RecipeCardProps {
  post: PostRecipe[];

  handleEdit: (post: any) => void;
  handleDelete: (post: any) => Promise<void>;
  handleTagClick: (tagName: string) => void;
}

interface RecipeCardListProps {
  data: PostRecipe[];

  handleTagClick: (tagName: string) => void;
}

interface IRecipe extends Document {
  creator: {
    type: Schema.Types.ObjectId;
    ref: "User";
  };
  prompt: string;
  tag: string;
}

interface IUser extends Document {
  email: {
    type: string;
    unique: [boolean, string];
    required: [boolean, string];
  };
  username: {
    type: string;
    unique: [boolean, string];
    required: [boolean, string];
  };
  image?: string; // Optional field
}

interface ProfileProps {
  name: string;
  desc: string;
  data: [];
  handleEdit: (post: any) => void;
  handleDelete: (post: any) => Promise<void>;
}

// Define the connection options interface for TypeScript
interface ConnectOptions {
  dbName: string;
  useNewUrlParser: boolean;
  // useUnifiedTopology?: boolean; // Uncomment if you want to use it
}

interface FormProps {
  type: string;
  post: {
    prompt: string;
    tag: string;
  };
  setPost: React.Dispatch<
    React.SetStateAction<{ prompt: string; tag: string }>
  >;
  submitting: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

// Define the types for the request and parameters
interface Params {
  id: string;
};

export type {
  PostRecipe as Post,
  RecipeCardProps,
  RecipeCardListProps,
  IRecipe,
  IUser,
  ProfileProps,
  ConnectOptions,
  FormProps,
  Params,
};
