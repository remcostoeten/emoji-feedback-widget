"use cient";
import React from "react";
import useLocalStorage from "@/core/hooks/useLocalStorage";

const ClearLocalStorageButton: React.FC = () => {
  const [, setStoredValue] = useLocalStorage("yourKey", "");

  const handleClearStorage = () => {
    setStoredValue("");
    window.localStorage.clear();
  };

  return <button onClick={handleClearStorage}>Clear Local Storage</button>;
};

export default ClearLocalStorageButton;
