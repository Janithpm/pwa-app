"use client";
import React, { useState, useEffect } from "react";
import {
    Activity,
    HardDrive,
    Clock,
    Smartphone,
    Battery,
    Signal
} from "lucide-react";

interface PerformanceMetrics {
    loadTime: number;
    connectionSpeed: string;
    deviceType: string;
    batteryLevel?: number;
    isCharging?: boolean;
    storageQuota?: number;
    storageUsage?: number;
}

interface NetworkConnection {
    effectiveType?: string;
    type?: string;
}

interface BatteryManager {
    level: number;
    charging: boolean;
}

interface NavigatorWithExtensions extends Navigator {
    connection?: NetworkConnection;
    mozConnection?: NetworkConnection;
    webkitConnection?: NetworkConnection;
    getBattery?: () => Promise<BatteryManager>;
}

const MetricItem = ({ icon: Icon, label, value, unit = '' }: {
    icon: React.ElementType;
    label: string;
    value: string | number | undefined;
    unit?: string;
}) => (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <Icon size={20} className="text-blue-600" />
        <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">{label}</div>
            <div className="text-xs text-gray-600">
                {value !== undefined ? `${value}${unit}` : 'N/A'}
            </div>
        </div>
    </div>
);

export default function PWAMetrics() {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        loadTime: 0,
        connectionSpeed: 'unknown',
        deviceType: 'desktop',
    });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const getMetrics = async () => {
            if (typeof window === 'undefined') return;

            try {
                // Performance metrics
                const loadTime = performance.now();

                // Connection info
                const nav = navigator as NavigatorWithExtensions;
                const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
                const connectionSpeed = connection ? connection.effectiveType || 'unknown' : 'unknown';

                // Device detection
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                const isTablet = /iPad|Android|Tablet/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);
                const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

                const newMetrics: PerformanceMetrics = {
                    loadTime: Math.round(loadTime),
                    connectionSpeed,
                    deviceType,
                };

                // Battery API (if supported)
                if (nav.getBattery) {
                    try {
                        const battery = await nav.getBattery();
                        newMetrics.batteryLevel = Math.round(battery.level * 100);
                        newMetrics.isCharging = battery.charging;
                    } catch {
                        console.log('Battery API not available');
                    }
                }

                // Storage quota (if supported)
                if ('storage' in navigator && 'estimate' in navigator.storage) {
                    try {
                        const estimate = await navigator.storage.estimate();
                        newMetrics.storageQuota = estimate.quota ? Math.round(estimate.quota / (1024 * 1024)) : undefined;
                        newMetrics.storageUsage = estimate.usage ? Math.round(estimate.usage / (1024 * 1024)) : undefined;
                    } catch {
                        console.log('Storage estimate not available');
                    }
                }

                setMetrics(newMetrics);
            } catch (error) {
                console.error('Error getting metrics:', error);
            }
        };

        getMetrics();
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">PWA Metrics</h3>
                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                >
                    {isVisible ? 'Hide' : 'Show'}
                </button>
            </div>

            {isVisible && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <MetricItem
                        icon={Clock}
                        label="Load Time"
                        value={metrics.loadTime}
                        unit="ms"
                    />

                    <MetricItem
                        icon={Signal}
                        label="Connection"
                        value={metrics.connectionSpeed?.toUpperCase()}
                    />

                    <MetricItem
                        icon={Smartphone}
                        label="Device Type"
                        value={metrics.deviceType?.charAt(0).toUpperCase() + metrics.deviceType?.slice(1)}
                    />

                    {metrics.batteryLevel !== undefined && (
                        <MetricItem
                            icon={Battery}
                            label={`Battery ${metrics.isCharging ? '(Charging)' : ''}`}
                            value={metrics.batteryLevel}
                            unit="%"
                        />
                    )}

                    {metrics.storageUsage !== undefined && metrics.storageQuota !== undefined && (
                        <MetricItem
                            icon={HardDrive}
                            label="Storage Used"
                            value={`${metrics.storageUsage}/${metrics.storageQuota}`}
                            unit="MB"
                        />
                    )}

                    <MetricItem
                        icon={Activity}
                        label="Service Worker"
                        value={typeof navigator !== 'undefined' && 'serviceWorker' in navigator ? 'Active' : 'Not Available'}
                    />
                </div>
            )}
        </div>
    );
}