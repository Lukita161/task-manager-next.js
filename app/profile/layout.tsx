import { NavMenu } from "@/src/components/NavMenu";
import { ProfileTab } from "@/src/components/Profile/Tab";

export default function ProfileLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
        <div className="flex min-w-full md:w-screen lg:flex-1">
        <NavMenu />
        
        <main className="md:h-screen w-screen">
        <div className="w-full h-3/4 flex justify-center pt-8">
            <div className="flex flex-col">
              <ProfileTab />
                <section className="flex flex-col mt-8">
                {children}
                </section>
            </div>
        </div>
        </main>
        </div>
        </>
    )
  }