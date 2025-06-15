import { useMemo } from "react";

export default function useUserReviews() {
  const userReviews = useMemo(() => {
    return [
      {
        content:
          "“This platform is clean, fast, and intuitive. Creating a room takes seconds, and the layout feels thoughtfully designed. I love how everything works seamlessly across mobile, tablet, and desktop without issues”",
        name: "Liam",
        surname: "Foster",
        icon_src: "/person1.png",
      },
      {
        content:
          "“The theme toggler is a small feature but makes a big difference. Light and dark modes are well-designed and easy on the eyes. I enjoy using it whether I’m in a bright or dark space”",
        name: "Olivia",
        surname: "Reynolds",
        icon_src: "/person2.png",
      },
      {
        content:
          "“Joining a meeting is effortless, and the video quality is surprisingly good. It’s reliable across every device I’ve used. The interface feels modern, responsive, and polished — very impressive for a browser-based app”",
        name: "Jack",
        surname: "Morgan",
        icon_src: "/person3.png",
      },
    ];
  }, []);
  return userReviews;
}
