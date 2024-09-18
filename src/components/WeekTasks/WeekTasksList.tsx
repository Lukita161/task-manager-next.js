import { WeekTasks } from "@/src/types";
import { WeekTaskCard } from "./WeekTaskCard";
import { dayStyle, dayTranslation } from "@/src/utils";

type WeekTasksListProps = {
  tasks: WeekTasks;
};
type GroupedTasks = { [key: string]: WeekTasks };

const dayGroupsTasks: GroupedTasks = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

export const WeekTasksList = ({ tasks }: WeekTasksListProps) => {
  const dayTasks = tasks?.reduce((acc, task) => {
    let currentGroup = acc[task.day] ? [...acc[task.day]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.day]: currentGroup };
  }, dayGroupsTasks);

  return (
    <section className="flex flex-col mt-5">
      <h1 className="text-3xl font-black mb-6 text-gray-800 dark:text-whited">
        Tareas de la semana:{" "}
      </h1>
      <div className="flex gap-5 h-full 2xl:overflow-auto pb-32">
      
        {Object.entries(dayTasks).map(([day, tasks]) => (
          <>
            <div key={day} className="min-w-[200px] 2xl:min-w-0 2xl:w-1/5 ">
              <h3
                className={`border-b-4 ${dayStyle[day]} capitalize text-xl text-center font-bold text-gray-800 dark:text-whited`}
              >
                {dayTranslation[day]}
              </h3>
              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3 dark:text-gray-300">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => (
                    <WeekTaskCard task={task} key={task._id} />
                  ))
                )}
              </ul>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};
