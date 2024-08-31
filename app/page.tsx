import { NavMenu } from "@/src/components/NavMenu";
import CreateTaskModal from "@/src/components/DailyTasks/CreateTaskModal";
import DeleteTaskModal from "@/src/components/DailyTasks/DeleteTaskModal";
import EditTaskModal from "@/src/components/DailyTasks/EditTaskModal";
import { TaskDetail } from "@/src/components/DailyTasks/TaskDetail";
import ViewTaskModal from "@/src/components/DailyTasks/ViewTaskModal";
import { FloatingButton } from "@/src/components/UI/FloatingButton";
import { createWeekdays, getTaskByUser } from "@/src/logic/fetchFunctions";

export default async function Home() {
  const tasks = await getTaskByUser();

  //await createWeekdays()

  return (
    <>
      <div className="flex">
        <header>
          <NavMenu />
        </header>
        {tasks?.length ? (
          <section className="mx-auto my-auto overflow-y-auto h-[34rem] w-8/12 shadow-2xl rounded-lg bg-[#d9c5b2] dark:bg-[#5c5c5c] dark:shadow-none p-6">
            <h1 className="text-3xl font-black text-terciary text-center mb-4 dark:text-whited">
              Tareas diarias:{" "}
            </h1>
            <div className="grid grid-cols-2 items-center justify-around gap-6">
              {tasks?.map((task) => (
                <TaskDetail key={task._id} task={task} />
              ))}
            </div>
          </section>
        ) : <p className="text-2xl font-black text-center dark:text-whited">No hay tareas aun</p>}
        <FloatingButton />
      </div>
      <CreateTaskModal />
      <ViewTaskModal />
      <EditTaskModal />
      <DeleteTaskModal />
    </>
  );
}
