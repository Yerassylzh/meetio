import toast from "react-hot-toast";

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-white text-lg font-medium">Team meeting</h3>
      <button
        className="text-white/80 hover:text-white transition-colors text-sm"
        onClick={async () => {
          const url = typeof window !== "undefined" ? window.location.href : "";
          await navigator.clipboard.writeText(url);
          toast.success("Meeting link copied to clipboard");
        }}
      >
        Share
      </button>
    </div>
  );
}
