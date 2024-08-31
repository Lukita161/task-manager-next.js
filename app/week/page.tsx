

import { NavMenu } from "@/src/components/NavMenu";
import CreateNewWeekTask from "@/src/components/WeekTasks/CreateNewWeekTask";
import { CreateNewWeekTaskButton } from "@/src/components/WeekTasks/CreateNewWeekTaskButton";
import { getWeekTasks } from "@/src/logic/fetchFunctionForWeekTasks";

export default async function WeekPage() {
  const weekTasks = await getWeekTasks()
  return (
    <>
    <div className="flex">
    <header>
      <NavMenu />
    </header>
   <CreateNewWeekTaskButton />
    <table>
      <thead>
        <tr>
          <th>Lunes</th>
          <th>Martes</th>
          <th>Miercoles</th>
					<th>Jueves</th>
					<th>Viernes</th>
					<th>Sabado</th>
					<th>Domingo</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    </div>
    <CreateNewWeekTask />
    </>
  );
}
