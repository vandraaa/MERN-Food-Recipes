import { useState } from "react";
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
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxctjU21pUENIsGN1F4qY21P7GfdEbhTMp2g&s",
  },
  {
    id: 2,
    name: "John Smith",
    comment:
      "Great variety of recipes! The step-by-step instructions are super helpful.",
    rating: 5,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&s",
  },
  {
    id: 3,
    name: "Allison Davis",
    comment:
      "I tried the trending recipes, and they turned out amazing. Highly recommend!",
    rating: 4,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6mz361MwZnFbSjpU4lFmfMT_u2fEdZmCamizTkcgzr8PJkrWx4tkGGarCsNBPBMU7Qyg&usqp=CAU",
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
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </Container>
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewType }) {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className="w-full md:w-auto flex-shrink-0 bg-white bg-opacity-60 shadow-sm my-2 p-6 rounded-lg flex flex-col items-center text-center duration-300 ease-in-out hover:bg-opacity-100 hover:-translate-y-2 hover:shadow-lg"
    >
      <div
        className={`${
          loading ? "animate-pulse bg-gray-200" : ""
        } md:w-12 md:h-12 w-10 h-10 lg:w-16 lg:h-16 rounded-full overflow-hidden`}
      >
        <img
          src={review.imageUrl}
          alt={review.name}
          className={`object-cover w-full h-full ${loading ? "hidden" : ""}`}
          onLoad={() => setLoading(false)}
        />
      </div>
      <h3 className="text-sm sm:text-lg font-medium mt-4">{review.name}</h3>
      <p className="text-[10px] sm:text-sm text-gray-600 w-3/4 md:w-2/3">
        {review.comment}
      </p>
    </div>
  );
}
