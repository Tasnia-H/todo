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
import { FaPlus } from "react-icons/fa";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState<Date | undefined>(
    undefined
  );

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      title: newTaskTitle,
      description: newTaskDescription,
      deadline: newTaskDeadline ? newTaskDeadline.toISOString() : null,
    });
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskDeadline(undefined);
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
          </DialogHeader>

          <form onSubmit={handleSubmitNewTodo}>
            <div className="model-action">
              <input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                type="text"
                placeholder="Title"
                className="input input-ghost w-full my-2 py-1"
              />

              <input
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
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
                      !newTaskDeadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newTaskDeadline ? (
                      format(newTaskDeadline, "PPP")
                    ) : (
                      <span>Pick a Deadline</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newTaskDeadline}
                    onSelect={setNewTaskDeadline}
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
    </div>
  );
};

export default AddTask;
