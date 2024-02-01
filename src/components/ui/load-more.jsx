"use client";

import { useAppContext } from "@/context/AppContext";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";


export function LoadMore() {
  const [count, setCount] = useState([]);
  const { state, setState } = useAppContext();

  const { ref, inView, entry } = useInView();

  useEffect(() => {
    if (inView) {
      const currentItem = entry.target.parentElement.id;
      const currentPosition = currentItem.split("_")[1];

      if(!state.LastItemPosition || +state.LastItemPosition <= +currentPosition){
        setState({ ...state, LastItemPosition: currentPosition });
      }
    }
  }, [inView]);

  return (
    <>
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
      </div>
    </>
  );
}