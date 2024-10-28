import { NextRouter } from "next/router";

interface SwitchModeProps {
  router: NextRouter;
  isMildTranslation: boolean;
  setIsMildTranslation: (value: boolean) => void;
}

export const switchMode = (props: SwitchModeProps) => {
  const { router, isMildTranslation, setIsMildTranslation } = props;
  router.push("/general");
  setIsMildTranslation(!isMildTranslation);
};
