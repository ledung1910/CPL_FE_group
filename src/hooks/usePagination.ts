import { useState } from 'react';
const usePagination = <T,>(items: T[], itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const currentItems = items.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const next = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    return {currentPage, totalPages, currentItems, next, prev, goToPage};
};

export default usePagination;