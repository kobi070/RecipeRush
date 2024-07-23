import { Schema, model, models, Document } from "mongoose";
// import { IRecipe } from "@utils/interfaces";


// Define the Recipe schema
const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

// Create or get the Recipe model
const Prompt = models.Recipe || model("Recipe", PromptSchema);

export default Prompt;
