const CACHE_NAME = "pwaapp-cache-v1";
const DB_NAME = "pwaapp";
const DB_VERSION = 1;
const DB_STORE_NAME = "myStore";

async function cacheCoreAssets() {
  const cache = await caches.open(CACHE_NAME);
  return await cache.addAll([
    "/",
    "/fallback",
  ]);
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheCoreAssets());
  self.skipWaiting();
});

async function clearOldCaches() {
  const cacheNames = await caches.keys();
  return await Promise.all(
    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .map((name_1) => caches.delete(name_1))
  );
}

self.addEventListener("activate", (event) => {
  event.waitUntil(clearOldCaches());
  self.clients.claim();
});

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(DB_STORE_NAME, { keyPath: "url" });
    };
  });
}

async function addData(url, jsonData) {
  const db = await openDb();
  const transaction = db.transaction(DB_STORE_NAME, "readwrite");
  const store = transaction.objectStore(DB_STORE_NAME);

  const data = {
    url,
    response: JSON.stringify(jsonData),
  };

  const request = store.put(data);
  await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function getData(url) {
  try {
    const db = await openDb();
    const transaction = db.transaction(DB_STORE_NAME, "readonly");
    const store = transaction.objectStore(DB_STORE_NAME);

    const request = store.get(url);

    const result = await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (result && result.response) {
      return JSON.parse(result.response);
    }

    return null;
  } catch (error) {
    console.error("Error retrieving from IndexedDB:", error);
    return null;
  }
}

async function cacheFirstStrategy(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    const networkResponse = await fetch(request);
    const responseClone = networkResponse.clone();
    await cache.put(request, responseClone);
    return networkResponse;
  } catch (error) {
    console.error("Cache first strategy failed:", error);
    return caches.match("/offline");
  }
}

async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const clone = response.clone();
      const contentType = response.headers.get("Content-Type") || "";
      if (contentType.includes("application/json")) {
        const data = await clone.json();
        await addData(request.url, data);
      }
      return response;
    }

    throw new Error("Network not OK");
  } catch (error) {
    console.error("Network first strategy failed:", error);
    const cachedData = await getData(request.url);
    if (cachedData) {
      return new Response(JSON.stringify(cachedData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return caches.match("/fallback");
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (!request.url.startsWith("http")) return;
  const url = new URL(request.url);
  if (url.origin === self.location.origin && request.mode !== "navigate") {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  event.respondWith(safeDynamicCaching(request));
});

async function safeDynamicCaching(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response.ok && request.url.startsWith(self.location.origin)) {
      cache.put(request, response.clone()).catch(() => { });
    }
    return response;
  } catch (error) {
    console.error("Dynamic caching failed:", error);
    return caches.match(request);
  }
}