
import "./style.css"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Flip } from "gsap/Flip";


gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, Flip);

// const split = new SplitText('.title h1',{

//     type:"chars,lines,words",
//     wordsClass:"titleword",
//     charsClass:"charword"

// })
// gsap.from(split.chars,{
//     yPercent:100,
//     duration:1.2,
//     opacity:0,
//     ease:"expo.out",
//     stagger:{
//         each:0.04,
//         from:"edges"
//     }
// })

const img = document.querySelector(".splimg")
const img2 = document.querySelector(".splimg2")

const state = Flip.getState(".splimg")

const state2 = Flip.getState(".splimg2")


img.addEventListener('click',
    () => {
        document.querySelector('.imgshow').appendChild(img);

        document.querySelector('.imggallery').appendChild(img2);
        Flip.from(state, {
            duration: 1.4,
            ease: "power4.inOut",
            absolute: true,
            scale: true

        })
        Flip.from(state2, {
            duration: 1.4,
            ease: "power3.inOut",
             absolute: true,
            scale: true

        })
    }
)