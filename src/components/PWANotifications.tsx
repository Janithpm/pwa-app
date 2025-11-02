"use client";
import React, { useState } from "react";
import { Bell, BellOff, CheckCircle, XCircle } from "lucide-react";

export default function PWANotifications() {
    const [permission, setPermission] = useState<NotificationPermission>(() =>
        typeof window !== 'undefined' && 'Notification' in window
            ? Notification.permission
            : 'default'
    );
    const [isSupported] = useState(() =>
        typeof window !== 'undefined' && 'Notification' in window
    );

    const requestPermission = async () => {
        if (!isSupported) return;

        try {
            const result = await Notification.requestPermission();
            setPermission(result);

            if (result === 'granted') {
                // Show a test notification
                new Notification('Effi Rental Dashboard', {
                    body: 'Notifications are now enabled!',
                    icon: '/icon512_rounded.png',
                    tag: 'welcome'
                });
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    };

    const sendTestNotification = () => {
        if (permission !== 'granted') return;

        new Notification('Test Notification', {
            body: 'This is a test notification from your rental dashboard.',
            icon: '/icon512_rounded.png',
            tag: 'test'
        });
    };

    if (!isSupported) {
        return (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                    <BellOff size={20} className="text-yellow-600" />
                    <div>
                        <h4 className="font-medium text-yellow-900">Notifications Not Supported</h4>
                        <p className="text-sm text-yellow-700">Your browser doesn&apos;t support push notifications.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Bell size={20} className="text-blue-600" />
                    <h4 className="font-medium text-gray-900">Push Notifications</h4>
                </div>

                <div className="flex items-center gap-2">
                    {permission === 'granted' ? (
                        <CheckCircle size={16} className="text-green-600" />
                    ) : permission === 'denied' ? (
                        <XCircle size={16} className="text-red-600" />
                    ) : null}
                    <span className="text-sm capitalize text-gray-600">
                        {permission}
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                {permission === 'default' && (
                    <button
                        onClick={requestPermission}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Enable Notifications
                    </button>
                )}

                {permission === 'granted' && (
                    <button
                        onClick={sendTestNotification}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Send Test Notification
                    </button>
                )}

                {permission === 'denied' && (
                    <p className="text-sm text-gray-600">
                        Notifications are blocked. You can enable them in your browser settings.
                    </p>
                )}
            </div>

            <div className="mt-4 text-xs text-gray-500">
                <p>Notifications can be used for:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Rental payment reminders</li>
                    <li>Property maintenance alerts</li>
                    <li>New tenant applications</li>
                    <li>System updates</li>
                </ul>
            </div>
        </div>
    );
}