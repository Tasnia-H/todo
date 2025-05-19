"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [newTaskValue, setNewTaskValue] = useState("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    });
    setNewTaskValue("");
    router.refresh();
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-full">
          <Button className="w-full">
            Add New Task <FaPlus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmitNewTodo}>
                <div className="model-action">
                  <input
                    value={newTaskValue}
                    onChange={(e) => setNewTaskValue(e.target.value)}
                    type="text"
                    placeholder="Type here"
                    className="input input-ghost w-full my-5 py-1"
                  />
                  <DialogClose>
                    <Button>Submit</Button>
                  </DialogClose>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTask;
