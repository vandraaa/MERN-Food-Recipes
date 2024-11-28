import Container from "../../../../components/container/Container";
import Image from "../../../../assets/images/newsletter-image.jpg";

export default function BecomeAuthor() {
  return (
    <div className="bg-white py-8 sm:py-12">
      <Container>
        <div className="flex flex-col md:flex-row w-full">
          <img
            src={Image}
            className="w-full md:w-[40%] lg:w-[60%] md:rounded-l-3xl md:rounded-r-none rounded-t-3xl object-cover"
            alt="image"
          />
          <div className="w-full md:w-[60%] lg:w-[40%] flex flex-col justify-center bg-[#8a1c1c] rounded-b-3xl md:rounded-l-none md:rounded-r-3xl px-8 py-8">
            <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-4xl font-semibold text-white">
              Become Our Author
            </h2>
            <p className="text-sm sm:text-base md:text-sm lg:text-base text-white mt-1">
              Share your recipes with Vandra Kicthen and help us grow
            </p>
            <button className="bg-white text-[#8a1c1c] md:px-4 lg:py-2 py-1.5 px-3 mt-4 rounded-lg w-1/2 md:w-1/2 lg:w-1/4 font-medium md:text-base text-sm">
              Apply Now
            </button>
            <div className="mt-6 md:mt-8">
              <p className="text-xs sm:text-sm text-white w-4/5">
                By becoming an author, you'll get access to exclusive features
                and be part of a growing community of food enthusiasts.
              </p>
              <p className="text-xs sm:text-sm font-medium text-white underline mt-2 inline-block"
              >
                Learn more about becoming an author
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
