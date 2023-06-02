import './styles.scss'
import { useLottie } from "lottie-react";
import PenSpinning from "./animation.json";


export function LoadingAnimation() {
  const options = {
    animationData: PenSpinning,
    loop: true,
    autoplay: true,
    speed: 2
  };

  const { View } = useLottie(options);

  return View;
}