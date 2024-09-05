import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Table, Avatar, Space, Input, Button } from '@douyinfe/semi-ui';
// import { IconMore } from '@douyinfe/semi-icons';
import ZTable from '@/components/RsTable';
import RsSideSheet from '@/components/RsSideSheet'
const { Column } = Table;

export default function App() {
    const [filteredValue, setFilteredValue] = useState<any[]>();
    const [visible, setVisible] = useState(false);
    const compositionRef = useRef({ isComposition: false });


    const toggleVisibility = () => {
        setVisible(!visible);
    };
    const handleChange = (value: any) => {
        if (compositionRef.current.isComposition) {
            return;
        }
        const newFilteredValue = value ? [value] : [];
        setFilteredValue(newFilteredValue);
    };
    const handleCompositionStart = () => {
        compositionRef.current.isComposition = true;
    };

    const handleCompositionEnd = (event: any) => {
        compositionRef.current.isComposition = false;
        const value = event.target.value;
        const newFilteredValue = value ? [value] : [];
        setFilteredValue(newFilteredValue);
    };

    const data = [
        {
            key: '111',
            dataId: '111',
            xm_code: '10',
            xm_name: '本级收入',
            sryss: 47376498.00,
            xm_code1: '20',
            xm_name1: '本级支出',
            zcyss: 106845197.00,
        },
        {
            key: '222',
            dataId: '222',
            xm_code: '101',
            xm_name: '  税收收入',
            sryss: 30152825.00,
            xm_code1: '201',
            xm_name1: '一般公共服务支出',
            zcyss: 10653428.00,
        },
        {
            key: '333',
            dataId: '333',
            xm_code: '102',
            xm_name: '増值税',
            sryss: 12997842.00,
            xm_code1: '202',
            xm_name1: '国防支出',
            zcyss: 68437.00,
        },
        {
            key: '444',
            dataId: '444',
            xm_code: '102',
            xm_name: '企业所得税',
            sryss: 3757846.00,
            xm_code1: '202',
            xm_name1: '公共安全支出',
            zcyss: 4765432.00,
        },
        {
            key: '555',
            dataId: '555',
            xm_code: '102',
            xm_name: '个人所得税',
            sryss: 1018653.00,
            xm_code1: '202',
            xm_name1: '教育支出',
            zcyss: 19328908.00,
        },
        {
            key: '666',
            dataId: '666',
            xm_code: '102',
            xm_name: '资源税',
            sryss: 1058745.00,
            xm_code1: '202',
            xm_name1: '科学技术支出',
            zcyss: 4765432.00,
        },
    ];

    const columns = useMemo(() => [
        {
            title: (
                <Space>
                    <span>项目</span>
                    <Input
                        placeholder="请输入筛选值"
                        style={{ width: 200 }}
                        onCompositionStart={handleCompositionStart}
                        onCompositionEnd={handleCompositionEnd}
                        onChange={handleChange}
                        showClear
                    />
                </Space>
            ),
            dataIndex: 'xm_name',
            width: 400,
            render: (text: any, record: any, index: number) => {
                return (
                    <div>
                        {text}
                    </div>
                );
            },
            onFilter: (value: string, record: any) => record.xm_name.includes(value),
            filteredValue,
        },
        {
            title: '收入预算数',
            dataIndex: 'sryss',
            render: (text: any) => `${text} 万元`,
        },
        {
            title: (
                <Space>
                    <span>项目</span>
                    <Input
                        placeholder="请输入筛选值"
                        style={{ width: 200 }}
                        onCompositionStart={handleCompositionStart}
                        onCompositionEnd={handleCompositionEnd}
                        onChange={handleChange}
                        showClear
                    />
                </Space>
            ),
            dataIndex: 'xm_name1',
            render: (text: string, record: any, index: number) => {
                return (
                    <div>
                        {text}
                    </div>
                );
            },
            onFilter: (value: string, record: any) => record.xm_name1.includes(value),
            filteredValue,
        },
        {
            title: '支出预算数',
            dataIndex: 'zcyss',
            render: (text: any) => `${text} 万元`,
        },
    ], []);


    return (
        <>
            <Button onClick={toggleVisibility}>数据对比</Button>
            <RsSideSheet
                title={'数据对比'}
                isVisible={visible}
                isCancel={toggleVisibility}
                size={'large'}
            />
            <ZTable
                tableDataProps={{
                    tableData: data
                }}
                tableColumnsProps={columns}
                tableStyleProps={{
                    pagination: {
                        currentPage: 1,
                        pageSize: 20,
                        defaultCurrentPage: 1
                    },
                    zebraRow: false,
                    size: 'small'
                }}
            />
            {/*<Table columns={columns} dataSource={data} style={{ width: '80%', float: 'left' }} />*/}
        </>
    );
}
