export default function NewLinkButton({ newLinkHandler }) {
  return (
    <button
      onClick={newLinkHandler}
      className="px-2 py-1 mt-4 border-violet-600 border-2 rounded-xl text-violet-600 hover:bg-violet-600 hover:text-white transition-all"
    >
      Create new link
    </button>
  );
}
