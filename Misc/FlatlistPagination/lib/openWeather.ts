import Constants from "expo-constants";

export type OpenWeatherUnits = "standard" | "metric" | "imperial";

export type PaginatedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  hasMore: boolean;
};

export type OpenWeatherHistoryItem = {
  dt: number;
  timezone?: string;
  data: unknown;
};

type OpenWeatherFindItem = {
  id: number;
  name: string;
  dt: number;
  coord: { lat: number; lon: number };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind?: { speed: number; deg: number; gust?: number };
  sys?: { country?: string };
};

type OpenWeatherFindResponse = {
  message: string;
  cod: string;
  count: number;
  list: OpenWeatherFindItem[];
};

function getOpenWeatherApiKey(): string {
  // Expo public env vars are available at runtime as process.env.EXPO_PUBLIC_*
  const fromEnv = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv.trim();

  // Some setups inject env in expoConfig.extra; support it as a fallback.
  const fromExtra = (Constants.expoConfig?.extra as Record<string, unknown> | undefined)
    ?.OPENWEATHER_API_KEY;
  if (typeof fromExtra === "string" && fromExtra.trim().length > 0) return fromExtra.trim();

  throw new Error(
    "Missing OpenWeather API key. Set EXPO_PUBLIC_OPENWEATHER_API_KEY in your env (recommended)."
  );
}

async function fetchJson<T>(
  url: string,
  options?: { signal?: AbortSignal }
): Promise<T> {
  const res = await fetch(url, { signal: options?.signal });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`OpenWeather request failed (${res.status}): ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

/**
 * Fetch a "page" of weather search results from OpenWeather.
 *
 * OpenWeather's `/data/2.5/find` supports `cnt` (max 50) but no offset/page.
 * This helper emulates pagination by requesting up to `(page + 1) * pageSize` items
 * and slicing client-side to return only the requested page.
 */
export async function getOpenWeatherSearchPage(params: {
  query: string;
  page: number; // 1-based
  pageSize: number;
  units?: OpenWeatherUnits;
  lang?: string;
  signal?: AbortSignal;
}): Promise<PaginatedResult<OpenWeatherFindItem>> {
  const { query, page, pageSize, units = "metric", lang, signal } = params;

  if (!Number.isFinite(page) || page < 1) throw new Error("`page` must be >= 1");
  if (!Number.isFinite(pageSize) || pageSize < 1) throw new Error("`pageSize` must be >= 1");
  if (!query || query.trim().length === 0) throw new Error("`query` is required");

  const apiKey = getOpenWeatherApiKey();

  // We request one extra page to detect `hasMore`.
  const desiredCount = (page + 1) * pageSize;
  const cnt = Math.min(50, desiredCount);
  if (desiredCount > 50) {
    throw new Error(
      "Requested page exceeds OpenWeather /find limit (cnt max 50). Reduce page/pageSize or switch endpoint."
    );
  }

  const u = new URL("https://api.openweathermap.org/data/2.5/find");
  u.searchParams.set("q", query.trim());
  u.searchParams.set("cnt", String(cnt));
  u.searchParams.set("appid", apiKey);
  u.searchParams.set("units", units);
  if (lang) u.searchParams.set("lang", lang);

  const data = await fetchJson<OpenWeatherFindResponse>(u.toString(), { signal });

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const items = data.list.slice(start, end);
  const hasMore = data.list.length > end;

  return { items, page, pageSize, hasMore };
}

const PARIS = { lat: 48.8566, lon: 2.3522 };

function startOfDayUnixSeconds(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return Math.floor(d.getTime() / 1000);
}

function addDaysUnixSeconds(unixSeconds: number, days: number): number {
  return unixSeconds + days * 24 * 60 * 60;
}

/**
 * Fetch a "page" of historical weather for Paris.
 *
 * Uses One Call "Time Machine" endpoint (`/data/3.0/onecall/timemachine`).
 * Pagination is emulated by generating one timestamp per day and requesting those
 * timestamps in batches (pageSize).
 *
 * Note: OpenWeather plans/limits vary for historical ranges. If the API rejects older
 * timestamps, reduce the range or use a plan that supports it.
 */
export async function getParisWeatherHistoryPage(params: {
  from: Date; // inclusive (start of day)
  to: Date; // inclusive (start of day)
  page: number; // 1-based
  pageSize: number; // number of days per page
  units?: OpenWeatherUnits;
  lang?: string;
  signal?: AbortSignal;
}): Promise<PaginatedResult<OpenWeatherHistoryItem>> {
  const { from, to, page, pageSize, units = "metric", lang, signal } = params;

  if (!(from instanceof Date) || Number.isNaN(from.getTime())) throw new Error("`from` is invalid");
  if (!(to instanceof Date) || Number.isNaN(to.getTime())) throw new Error("`to` is invalid");
  if (!Number.isFinite(page) || page < 1) throw new Error("`page` must be >= 1");
  if (!Number.isFinite(pageSize) || pageSize < 1) throw new Error("`pageSize` must be >= 1");

  const apiKey = getOpenWeatherApiKey();

  const start = startOfDayUnixSeconds(from);
  const end = startOfDayUnixSeconds(to);
  if (end < start) throw new Error("`to` must be after or equal to `from`");

  const totalDays = Math.floor((end - start) / (24 * 60 * 60)) + 1;

  const pageStartIndex = (page - 1) * pageSize;
  const pageEndIndexExclusive = Math.min(totalDays, pageStartIndex + pageSize);
  const hasMore = pageEndIndexExclusive < totalDays;

  if (pageStartIndex >= totalDays) {
    return { items: [], page, pageSize, hasMore: false };
  }

  const dts: number[] = [];
  for (let i = pageStartIndex; i < pageEndIndexExclusive; i++) {
    dts.push(addDaysUnixSeconds(start, i));
  }

  const items = await Promise.all(
    dts.map(async (dt) => {
      const u = new URL("https://api.openweathermap.org/data/3.0/onecall/timemachine");
      u.searchParams.set("lat", String(PARIS.lat));
      u.searchParams.set("lon", String(PARIS.lon));
      u.searchParams.set("dt", String(dt));
      u.searchParams.set("appid", apiKey);
      u.searchParams.set("units", units);
      if (lang) u.searchParams.set("lang", lang);

      const data = await fetchJson<unknown>(u.toString(), { signal });
      const timezone = (data as { timezone?: string } | null)?.timezone;
      return { dt, timezone, data } satisfies OpenWeatherHistoryItem;
    })
  );

  return { items, page, pageSize, hasMore };
}

