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
  DialogFooter,
} from "@/components/ui/dialog";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TaskProps {
  task: ITask;
}

const Task = ({ task }: TaskProps) => {
  const router = useRouter();
  const [titleEdit, setTitleEdit] = useState(task.title);
  const [descriptionEdit, setdescriptionEdit] = useState(task.description);
  const [deadlineEdit, setDeadlineEdit] = useState<Date | undefined>(
    task.deadline ? new Date(task.deadline) : undefined
  );

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      title: titleEdit,
      description: descriptionEdit,
      deadline: deadlineEdit ? deadlineEdit.toISOString() : null,
    });
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    router.refresh();
  };

  return (
    <TableRow key={task.id}>
      <TableCell className="font-medium">
        <Link href={`/tasks/${task.id}`}>{task.title}</Link>
      </TableCell>
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
            </DialogHeader>

            <form onSubmit={handleSubmitEditTodo}>
              <div className="model-action">
                <input
                  value={titleEdit}
                  onChange={(e) => setTitleEdit(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-ghost w-full my-5 py-1"
                />

                <input
                  value={descriptionEdit}
                  onChange={(e) => setdescriptionEdit(e.target.value)}
                  type="text"
                  placeholder="Description"
                  className="input input-ghost w-full my-2 py-1"
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal my-2 py-1",
                        !deadlineEdit && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadlineEdit ? (
                        format(deadlineEdit, "PPP")
                      ) : (
                        <span>Pick a Deadline</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deadlineEdit}
                      onSelect={setDeadlineEdit}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <DialogFooter>
                  <DialogClose>
                    <Button className="my-2 py-1">Submit</Button>
                  </DialogClose>
                </DialogFooter>
              </div>
            </form>
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
            </DialogHeader>
            <DialogFooter>
              <div className="modal-action">
                <Button onClick={() => handleDeleteTask(task.id)}>Yes</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default Task;
