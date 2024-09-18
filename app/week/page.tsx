

import { NavMenu } from "@/src/components/NavMenu";
import SettingsModal from "@/src/components/SettingsModal";
import { FloatingButton } from "@/src/components/UI/FloatingButton";
import CreateNewWeekTask from "@/src/components/WeekTasks/CreateNewWeekTask";
import DeleteWeekTaskModal from "@/src/components/WeekTasks/DeleteWeekTask";
import EditWeekTaskModal from "@/src/components/WeekTasks/EditWeekTasksModal";
import ViewWeekTaskmodal from "@/src/components/WeekTasks/ViewWeekTaskModal";
import { WeekTasksList } from "@/src/components/WeekTasks/WeekTasksList";
import { getWeekTasks } from "@/src/logic/fetchFunctionForWeekTasks";

export default async function WeekPage() {

  const weekTasks = await getWeekTasks()

  if(weekTasks) return (
    <>
    <div className="flex mt-0">
    <header className="sticky">
      <NavMenu />
    </header>
    <section className="overflow-x-scroll ml-6 rounded-md ">
      <WeekTasksList tasks={weekTasks} />
    </section>
    </div>
    <CreateNewWeekTask />
    <ViewWeekTaskmodal />
    <DeleteWeekTaskModal />
    <EditWeekTaskModal />
    <SettingsModal />
    <FloatingButton />
    </>
  );
}
