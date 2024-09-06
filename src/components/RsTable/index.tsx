import React, { useState, useEffect, useRef } from 'react';
import { Table, Space, Input } from '@douyinfe/semi-ui';
import { BasePagination } from '@douyinfe/semi-foundation/lib/es/table/foundation';

export type RsTableProps = {
    tableColumnsProps: {}; //table的列
    tableDataProps: TableDataProps; //table的数据
    tableStyleProps?: TableStyleProps;
    onSelectTableData: (selectData: any[]) => void;
};

//暂定参数
export type TableStyleProps = {
    pagination?: BasePagination;   //分页
    currentPage?: number; //默认每页显示条数
    zebraRow?: boolean; //是否设置斑马纹
    size?: "default" | "small" | "middle"; //table大小
}

export type TableDataProps = {
    tableData: any[] | null
}


const RsTable: React.FC<RsTableProps> = ({ tableColumnsProps, tableDataProps, tableStyleProps, onSelectTableData }) => {
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

    const finalTableStyleProps = getTableStyleProps({ tableColumnsProps, tableDataProps, tableStyleProps, onSelectTableData });
    const [selectTableData, setSelectTableData] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [dataSource, setData] = useState([]);
    const [currentPage, setPage] = useState<number>(1);// 当前页码
    const [pagination, setPagination] = useState(finalTableStyleProps.pagination);
    const [selectedKeys, setSelectedKeys] = useState([]);


    /* 
        TODO: 实现分页逻辑，考虑是否实现？
            若按此方法实现，需要一次性返回所有数据，目前没想好，暂时搁置
    */
    // const fetchData = (currentPage = 1) => {
    //     setLoading(true);
    //     setPage(currentPage);
    //     return new Promise((res, rej) => {
    //         setTimeout(() => {
    //             const data = tableDataProps.tableData;
    //             let dataSource = data.slice((currentPage - 1) * finalTableStyleProps.pagination?.pageSize, finalTableStyleProps.pagination?.currentPage * finalTableStyleProps.pagination?.pageSize);
    //             res(dataSource);
    //         }, 300);
    //     }).then(dataSource => {
    //         setLoading(false);
    //         setData(dataSource);
    //     });
    // };
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


    //行选择相关
    const rowSelection = {
        getCheckboxProps: (record: { name: string; }) => ({
            //disabled: record.name === '设计文档', //可以设置哪些行禁选相关配置
            //name: record.name,
        }),
        onSelect: (record: any, selected: any) => {
            //console.log(`select row: ${selected}`, record);
        },
        onSelectAll: (selected: any, selectedRows: any) => {
            //console.log(`select all rows: ${selected}`, selectedRows);
        },
        onChange: (selectedRowKeys: React.SetStateAction<never[]>, selectedRows: any) => {
            //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedKeys(selectedRowKeys);
            onSelectTableData(selectedRows);// 将已选择的数据，回调给上层引用
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
