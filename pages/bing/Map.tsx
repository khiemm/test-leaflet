import * as L from "leaflet";
import "leaflet-bing-layer";
import { useEffect, useRef } from "react";

export default function Bing() {
  const onlyOne = useRef(false);

  useEffect(() => {
    if (onlyOne.current) return;
    const map = L.map("map").setView([51.505, -0.09], 13);
    (L as any).tileLayer
      .bing("ArAM6ztPMShW1CO6ZEGlnOCF8vY316ZCTuImE57Y-esG58dA4neiBkuRXl4XQq73")
      .addTo(map);
    onlyOne.current = true;
  }, []);

  return <div id="map"></div>;
}
