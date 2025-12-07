import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { review: testimonial, user_photoURL, userName, user_email } = review;
  return (
    <div className=" max-w-xs mx-auto p-6 bg-base-100 rounded-xl shadow-sm border border-base-200">
      <FaQuoteLeft className="text-3xl text-primary mb-4" />
      <p>{testimonial}</p>
      <div className="border-t border-dashed border-base-300 my-4"></div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-full">
          <img src={user_photoURL} alt="" />
        </div>
        <div>
          <h4 className="font-semibold text-secondary">{userName}</h4>
          <p className="text-sm text-secondary">{user_email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
