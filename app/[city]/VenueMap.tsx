"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  latitude: number;
  longitude: number;
  venueName: string | null;
  cityName: string;
};

export default function VenueMap({ latitude, longitude, venueName, cityName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Leaflet touches `window` at import time, so load it only in the browser.
      const { default: L } = await import("leaflet");
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, { minZoom: 2 }).setView(
        [latitude, longitude],
        15
      );
      mapRef.current = map;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const marker = L.circleMarker([latitude, longitude], {
        radius: 10,
        color: "#1e3a8a",
        weight: 2,
        fillColor: "#ec4899",
        fillOpacity: 0.85,
      }).addTo(map);

      // textContent keeps names from being parsed as HTML.
      const popup = document.createElement("div");
      popup.className = "outfit flex flex-col gap-0.5";

      const heading = document.createElement("h1");
      heading.className = "galindo text-blue-dark text-base font-bold";
      heading.textContent = `Sunbeam ${cityName}`;
      popup.appendChild(heading);

      if (venueName) {
        const name = document.createElement("p");
        name.className = "text-sm text-blue-dark";
        name.textContent = venueName;
        popup.appendChild(name);
      }

      marker.bindPopup(popup).openPopup();
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude, venueName, cityName]);

  return <div ref={containerRef} className="w-full h-full" />;
}
