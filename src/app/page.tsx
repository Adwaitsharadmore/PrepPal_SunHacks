  import Image from "next/image";

  export default function Home() {
    return (
      <div className="min-h-screen bg-color bg-#f6f1eb">
        <header className="p-4 gap-[500px] flex items-center rounded-full">
          <div className="font-bold text-3xl text-black font-inter pl-3">PrepPal</div>
          <div className="flex gap-5 pl-10 pr-10 items-center bg-black p-2.5 rounded-full text-white shadow-lg custom-shadow">
            <div>Login</div>
            <div>Contact</div>
            <div>Home</div>
          </div>
        </header>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="min-h-screen flex-1 flex justify-center items-center flex-col">
            <div className="font-extrabold text-6xl text-black-400 font-inter">
              For last minute
              <span className="font-bold text-6xl" style={{ color: "#a7ece3" }}>
                {" "}
                studies
              </span>
            </div>
            <div className="font text-2xl pb-5 pt-2">
              Convert notes to cheatsheets
            </div>
            <label className="flex items-center justify-center w-58 p-4 bg-black text-white border rounded-full cursor-pointer hover:bg-green-500 transition-colors">
              <input type="file" className="hidden" />
              <span className="font-bold">Upload Files</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
