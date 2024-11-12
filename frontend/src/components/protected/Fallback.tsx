export default function Fallback() {
    return (
        <div className="h-screen bg-slate-200 flex justify-center items-center flex-col">
             <div className="loader border-4 border-black border-t-transparent rounded-full w-8 h-8 animate-spin" />
             <div className="mt-3">
                <p className="text-sm text-black font-medium">Loading...</p>
             </div>
        </div>
    );
}