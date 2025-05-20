import { getAllTodos } from "@/api";
import Navbar from "@/app/components/Navbar";
import { auth } from "@/auth";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getTaskById(id: string) {
  const tasks = await getAllTodos();
  return tasks.find((task) => task.id === id);
}

export default async function TaskPage({ params }: { params: { id: string } }) {
  const task = await getTaskById(params.id); //task:object|undefined

  if (!task) {
    notFound();
  }

  const session = await auth();

  return (
    <main className="max-w-4xl mx-auto p-4">
      <Navbar />

      {session ? (
        <div className="mt-10">
          <h1 className="text-2xl font-bold mb-6">Task Details</h1>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{task.title}</h2>
            </div>

            <div className="mb-4">
              <h3 className="text-md font-medium mb-1">Description:</h3>
              <p>{task.description || "No description provided"}</p>
            </div>

            {task.deadline && (
              <div className="mb-4">
                <h3 className="text-md font-medium mb-1">Deadline:</h3>
                <p>{new Date(task.deadline).toLocaleDateString()}</p>
              </div>
            )}

            <div className="mt-6">
              <Link href="/" className="text-blue-500 hover:underline">
                Back to Tasks
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
