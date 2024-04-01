#!/usr/bin/env python3
"""class server"""
import csv
import math
from typing import List, Tuple, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    @staticmethod
    def index_range(page: int, page_size: int) -> Tuple[int, int]:
        """The function return a tuple of size two containing
        a start index and an end index"""
        return (page - 1) * page_size, page * page_size

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """gets the right page"""
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        start, end = self.index_range(page, page_size)
        datalist = self.dataset()
        if not datalist:
            return []
        if page > len(datalist) or page_size > len(datalist):
            return []
        return datalist[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """hyper method to dynamicaly inform the user"""
        hyper_dict = {}
        data = self.get_page(page, page_size)
        page_size_fromdata = len(data)
        page = page
        next_page = page + 1 if page < len(self.dataset()) and \
            len(data) > 0 else None
        prev_page = page - 1 if page > 1 else None
        total_pages = int(len(self.dataset()) / page_size)

        hyper_dict.update({
            "page_size": page_size_fromdata, "page": page,
            "data": data, "next_page": next_page, "prev_page": prev_page,
            "total_pages": total_pages
            })
        return hyper_dict
