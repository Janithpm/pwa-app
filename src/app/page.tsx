"use client";
import OnlineStatus from "@/components/OnlineStatus";
import PWACache from "@/components/PWACache";
import PWAInstallButton from "@/components/PWAInstallButton";
import PWAMetrics from "@/components/PWAMetrics";
import PWANotifications from "@/components/PWANotifications";
import ServiceWorkerStatus from "@/components/ServiceWorkerStatus";
import { Activity, Bell, Database, Settings, TrendingUp } from "lucide-react";

export default function Home() {

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="mb-8 ">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              PWA Dashboard
            </h2>
            <p className="text-gray-600">
              Monitor your Progressive Web App status, metrics, and capabilities.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <OnlineStatus />
            <PWAInstallButton />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                PWA Status
              </h3>
            </div>
            <ServiceWorkerStatus />
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                PWA Features
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Offline Support</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  Enabled
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">App Manifest</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  Configured
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Push Notifications</span>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  Available
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Background Sync</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  Supported
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Notifications
              </h3>
            </div>
            <PWANotifications />
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Database className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Cache Management
              </h3>
            </div>
            <PWACache />
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Performance & Device Metrics
              </h3>
            </div>
            <PWAMetrics />
          </div>
        </div>
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={async () => {
                if ('caches' in window) {
                  const cacheNames = await caches.keys();
                  await Promise.all(cacheNames.map(name => caches.delete(name)));
                  window.location.reload();
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Cache
            </button>
            <button
              onClick={() => {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistration().then(registration => {
                    if (registration) {
                      registration.update();
                      alert('App update check initiated!');
                    }
                  });
                }
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Update App
            </button>
            <button
              onClick={() => {
                if (navigator.onLine) {
                  alert('You are currently online. To test offline mode, disable your internet connection and refresh the page.');
                } else {
                  alert('You are currently in offline mode! The app is working with cached data.');
                }
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Test Offline Mode
            </button>
            <button
              onClick={() => {
                const nav = navigator as any;
                const data = {
                  timestamp: new Date().toISOString(),
                  userAgent: navigator.userAgent,
                  connectionType: nav.connection?.effectiveType || 'unknown',
                  isOnline: navigator.onLine,
                  pwaPlatform: window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser'
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'pwa-data-export.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Export Data
            </button>
          </div>
        </div>
      </main >
    </div >
  );
}
