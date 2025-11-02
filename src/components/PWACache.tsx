"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Database, Trash2, RefreshCw } from "lucide-react";

interface CacheInfo {
    name: string;
    size: number;
    lastModified: string;
}

export default function PWACache() {
    const [cacheInfo, setCacheInfo] = useState<CacheInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [clearing, setClearing] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const loadCacheInfo = useCallback(async () => {
        if (!isClient) return;
        setLoading(true);
        try {
            if (typeof window !== 'undefined' && 'caches' in window) {
                const cacheNames = await caches.keys();
                const cacheInfoPromises = cacheNames.map(async (name) => {
                    const cache = await caches.open(name);
                    const keys = await cache.keys();
                    return {
                        name,
                        size: keys.length,
                        lastModified: new Date().toLocaleString()
                    };
                });

                const info = await Promise.all(cacheInfoPromises);
                setCacheInfo(info);
            }
        } catch (error) {
            console.error('Error loading cache info:', error);
        } finally {
            setLoading(false);
        }
    }, [isClient]);

    const clearAllCaches = async () => {
        if (!isClient) return;
        setClearing(true);
        try {
            if (typeof window !== 'undefined' && 'caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
                setCacheInfo([]);

                // Show success notification if notifications are enabled
                if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
                    new Notification('Cache Cleared', {
                        body: 'All caches have been successfully cleared.',
                        icon: '/icon512_rounded.png'
                    });
                }
            }
        } catch (error) {
            console.error('Error clearing caches:', error);
        } finally {
            setClearing(false);
        }
    };

    useEffect(() => {
        if (isClient) {
            loadCacheInfo();
        }
    }, [isClient, loadCacheInfo]);

    if (!isClient) {
        return (
            <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 text-gray-600">
                    <RefreshCw size={16} className="animate-spin" />
                    Loading...
                </div>
            </div>
        );
    }

    if (typeof window === 'undefined' || !('caches' in window)) {
        return (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700">Cache API not supported in this browser.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Cache Storage</h4>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={loadCacheInfo}
                        disabled={loading}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                        Refresh
                    </button>

                    <button
                        onClick={clearAllCaches}
                        disabled={clearing || cacheInfo.length === 0}
                        className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                        <Trash2 size={14} />
                        Clear All
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-4">
                    <div className="inline-flex items-center gap-2 text-gray-600">
                        <RefreshCw size={16} className="animate-spin" />
                        Loading cache information...
                    </div>
                </div>
            ) : (
                <div className="space-y-2">
                    {cacheInfo.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">
                            No caches found
                        </div>
                    ) : (
                        cacheInfo.map((cache) => (
                            <div key={cache.name} className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-sm text-gray-900">
                                            {cache.name}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {cache.size} cached items
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {cache.lastModified}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}