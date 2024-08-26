import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="w-screen h-screen grid grid-cols-2 relative"> 
            <Image fill objectFit="cover" src={'/wave-haikei-big.svg'} alt="Imagen de fondo" />
            <section className="absolute top-0 left-0 right-0 bottom-0 flex justify-center h-full">
                {children}
            </section>
        </main>
    )
  }