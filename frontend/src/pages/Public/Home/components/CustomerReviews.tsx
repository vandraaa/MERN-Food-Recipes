import Container from "../../../../components/container/Container";

type ReviewType = {
  id: number;
  name: string;
  comment: string;
  rating: number;
  imageUrl: string;
};

const reviews: ReviewType[] = [
  {
    id: 1,
    name: "Sarah Williams",
    comment:
      "The recipes are so easy to follow! I've made dishes that my whole family loves.",
    rating: 5,
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "John Smith",
    comment:
      "Great variety of recipes! The step-by-step instructions are super helpful.",
    rating: 5,
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Emma Johnson",
    comment:
      "I tried the trending recipes, and they turned out amazing. Highly recommend!",
    rating: 4,
    imageUrl: "https://via.placeholder.com/50",
  },
];

export default function CustomerReviews() {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center">
          What Our Users Say
        </h2>
        <p className="text-sm sm:text-base text-gray-600 text-center mb-8">
          You can also add your own review
        </p>
        <div className="flex flex-row flex-wrap md:grid md:grid-cols-1 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-hidden scrollbar-hide">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="w-full md:w-auto flex-shrink-0 bg-white bg-opacity-60 shadow-sm my-2 p-6 rounded-lg flex flex-col items-center text-center duration-300 ease-in-out hover:bg-opacity-100 hover:-translate-y-2 hover:shadow-lg"
            >
              <img
                src={review.imageUrl}
                alt={review.name}
                className="md:w-12 md:h-12 w-10 h-10 lg:w-16 lg:h-16 rounded-full object-cover mb-4"
              />
              <h3 className="text-sm sm:text-lg font-medium">{review.name}</h3>
              <p className="text-[10px] sm:text-sm text-gray-600 w-3/4 md:w-2/3">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
