export interface FeedbackType {
    id: string,
    user: {
        image: {
            fileName: string | null,
            imageUrl: string | null,
        },
        _id: string,
        name: string
    },
    recipeId: string,
    rating: number,
    comment: string,
}