/**
 * Lightweight in-memory TTL cache — zero external dependencies.
 * Keys are strings; values are arbitrary serialisable objects.
 * Default TTL: 5 000 ms (5 seconds).
 */
const store = new Map();

/**
 * Read a cached value.
 * Returns null when the key is absent or has expired.
 */
export function getCache(key, ttlMs = 5_000) {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > ttlMs) {
    store.delete(key);
    return null;
  }
  return entry.data;
}

/** Write (or overwrite) a cached value. */
export function setCache(key, data) {
  store.set(key, { data, ts: Date.now() });
}

/** Remove a single cached entry. */
export function invalidateCache(key) {
  store.delete(key);
}

/** Remove all entries whose key starts with `prefix`. */
export function invalidatePrefix(prefix) {
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key);
  }
}
