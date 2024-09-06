import { WeekTask } from "@/src/types";
import { ExpansiveMenu } from "../DailyTasks/ExpansiveMenu";

type WeekTaskCardProps = {
  task: WeekTask;
};
export const WeekTaskCard = ({ task }: WeekTaskCardProps) => {
  return (
    <div className="p-5 h-full flex gap-2 bg-whited rounded-lg border border-gray-300 shadow hover:bg-[#D9B99A] hover:shadow-lg transition-colors">
      <div className="flex flex-col justify-center text-gray-600">
        <h2 className="text-xs mr-2">{task.startTime}</h2>
        <p className="text-xs mr-2">hasta</p>
        <h2 className="text-xs mr-2">{task.endTime}</h2>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-gray-800">{task.name}</h1>
          <h3 className="text-sm font-medium text-gray-600">
            {task.description}
          </h3>
        </div>
        <div className="flex items-start">
          <ExpansiveMenu taskId={task._id} />
        </div>
      </div>
    </div>
  );
};
