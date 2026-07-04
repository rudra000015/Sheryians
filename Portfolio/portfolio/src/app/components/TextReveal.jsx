import React, { forwardRef, useRef } from 'react'

const TextReveal = forwardRef(
    (
        {
            children,
            classname = "",
            trigger = "mount",
            scrollStart = "top 75%",
            splitBy = "lines",
            duration = 0.67,
            stagger = 0.085,
            delay = 0,
            ease = "power3.out"
        }, ref,
    ) => {
        const wrapperRef = useRef(null)
        return (
            <div ref={wrapperRef} className={`overflow-hidden ${classname}`}>
                {children}
                </div>
        )
    }
)
export default TextReveal