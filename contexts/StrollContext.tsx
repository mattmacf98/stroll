import { createContext, ReactNode, useEffect, useState } from "react";
import { ImageSourcePropType } from "react-native";

interface IStroll {
  owner: string,
  title: string,
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
  });

export const StrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [buroughIndex, setBuroughIndex] = useState<number>(0);
    const [duration, setDuration] = useState<number>(30);
    const [strolls, setStrolls] = useState<IStroll[]>([
      {
        owner: "",
        title: "Bob's Walk",
        strollers: ['d'],
        location: {
          burough: "",
          lat: 0,
          lng: 0
        },
        startTime: "2024-07-30T09:00:00Z",
        minutes: 60,
        maxSize: 2
      },
      {
        owner: "",
        title: "Matthew's Walk",
        strollers: ['d', 's'],
        location: {
          burough: "",
          lat: 0,
          lng: 0
        },
        startTime: "2024-07-30T12:00:00Z",
        minutes: 30,
        maxSize: 3
      },
      {
        owner: "",
        title: "Cindy's Walk",
        strollers: ['s'],
        location: {
          burough: "",
          lat: 0,
          lng: 0
        },
        startTime: "2024-07-30T15:30:00Z",
        minutes: 30,
        maxSize: 2
      },
      {
        owner: "",
        title: "Jack's Walk",
        strollers: ['s', 's','d'],
        location: {
          burough: "",
          lat: 0,
          lng: 0
        },
        startTime: "2024-07-30T17:30:00Z",
        minutes: 15,
        maxSize: 4
      },
  ]);

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