"use client";
import React, { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";

interface NetworkConnection {
    effectiveType?: string;
    type?: string;
    addEventListener?: (type: string, listener: () => void) => void;
    removeEventListener?: (type: string, listener: () => void) => void;
}

interface NavigatorWithConnection extends Navigator {
    connection?: NetworkConnection;
    mozConnection?: NetworkConnection;
    webkitConnection?: NetworkConnection;
}

export default function OnlineStatus() {
    const [isOnline, setIsOnline] = useState(() =>
        typeof navigator !== 'undefined' ? navigator.onLine : true
    );
    const [connectionType, setConnectionType] = useState<string>('unknown');

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Get connection info if available
        const getConnectionType = () => {
            const nav = navigator as NavigatorWithConnection;
            const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
            if (connection) {
                setConnectionType(connection.effectiveType || connection.type || 'unknown');
            }
        };

        getConnectionType();

        // Listen for online/offline events
        const handleOnline = () => {
            setIsOnline(true);
            getConnectionType();
        };

        const handleOffline = () => {
            setIsOnline(false);
            setConnectionType('offline');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Listen for connection change if supported
        const nav = navigator as NavigatorWithConnection;
        const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
        if (connection && connection.addEventListener) {
            connection.addEventListener('change', getConnectionType);

            return () => {
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
                if (connection.removeEventListener) {
                    connection.removeEventListener('change', getConnectionType);
                }
            };
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isOnline
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
            }`}>
            {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
            <div className="flex gap-2 items-center">
                <span className="text-sm font-medium">
                    {isOnline ? 'Online' : 'Offline'}
                </span>
                {isOnline && connectionType !== 'unknown' && (
                    <span className="text-xs opacity-75 capitalize">
                        {connectionType}
                    </span>
                )}
            </div>
        </div>
    );
}