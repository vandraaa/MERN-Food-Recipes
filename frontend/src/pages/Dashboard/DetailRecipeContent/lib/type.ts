export interface IngredientsType {
  _id: string;
  name: string;
  quantity: string;
}

export interface StepsType {
  _id: string;
  step_number: string;
  instruction: string;
}

export interface RecipeDetailType {
  id: string;
  user: {
    name: string;
    email: string;
    image: {
      imageUrl: string;
    };
  };
  category: {
    name: string;
    _id: string;
  }
  title: string;
  description: string;
  image: {
    imageUrl: string;
  };
  servings: number;
  cooking_time: number;
  ingredients: IngredientsType[];
  steps: StepsType[];
}
