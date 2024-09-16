export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-screen h-screen bg-[url(/stacked-waves-haikei.svg)] bg-cover">
      <div className="w-screen h-screen flex items-center justify-center">
        <section className="flex w-full justify-center h-4/5 items-center">
          {children}
        </section>
      </div>
    </main>
  );
}
