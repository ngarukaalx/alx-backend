#!/usr/bin/env python3
"""BasicCache module"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """caching system"""
    def __init__(self):
        """class constructor"""
        # call super class
        super().__init__()

    def put(self, key, item):
        """assign to the dict self.cache_data
        the item value for the key
        """
        # do nothing if key/item is None
        if key is None or item is None:
            return
        # assign to the dictionary self.cache_data
        self.cache_data[key] = item

    def get(self, key):
        """return the value in self.cache_data
        linked to key
        """
        if key is None:
            return None
        # will return none if key does not exist
        item = self.cache_data.get(key)
        return item
