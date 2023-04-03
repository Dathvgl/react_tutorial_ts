import { createContext, useContext, useState } from "react";
import { ChildrenProps, SupportProviderType, SupportStateType } from "~/types";

export function useSupportContext() {
  const context = useContext(SupportContext);

  if (!context) throw new Error("Support context null");
  return context;
}

export const SupportContext = createContext<SupportProviderType>({
  support: {
    songId: [],
    songIndex: -1,
    isPlay: false,
    sideRight: false,
  },
  setSupport: () => {},
});

export const SupportProvider = (props: ChildrenProps) => {
  const [support, setSupport] = useState<SupportStateType>({
    songId: [],
    songIndex: -1,
    isPlay: false,
    sideRight: false,
  });

  return (
    <SupportContext.Provider value={{ support, setSupport }}>
      {props.children}
    </SupportContext.Provider>
  );
};
