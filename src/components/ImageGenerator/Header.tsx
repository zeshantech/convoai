"use client";

import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-background sticky top-0 z-10 flex h-14 items-center gap-1 border-b px-4">
      <h1 className="text-xl font-semibold">Playground</h1>
    </header>
  );
};

export default Header;
