import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITask } from "@/types/tasks";
import Task from "./Task";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList = ({ tasks }: TodoListProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Tasks</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
