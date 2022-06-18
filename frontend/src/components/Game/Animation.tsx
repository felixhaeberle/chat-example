import * as React from "react";

import type { LottiePlayer } from "lottie-web";

export const Animation = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = React.useState<LottiePlayer | null>(null);

  React.useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  React.useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        // path to your animation file, place it inside public folder
        path: "/stars.json",
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return <div ref={ref} style={{ height: "200px", width: "200px" }} />;
};
