import React from "react";
import {
    HeadColor,
    HeadStyle,
    HeadRight,
    HeadLeft
} from "./WebFrameStyle";

const HEADER = () => {
    return (
        <div>
            <HeadColor>
                <HeadStyle>
                    <HeadLeft fontSize={"32px"}>
                        StartPlayUp
                    </HeadLeft>
                    <HeadRight>
                        <img src="../images/white-message.png" alt="message"/>
                        <img src="../images/white-menu.png" alt="menu"/>
                    </HeadRight>
                </HeadStyle>
            </HeadColor>
        </div>
    )
}

export default HEADER;