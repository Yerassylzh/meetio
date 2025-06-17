import { useCallback, useEffect, useMemo, useState } from "react";

export default function usePagingInfo(
  totalUsers: number
): [number, () => void, () => void, number, number] {
  const [currentPage, setCurrentPage] = useState(0);

  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 2;
    }
    return 3;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      const maxPages = Math.ceil(totalUsers / getItemsPerPage());
      if (currentPage >= maxPages) {
        setCurrentPage(0);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPage, totalUsers]);

  const totalPages = useMemo(
    () => Math.ceil(totalUsers / itemsPerPage),
    [totalUsers, itemsPerPage]
  );

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);
  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  return [currentPage, prevPage, nextPage, itemsPerPage, totalPages];
}
