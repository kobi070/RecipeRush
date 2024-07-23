import { Schema, model, models, Document } from "mongoose";
// import { IRecipe } from "@utils/interfaces";


// Define the Recipe schema
const RecipeSchema = new Schema({
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
const Recipe = models.Recipe || model("Recipe", RecipeSchema);

export default Recipe;
