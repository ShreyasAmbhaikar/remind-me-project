"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { MoonIcon, SunIcon, DesktopIcon } from "@radix-ui/react-icons";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mount, setMount] = useState(false);

  // useEffect only runs only the client, so we can safely show the UI
  // in this trick we are avoiding hydration errors
  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) {
    return null;
  }

  return (
    <Tabs defaultValue={theme}>
      <TabsList className="border dark:border-neutral-800 dark:bg-[#030303]">
        <TabsTrigger value="light" onClick={(e) => setTheme("light")}>
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={(e) => setTheme("dark")}>
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-al dark:rotate-0" />
        </TabsTrigger>
        <TabsTrigger value="system" onClick={(e) => setTheme("system")}>
          <DesktopIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ThemeSwitcher;
