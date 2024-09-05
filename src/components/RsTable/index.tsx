import React, { useState, useEffect, useRef } from 'react';
import { Table, Space, Input } from '@douyinfe/semi-ui';
import { BasePagination } from '@douyinfe/semi-foundation/lib/es/table/foundation';

export type RsTableProps = {
    tableColumnsProps: {}; //table的列
    tableDataProps: TableDataProps; //table的数据
    tableStyleProps?: TableStyleProps;
};

//暂定参数
export type TableStyleProps = {
    pagination?: BasePagination;   //分页
    currentPage?: number; //默认每页显示条数
    zebraRow?: boolean; //是否设置斑马纹
    size?: "default" | "small" | "middle"; //table大小
}

export type TableDataProps = {
    tableData: []
}


const RsTable: React.FC<RsTableProps> = ({ tableColumnsProps, tableDataProps, tableStyleProps }) => {
    // 默认的 TableStyleProps 值
    const defaultTableStyleProps: Partial<TableStyleProps> = {
        pagination: {
            currentPage: 1,
            pageSize: 20,
            defaultCurrentPage: 1,
            total: tableDataProps.tableData.length
        },
        zebraRow: true,
        size: 'small',
    };

    // 辅助函数用于合并默认值和用户提供的值
    function getTableStyleProps(props: RsTableProps): TableStyleProps {
        return {
            ...defaultTableStyleProps,
            ...(props.tableStyleProps || {}),
        };
    }

    const finalTableStyleProps = getTableStyleProps({ tableColumnsProps, tableDataProps, tableStyleProps });
    const [loading, setLoading] = useState<boolean>(false);
    const [dataSource, setData] = useState([]);
    const [currentPage, setPage] = useState<number>(1);// 当前页码
    const [pagination, setPagination] = useState(finalTableStyleProps.pagination);
    const [selectedKeys, setSelectedKeys] = useState([]);

    //console.log('look look tableStyleProps......', zebraRow)

    //TODO: 实现分页逻辑
    const fetchData = (currentPage = 1) => {
        setLoading(true);
        setPage(currentPage);
        return new Promise((res, rej) => {
            setTimeout(() => {
                const data = tableDataProps.tableData;
                console.log('look look data......', data)

                let dataSource = data.slice((currentPage - 1) * finalTableStyleProps.pagination?.pageSize, finalTableStyleProps.pagination?.currentPage * finalTableStyleProps.pagination?.pageSize);
                console.log('look look dataSource......', dataSource)

                res(dataSource);
            }, 300);
        }).then(dataSource => {
            setLoading(false);
            setData(dataSource);
        });
    };
    // 页面更改时的处理函数
    // const handlePageChange = page => {
    //     fetchData(page); // 使用新的页码获取数据
    // };

    // 仅在组件挂载时或分页依赖项变化时更新 onPageChange
    // useEffect(() => {
    //     setPagination((prev) => ({
    //         ...prev,
    //         onPageChange: handlePageChange, // 添加 onPageChange 函数
    //     }));
    // }, [tableDataProps.tableData.length, finalTableStyleProps.pagination?.pageSize]); // 依赖项为总数据量和分页大小

    // 初次加载时获取数据
    // useEffect(() => {
    //     fetchData(finalTableStyleProps.pagination?.currentPage);
    // }, [finalTableStyleProps.pagination?.currentPage]);

    const rowSelection = {
        getCheckboxProps: record => ({
            disabled: record.name === '设计文档', // Column configuration not to be checked
            name: record.name,
        }),
        onSelect: (record, selected) => {
            console.log(`select row: ${selected}`, record);
        },
        onSelectAll: (selected, selectedRows) => {
            console.log(`select all rows: ${selected}`, selectedRows);
        },
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedKeys(selectedRowKeys);
        },
    };
    // 设置斑马纹
    const handleZebraRow = (record: any, index: number) => {
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
            <Table
                columns={tableColumnsProps}
                dataSource={tableDataProps.tableData}
                onRow={finalTableStyleProps.zebraRow ? handleZebraRow : () => { return {} }}
                style={{ ...tableStyleProps }}
                size={finalTableStyleProps.size ? finalTableStyleProps.size : 'small'}
                rowSelection={rowSelection}
                //pagination={tableStyleProps?.pagination}
                {...tableStyleProps}
                loading={loading}
            />
        </>
    );
};


export default React.memo(RsTable);
