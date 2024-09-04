import React, { useState, useEffect, useRef } from 'react';
import { Table, Space, Input } from '@douyinfe/semi-ui';
import { BasePagination } from '@douyinfe/semi-foundation/lib/es/table/foundation';

export type ZTableProps = {
    tableColumnsProps: {}; //table的列
    tableDataProps: {}; //table的数据
    tableStyleProps?: TableStyleProps;
};

//暂定参数
export type TableStyleProps = {
    pagination?: BasePagination;   //分页
    currentPage?: number; //默认每页显示条数
    zebraRow?: boolean; //是否设置斑马纹
    size?: "default" | "small" | "middle"; //table大小
}

// 默认的 TableStyleProps 值
const defaultTableStyleProps: Partial<TableStyleProps> = {
    pagination: {
        currentPage: 1,
        pageSize: 20,
        defaultCurrentPage: 1
    },
    zebraRow: true,
    size: 'small',
    currentPage: 20
};

// 辅助函数用于合并默认值和用户提供的值
function getTableStyleProps(props: ZTableProps): TableStyleProps {
    return {
        ...defaultTableStyleProps,
        ...(props.tableStyleProps || {}),
    };
}

const ZTable: React.FC<ZTableProps> = ({ tableColumnsProps, tableDataProps, tableStyleProps }) => {
    const finalTableStyleProps = getTableStyleProps({ tableColumnsProps, tableDataProps, tableStyleProps });

    const [loading, setLoading] = useState(false);
    const [dataSource, setData] = useState([]);
    const [currentPage, setPage] = useState(1);
    const [pagination, setPagination] = useState(finalTableStyleProps.pagination);

    //console.log('look look tableStyleProps......', zebraRow)
    // const ZTable: React.FC<ZTableProps> = ({ tableColumnsProps, tableDataProps, tableStyleProps, enableZeroPadding }) => {

    //TODO: 实现分页逻辑
    const fetchData = (currentPage = 1) => {
        setLoading(true);
        setPage(currentPage);
        return new Promise((res, rej) => {
            setTimeout(() => {
                //const data = getData();
                //let dataSource = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
                res(dataSource);
            }, 300);
        }).then(dataSource => {
            setLoading(false);
            setData(dataSource);
        });
    };
    //setPagination({...pagination});
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
                dataSource={tableDataProps}
                onRow={finalTableStyleProps.zebraRow ? handleZebraRow : () => { return {} }}
                style={{ ...tableStyleProps }}
                size={finalTableStyleProps.size ? finalTableStyleProps.size : 'small'}
                {...tableStyleProps}

            />
        </>
    );
};


export default React.memo(ZTable);
