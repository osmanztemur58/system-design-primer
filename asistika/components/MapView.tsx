"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { PinItem } from "@/lib/store";

interface MapViewProps {
  pins: PinItem[];
}

export default function MapView({ pins }: MapViewProps) {
  const center = { lat: pins[0]?.lat ?? 37.7749, lng: pins[0]?.lng ?? -122.4194 };
  return (
    <div className="w-full h-[480px] rounded-xl overflow-hidden border border-[--color-border]">
      <MapContainer center={[center.lat, center.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]}>
            <Popup>
              <div className="text-sm">
                <div className="font-medium">{p.name}</div>
                <div className="text-[--color-muted]">{p.type}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}