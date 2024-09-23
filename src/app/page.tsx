import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-color bg-black border border-dotted border-green-400">
      <header className="p-4 border border-dotted border-green-400 flex gap-5 justify-between items-center">
        <div className="font-bold text-2xl text-green-400 green-glow">
          PrepPal
        </div>
        <div className="flex gap-5 pr-4">
          <div>Login</div>
          <div>Contact</div>
          <div>Home</div>
        </div>
      </header>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="min-h-screen flex-1 flex justify-center items-center flex-col">
          <div className="font-bold text-4xl text-green-400">
            For last minute studies
          </div>
          <div className="font-bold text-2xl pb-5">Convert notes to cheatsheets</div>
          <label className="flex items-center justify-center w-58 p-2 bg-green-400 text-black border border-green-400 rounded cursor-pointer hover:bg-green-500 transition-colors">
            <input type="file" className="hidden" />
            <span className="font-bold">Upload Files</span>
          </label>
        </div>

      </div>
    </div>
  );
}
