import { createContext, ReactNode, useEffect, useState } from "react";
import { ImageSourcePropType } from "react-native";

interface IStroll {
  owner: string,
  strollers: string[],
  location: {
    burough: string,
    lat: number,
    lng: number
  },
  startTime: string,
  minutes: number,
  maxSize: number
}
interface StrollState {
    //SEARCHING
    buroughIndex: number;
    duration: number;
    setBuroughIndex: (buroughIndex: number) => void;
    setDuration: (duration: number) => void;

    // RESULTS
    strolls: IStroll[]
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
    strolls:[]
  })
  ;

export const StrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [buroughIndex, setBuroughIndex] = useState<number>(-1);
    const [duration, setDuration] = useState<number>(-1);
    const [strolls, setStrolls] = useState<IStroll[]>([]);

    useEffect(() => {
      // FETCH MATCHING STROLLS 
    }, [buroughIndex, duration])
  
    const value = {
      buroughIndex,
      duration,
      setBuroughIndex,
      setDuration,
      strolls
    };
  
    return <StrollContext.Provider value={value}>{children}</StrollContext.Provider>;
  };