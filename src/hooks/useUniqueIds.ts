import { uniqId } from "@/utils";
import { useEffect, useState } from "react";

export const useUniqueIds = (arrayLength: number) => {
  const [uniqueIds, setUniqueIds] = useState([]);
  useEffect(() => {
    console.log("called");
    setUniqueIds(Array(arrayLength).map((el) => uniqId()));
  }, []);
  return uniqueIds;
};
