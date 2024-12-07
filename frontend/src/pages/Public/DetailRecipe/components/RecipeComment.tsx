import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { FeedbackType } from "../lib/type";
import { FaStar } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

interface RecipeCommentsProps {
  data: FeedbackType[];
}

interface DecodedToken {
  id: string;
}

export default function RecipeComments({ data }: RecipeCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const handleDelete = (commentId: string) => {
    console.log(`Deleting comment with id: ${commentId}`);
  };

  const renderStars = (rating: number, interactive = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
          onClick={interactive ? () => setNewRating(i) : undefined}
          style={interactive ? { cursor: "pointer" } : undefined}
        />
      );
    }
    return stars;
  };

  return (
    <div className="mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Comments ({data.length})
        </h2>
      </div>

      {data.length === 0 && <p className="text-gray-600">No comments yet.</p>}

      <div className="space-y-4">
        {data.map((feedback) => (
          <div
            key={feedback.id.toString()}
            className="p-4 border border-gray-300 rounded-lg shadow-md flex items-start gap-4 relative"
          >
            <div className="absolute top-0 right-0">
              {userId === feedback.user._id && (
                <div className="relative" ref={menuRef}>
                  <button
                    className="text-gray-500 hover:text-gray-800 p-2 rounded-full absolute top-2 right-2"
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === feedback.id ? null : feedback.id
                      )
                    }
                  >
                    <FiMoreHorizontal size={24} />
                  </button>
                  {openMenuId === feedback.id && (
                    <div className="absolute right-5 top-8 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <button
                        onClick={() => handleDelete(feedback.id)}
                        className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 text-red-500"
                      >
                        <MdDelete size={20} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <img
              src={feedback.user?.image.imageUrl || "/default-profile.jpg"}
              alt={feedback.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">
                    {feedback.user.name}
                  </p>
                  <p className="text-sm text-gray-500 flex gap-x-1">
                    {renderStars(feedback.rating)}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-gray-600">{feedback.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 border border-gray-300 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Add a Comment
        </h3>
        <div className="flex gap-4 items-center">
          <div className="flex gap-x-1">{renderStars(newRating, true)}</div>
          <input
            type="text"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-black"
          />
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-black transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
