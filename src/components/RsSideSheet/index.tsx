import React, { useState } from 'react';
import { SideSheet, Table } from '@douyinfe/semi-ui';


type RsSideSheetProps = {
    title: string,
    isVisible: boolean,
    isCancel: () => void
    size?: "small" | "medium" | "large"; //SideSheet大小
    selectTableData: any[] | null
}
const RsSideSheet: React.FC<RsSideSheetProps> = ({ title, isVisible, isCancel, size, selectTableData }) => {
    //console.log('look look RsSideSheet接收到的selectTableData', selectTableData)
    const columns = [
        {
            title: '标题',
            dataIndex: 'name',
        },
        {
            title: '大小',
            dataIndex: 'size',
        },
        {
            title: '所有者',
            dataIndex: 'owner',
        },
        {
            title: '更新日期',
            dataIndex: 'updateTime',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'Semi Design 设计稿.fig',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
            size: '2M',
            owner: '姜鹏志',
            status: 'success',
            updateTime: '2020-02-02 05:13',
            avatarBg: 'grey',
        },
        {
            key: '2',
            name: 'Semi Design 分享演示文稿',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '2M',
            owner: '郝宣',
            status: 'pending',
            updateTime: '2020-01-17 05:31',
            avatarBg: 'red',
        },
        {
            key: '3',
            name: '设计文档',
            nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
            size: '34KB',
            status: 'wait',
            owner: 'Zoey Edwards',
            updateTime: '2020-01-26 11:01',
            avatarBg: 'light-blue',
        },
    ];

    return (
        <SideSheet title={title} visible={isVisible} onCancel={isCancel} size={size ? size : 'small'}>
            <p>This is the content of a basic sidesheet.</p>
            <p>Here is more content...</p>
            <Table columns={columns} dataSource={data} pagination={false} />
        </SideSheet>
    );
};

export default RsSideSheet;