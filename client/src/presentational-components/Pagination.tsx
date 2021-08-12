import React from 'react';

type Props = {
    previousPage: () => void;
    nextPage: () => void;
    gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
    canNextPage: boolean;
    canPreviousPage: boolean;
    pageCount: number;
    pageIndex: number;
};

const Pagination: React.FC<Props> = (props: Props) => {

    // ------------- Style
    const getPaginationStyle = (index: number) => {
        return index === props.pageIndex ? "pagination-link is-current" : "pagination-link";
    }

    return (
        <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
            <button onClick={() => props.previousPage()} disabled={!props.canPreviousPage}
                    className="pagination-previous">Previous
            </button>
            <button onClick={() =>props.nextPage()} disabled={!props.canNextPage} className="pagination-next">Next page
            </button>
            <ul className="pagination-list">
                {[...Array(props.pageCount)].map((x, i) => (
                    <li key={i} onClick={() => props.gotoPage(i)}>
                        <a className={getPaginationStyle(i)}>{i + 1}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;
