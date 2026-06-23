import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Detecting...");

    useEffect(() => {
        let landmarker;
        let stream;
        let disposed = false;

        init({ landmarkerRef, videoRef, streamRef }).then(() => {
            landmarker = landmarkerRef.current;
            stream = streamRef.current;

            if (disposed) {
                landmarker?.close();
                stream?.getTracks().forEach((track) => track.stop());
            }
        });

        return () => {
            disposed = true;
            landmarker?.close();
            stream?.getTracks().forEach((track) => track.stop());
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
