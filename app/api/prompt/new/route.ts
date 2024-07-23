import Recipe from "@models/recipe";
import { connectToDB } from "@utils/database";

export const POST = async (request: Request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectToDB();
    const newRecipe = new Recipe({ creator: userId, prompt, tag });

    await newRecipe.save();
    return new Response(JSON.stringify(newRecipe), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
