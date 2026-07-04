import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger  from "gsap/ScrollTrigger";
import SplitText  from "gsap/SplitText";

gsap.registerPlugin(SplitText,ScrollTrigger);

export { SplitText,ScrollTrigger,useGSAP}
export default gsap;