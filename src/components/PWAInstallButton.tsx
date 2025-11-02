"use client";
import React, { useState, useEffect } from "react";
import { Download, Check } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const checkInstalled = () => {
            if (typeof window === 'undefined') return;

            if (window.matchMedia('(display-mode: standalone)').matches) {
                setIsInstalled(true);
                return;
            }

            if ('navigator' in window && 'standalone' in window.navigator) {
                setIsInstalled((window.navigator as any).standalone);
                return;
            }
        };

        checkInstalled();

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowButton(true);
        };

        const handleAppInstalled = () => {
            setIsInstalled(true);
            setShowButton(false);
            setDeferredPrompt(null);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.addEventListener('appinstalled', handleAppInstalled);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
                window.removeEventListener('appinstalled', handleAppInstalled);
            }
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        try {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === 'accepted') {
                setShowButton(false);
                setDeferredPrompt(null);
            }
        } catch (error) {
            console.error('Error during installation:', error);
        }
    };

    if (isInstalled) {
        return (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                <Check size={16} />
                <span className="text-sm font-medium">App Installed</span>
            </div>
        );
    }

    if (!showButton) return null;

    return (
        <button
            onClick={handleInstallClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
            <Download size={16} />
            <span className="text-sm font-medium">Install App</span>
        </button>
    );
}