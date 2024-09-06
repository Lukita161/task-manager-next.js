
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="w-screen h-screen bg-[url(/wave-haikei-big.svg)] bg-cover"> 
            <section className="flex w-full justify-end h-full">
                {children}
            </section>
        </main>
    )
  }