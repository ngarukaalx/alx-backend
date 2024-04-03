#!/usr/bin/env python3
"""FIFOCache module"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """implements FIFO caching
    """
    def __inti__(self):
        """class constructor"""
        # call super to inherit from super
        super().__init__()

    def put(self, key, item):
        """performs FIFO caching"""
        # if item or key is None do nothing
        if key is None or item is None:
            return
        # check if the key exist
        exists = self.cache_data.get(key)
        if exists:
            # update if it exist coz we no need add the key
            self.cache_data[key] = item
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            # remove the first item
            first = next(iter(self.cache_data))
            del self.cache_data[first]
            print("DISCARD: {}".format(first))
        self.cache_data[key] = item

    def get(self, key):
        """return the value linked to key"""
        if key is None:
            return None
        value = self.cache_data.get(key)
        return value
