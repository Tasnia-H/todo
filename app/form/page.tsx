import Navbar from "../components/Navbar";
import { auth } from "@/auth";
import Form1 from "../components/Form1";
import Form2 from "../components/Form2";
import Form3 from "../components/Form3";
import Multistepform from "../components/Multistepform";

const page = async () => {
  const session = await auth();
  return (
    <main className="max-w-4xl mx-auto pt-2 px-20 h-screen bg-white">
      <Navbar />
      {session ? <Multistepform /> : <></>}
    </main>
  );
};

export default page;
