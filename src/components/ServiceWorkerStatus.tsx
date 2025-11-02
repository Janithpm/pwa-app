"use client";
import React, { useState, useEffect } from "react";
import { Settings, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface ServiceWorkerStatus {
    supported: boolean;
    registered: boolean;
    active: boolean;
    waiting: boolean;
    registration?: ServiceWorkerRegistration;
}

const StatusIndicator = ({ active, label }: { active: boolean; label: string }) => (
    <div className="flex items-center gap-2">
        {active ? (
            <CheckCircle size={16} className="text-green-600" />
        ) : (
            <XCircle size={16} className="text-red-600" />
        )}
        <span className="text-sm">{label}</span>
    </div>
);

export default function ServiceWorkerStatus() {
    const [swStatus, setSwStatus] = useState<ServiceWorkerStatus>(() => ({
        supported: typeof navigator !== 'undefined' && 'serviceWorker' in navigator,
        registered: false,
        active: false,
        waiting: false,
    }));

    useEffect(() => {
        if (!swStatus.supported) return;

        // Check current registration
        navigator.serviceWorker.getRegistration()
            .then(registration => {
                if (registration) {
                    setSwStatus(prev => ({
                        ...prev,
                        registered: true,
                        active: !!registration.active,
                        waiting: !!registration.waiting,
                        registration
                    }));
                }
            })
            .catch(error => {
                console.error('Error checking service worker registration:', error);
            });

        // Listen for updates
        const handleControllerChange = () => {
            setSwStatus(prev => ({ ...prev, active: true }));
        };

        navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

        return () => {
            navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
        };
    }, [swStatus.supported]);

    const registerServiceWorker = async () => {
        if (!('serviceWorker' in navigator)) return;

        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js');
            setSwStatus(prev => ({
                ...prev,
                registered: true,
                active: !!registration.active,
                waiting: !!registration.waiting,
                registration
            }));
        } catch (error) {
            console.error('Service worker registration failed:', error);
        }
    };

    const unregisterServiceWorker = async () => {
        if (!swStatus.registration) return;

        try {
            await swStatus.registration.unregister();
            setSwStatus(prev => ({
                ...prev,
                registered: false,
                active: false,
                waiting: false,
                registration: undefined
            }));
        } catch (error) {
            console.error('Service worker unregistration failed:', error);
        }
    };

    if (!swStatus.supported) {
        return (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                    <AlertCircle size={20} className="text-yellow-600" />
                    <div>
                        <h4 className="font-medium text-yellow-900">Service Workers Not Supported</h4>
                        <p className="text-sm text-yellow-700">Your browser doesn&apos;t support service workers.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Settings size={20} className="text-blue-600" />
                    <h4 className="font-medium text-gray-900">Service Worker</h4>
                </div>

                <div className="flex gap-2">
                    {!swStatus.registered ? (
                        <button
                            onClick={registerServiceWorker}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            Register
                        </button>
                    ) : (
                        <button
                            onClick={unregisterServiceWorker}
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                            Unregister
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <StatusIndicator active={swStatus.supported} label="Supported" />
                <StatusIndicator active={swStatus.registered} label="Registered" />
                <StatusIndicator active={swStatus.active} label="Active" />
                {swStatus.waiting && (
                    <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-yellow-600" />
                        <span className="text-sm">Update Available</span>
                    </div>
                )}
            </div>
        </div>
    );
}