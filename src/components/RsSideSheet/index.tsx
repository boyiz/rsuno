import React, { useState } from 'react';
import { SideSheet } from '@douyinfe/semi-ui';


type RsSideSheetProps = {
    title: string,
    isVisible: boolean,
    isCancel: () => void
    size?: "small" | "medium" | "large"; //SideSheet大小
}
const RsSideSheet: React.FC<RsSideSheetProps> = ({ title, isVisible, isCancel, size }) => {

    // const
    // const [visible, setVisible] = useState(false);

    // const change = () => {
    //     setVisible(!visible);
    // };

    return (
        <SideSheet title={title} visible={isVisible} onCancel={isCancel} size={size ? size : 'small'}>
            <p>This is the content of a basic sidesheet.</p>
            <p>Here is more content...</p>
        </SideSheet>
    );
};

export default RsSideSheet;