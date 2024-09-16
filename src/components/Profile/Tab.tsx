"use client";

import { tabs } from "@/src/data/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ProfileTab = () => {
  const pathname = usePathname();
  return (
    <nav className="space-x-3">
      {tabs.map((element) => (
        <Link
          className={`${
            pathname === element.href &&
            "border-b-2 border-b-blue-500 shadow-inner"
          } p-4 rounded-md shadow font-medium hover:shadow-lg inline-flex gap-2 transition-shadow dark:bg-gray-200 dark:text-gray-800`}
          href={element.href}
          key={element.href}
        >
          {element.name}
          <element.icon className={`${pathname === element.href ? 'text-blue-500' : 'text-gray-500 hover:text-gray-600'} w-6 h-6`}/>
        </Link>
      ))}
    </nav>
  );
};
