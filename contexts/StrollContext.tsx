import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ImageSourcePropType } from "react-native";

interface IMessage {
  _id: string,
  stroll: string,
  owner: string,
  time: string,
  content: string, 
}

interface StrollState {
    //SEARCHING
    buroughIndex: number;
    duration: number;
    setBuroughIndex: (buroughIndex: number) => void;
    setDuration: (duration: number) => void;

    // RESULTS
    messages: IMessage[];
}

export interface IBurough {
  image: ImageSourcePropType,
  name: string
}

export const Buroughs: IBurough[] = [
  {
      name: "Manhattan",
      image: require("../assets/images/buroughs/manhattan.png")
  },
  {
      name: "Bronx",
      image: require("../assets/images/buroughs/bronx.png")
  },
  {
      name: "Brooklyn",
      image: require("../assets/images/buroughs/brooklyn.png")
  },
  {
      name: "Queens",
      image: require("../assets/images/buroughs/queens.png")
  }
]

export const StrollContext = createContext<StrollState>(
  {
    buroughIndex: -1, 
    duration: -1, 
    setBuroughIndex: () => null, 
    setDuration: () => null, 
    messages: []
  });

export const StrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [buroughIndex, setBuroughIndex] = useState<number>(0);
    const [duration, setDuration] = useState<number>(30);
    const [messages, setMessages] = useState<IMessage[]>([
      {
        _id: "1",
        content: "Where Should We Meet?",
        owner: "1",
        stroll: "1",
        time: "2024-07-30T09:00:00Z"
      },
      {
        _id: "1",
        content: "Centrel Park?",
        owner: "1",
        stroll: "1",
        time: "2024-07-30T09:02:00Z"
      },
      {
        _id: "1",
        content: "👍",
        owner: "1",
        stroll: "1",
        time: "2024-07-30T09:05:00Z"
      }
    ]);
  
    const value = {
      buroughIndex,
      duration,
      setBuroughIndex,
      setDuration,
      messages
    };
  
    return <StrollContext.Provider value={value}>{children}</StrollContext.Provider>;
  };