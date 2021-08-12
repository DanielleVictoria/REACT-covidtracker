import React from 'react';

type Props = {
    pageSize: number,
    setPageSize: (pageSize: number) => void
};

const PageSizeSelector: React.FC<Props> = (props: Props) => {
    return (
        <div className="select">
            <select
                value={props.pageSize}
                onChange={e => {
                    props.setPageSize(Number(e.target.value))
                }}>
                {[5, 10, 20, 30].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default PageSizeSelector;
