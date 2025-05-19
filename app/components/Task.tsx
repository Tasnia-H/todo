"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { Button } from "@/components/ui/button";

interface TaskProps {
  task: ITask;
}

const Task = ({ task }: TaskProps) => {
  const router = useRouter();
  const [taskEdit, setTaskEdit] = useState(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskEdit,
    });
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    router.refresh();
  };

  return (
    <TableRow key={task.id}>
      <TableCell className="font-medium">{task.text}</TableCell>
      <TableCell className="float-right flex gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary checkbox-xs"
          onClick={() => handleDeleteTask(task.id)}
        />

        <Dialog>
          <DialogTrigger>
            <FaEdit className="text-primary size-4" cursor="pointer" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                <form onSubmit={handleSubmitEditTodo}>
                  <div className="model-action">
                    <input
                      value={taskEdit}
                      onChange={(e) => setTaskEdit(e.target.value)}
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

        <Dialog>
          <DialogTrigger>
            <FaRegTrashAlt className="text-error size-4" cursor="pointer" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="my-5">
                Are you sure you want to delete this task?
              </DialogTitle>
              <DialogDescription>
                <div className="modal-action">
                  <Button onClick={() => handleDeleteTask(task.id)}>Yes</Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default Task;
