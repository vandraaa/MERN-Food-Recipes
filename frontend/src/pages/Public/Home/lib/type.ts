export interface TrendingRecipeType {
  id: string;
  user: {
    image: {
      fileName: string;
      imageUrl: string;
    };
    _id: string;
    name: string;
  };
  title: string;
  description: string;
  image: {
    fileName: string;
    imageUrl: string;
  };
  servings: number;
  cooking_time: number;
  category: {
    _id: string;
    name: string;
  };
}
