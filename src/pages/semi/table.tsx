import React, { useState, useEffect, useRef } from 'react';
import { Table, Avatar, Space, Input } from '@douyinfe/semi-ui';
import { IconMore } from '@douyinfe/semi-icons';
import ZTable from '@/components/ZTable';

const { Column } = Table;

export default function App() {
    const [filteredValue, setFilteredValue] = useState([]);

    const compositionRef = useRef({ isComposition: false });
    const handleChange = (value) => {
        if (compositionRef.current.isComposition) {
            return;
        }
        const newFilteredValue = value ? [value] : [];
        setFilteredValue(newFilteredValue);
    };
    const handleCompositionStart = () => {
        compositionRef.current.isComposition = true;
    };

    const handleCompositionEnd = (event) => {
        compositionRef.current.isComposition = false;
        const value = event.target.value;
        const newFilteredValue = value ? [value] : [];
        setFilteredValue(newFilteredValue);
    };

    const data = [
        {
            dataId: '111',
            xm_code: '10',
            xm_name: '本级收入',
            sryss: 47376498.00,
            xm_code1: '20',
            xm_name1: '本级支出',
            zcyss: 106845197.00,
        },
        {
            dataId: '222',
            xm_code: '101',
            xm_name: '  税收收入',
            sryss: 30152825.00,
            xm_code1: '201',
            xm_name1: '一般公共服务支出',
            zcyss: 10653428.00,
        },
        {
            dataId: '333',
            xm_code: '102',
            xm_name: '増值税',
            sryss: 12997842.00,
            xm_code1: '202',
            xm_name1: '国防支出',
            zcyss: 68437.00,
        },
        {
            dataId: '444',
            xm_code: '102',
            xm_name: '企业所得税',
            sryss: 3757846.00,
            xm_code1: '202',
            xm_name1: '公共安全支出',
            zcyss: 4765432.00,
        },
        {
            dataId: '555',
            xm_code: '102',
            xm_name: '个人所得税',
            sryss: 1018653.00,
            xm_code1: '202',
            xm_name1: '教育支出',
            zcyss: 19328908.00,
        },
        {
            dataId: '666',
            xm_code: '102',
            xm_name: '资源税',
            sryss: 1058745.00,
            xm_code1: '202',
            xm_name1: '科学技术支出',
            zcyss: 4765432.00,
        },
    ];

    const columns = [
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
            render: (text, record, index) => {
                return (
                    <div>
                        {text}
                    </div>
                );
            },
            onFilter: (value: string, record) => record.xm_name.includes(value),
            filteredValue,
        },
        {
            title: '收入预算数',
            dataIndex: 'sryss',
            render: text => `${text} 万元`,
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
            render: (text, record, index) => {
                return (
                    <div>
                        {text}
                    </div>
                );
            },
            onFilter: (value: string, record) => record.xm_name1.includes(value),
            filteredValue,
        },
        {
            title: '支出预算数',
            dataIndex: 'zcyss',
            render: text => `${text} 万元`,
        },
    ];


    const handleRow = (record, index) => {
        // 给偶数行设置斑马纹
        if (index % 2 === 0) {
            return {
                style: {
                    background: 'var(--semi-color-fill-0)',
                },
            };
        } else {
            return {};
        }
    };



    return (
        <>
            <ZTable tableDataProps={data} tableColumnsProps={columns}
                tableStyleProps={{
                    pagination: {
                        currentPage: 1,
                        pageSize: 5,
                        defaultCurrentPage: 1
                    },
                    zebraRow: false,
                    currentPage: 2,
                    size: 'small'
                }}
            />
            {/*<Table columns={columns} dataSource={data} style={{ width: '80%', float: 'left' }} />*/}
        </>
    );
}
