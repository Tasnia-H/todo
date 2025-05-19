import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const tasks = await getAllTodos();

  return (
    <main className="max-w-4xl mx-auto">
      <Navbar />
      {session ? (
        <>
          <div className="text-center my-10">
            <h1 className="text-2xl font-bold my-10">Todo List!</h1>
            <AddTask />
          </div>
          <TodoList tasks={tasks} />
        </>
      ) : (
        <></>
      )}
    </main>
  );
}
