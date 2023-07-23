import React from "react";
interface TypoActionProps {
    text: string;
    pointText?: string;
    className?: string;
    pointColor?: string;
    cursorText?: string;
    cursorView?: boolean;
    cursorColor?: string;
    delay?: number;
    speed?: number;
}
declare const TypoAction: React.FC<TypoActionProps>;
export default TypoAction;
