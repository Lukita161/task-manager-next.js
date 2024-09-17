
import { NavMenu } from "@/src/components/NavMenu";

export default function TaskLayout ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)  {

    return (
        <>
        <div className="flex min-w-full md:w-screen lg:flex-1">
        <NavMenu />
        
        <main className="md:h-screen">
            {children}
        </main>
        </div>
        </>
    )
  }