#!/usr/bin/env python3
"""MRUCache module"""
from base_caching import BaseCaching
import time


class MRUCache(BaseCaching):
    """class implemention MRU"""
    def __init__(self):
        """class constructor"""
        self.timestamp = {}
        super().__init__()

    def put(self, key, item):
        """implements MRU alogarithm"""
        if key is None or item is None:
            return
        # check if key exists
        exists_key = self.cache_data.get(key)
        if exists_key:
            # update it in cache_data dict
            self.cache_data[key] = item
            # update tracker dict in timestamp using same key
            self.timestamp[key] = time.time()
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            # get the list time in tracker dict timestamp
            list_used = max(self.timestamp, key=self.timestamp.get)
            # delete the key from cache_data
            del self.cache_data[list_used]
            # delete also from tracker dict
            del self.timestamp[list_used]
            print("DISCARD: {}".format(list_used))
        # add key in both cache_data and tracker
        self.cache_data[key] = item
        self.timestamp[key] = time.time()

    def get(self, key):
        """retrive a value given a key"""
        if key is None:
            return None
        # get return val or else None
        val = self.cache_data.get(key)
        if val:
            self.timestamp[key] = time.time()
        return val
