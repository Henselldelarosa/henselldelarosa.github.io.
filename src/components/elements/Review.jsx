import StarRatings from "react-star-ratings";

const Review = ({ review: { name, meta, givenreview, image, text } }) => {
  return (
    <div className="review card mt-11 p-4 md:p-5">
      <div className="review-image fiximage relative -mt-14 mb-4 inline-block h-20 w-20 overflow-hidden rounded-full border-4 border-primary md:-mt-16">
        <img
          src={image}
          alt="user image"
          height={80}
          width={80}
        />
      </div>
      <h5 className="mb-0">{name}</h5>
      <p className="mb-2 text-body">
        <small>{meta}</small>
      </p>
      <div className="review-stars mb-3">
        <StarRatings
          rating={Number(givenreview)}
          starRatedColor="#FFD233"
          numberOfStars={5}
          name="rating"
          starSpacing="2px"
          starDimension="18px"
        />
      </div>
      <p>{text}</p>
    </div>
  );
};

export default Review;
