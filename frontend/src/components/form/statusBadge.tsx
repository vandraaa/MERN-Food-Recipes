interface BadgeProps {
  status: string;
}

const StatusBadge = ({ status }: BadgeProps) => {
  const getBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "draft":
        return "bg-gray-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "approved":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <span
      className={`px-5 py-1 text-sm font-medium rounded-xl ${getBadgeColor(
        status
      )}`}
    >
      {status.toUpperCase()}
    </span>
  );
};


export default StatusBadge;