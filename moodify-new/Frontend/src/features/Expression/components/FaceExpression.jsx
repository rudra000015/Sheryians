import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Detecting...");

    useEffect(() => {
        let isMounted = true;
        let landmarker;
        let stream;

        init({ landmarkerRef, videoRef, streamRef }).then((resources) => {
            landmarker = resources.landmarker;
            stream = resources.stream;

            if (!isMounted) {
                landmarker.close();
                stream.getTracks().forEach((track) => track.stop());
            }
        });

        return () => {
            isMounted = false;

            if (landmarker) {
                landmarker.close();
            }

            if (stream) {
                stream
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        const expression = detect({ landmarkerRef, videoRef, setExpression })
        console.log(expression)
        onClick(expression)
    }


    return (
        <div style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                style={{ width: "400px", borderRadius: "12px" }}
                playsInline
            />
            <h2>{expression}</h2>
            <button onClick={handleClick} >Detect expression</button>
        </div>
    );
}
