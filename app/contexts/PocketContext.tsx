import { AuthModel } from "pocketbase";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { pb } from "~/pocketbase";

type PocketContextType = {
  isValid: boolean;
  user: AuthModel;
};

const PocketContext = createContext<PocketContextType>({
  isValid: false,
  user: undefined!,
});

export const PocketProvider = ({ children }: { children: ReactNode }) => {
  const [isValid, setIsValid] = useState(pb.authStore.isValid);
  const [user, setUser] = useState(pb.authStore.model);

  useEffect(() => {
    return pb.authStore.onChange((_, model) => {
      setIsValid(pb.authStore.isValid);
      setUser(model);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PocketContext.Provider value={{ isValid, user }}>
      {children}
    </PocketContext.Provider>
  );
};

export const usePocket = () => useContext(PocketContext);
