const CommonButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick} // ✅ This is the fix
      className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition duration-200"
    >
      {text}
    </button>
  );
};

export default CommonButton;
