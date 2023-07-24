import { euCountries } from "@/eu-countries";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polygon,
  FeatureGroup,
  Circle,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e: any) {
      map.locate();
      setPosition(e.latlng);
    },
    // locationfound(e: any) {
    //   setPosition(e.latlng);
    // map.flyTo(e.latlng, map.getZoom());
    // },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const multiPolygon = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
  ],
];

const purpleOptions = { color: "purple" };

const Component = () => (
  <FeatureGroup>
    <EditControl
      position="topright"
      onEdited={() => {}}
      onCreated={() => {}}
      onDeleted={() => {}}
      draw={{
        rectangle: false,
      }}
    />
    <Circle center={[51.51, -0.06]} radius={200} />
  </FeatureGroup>
);

export default function Map() {
  const [position, setPosition] = useState<any>([51.505, -0.09]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      /> */}
      {/* <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      <LocationMarker />
      {/* <Polygon pathOptions={purpleOptions} positions={[[[20.59024743010491, 41.855404161133606], [20.463175083099202, 41.51508901627534], [20.605181919037364, 41.086226304685226], [21.0200403174764, 40.84272695572588], [20.999989861747224, 40.58000397395398], [20.674996779063633, 40.43499990494303], [20.615000441172754, 40.11000682225938], [20.15001590341052, 39.62499766698397], [19.980000441170148, 39.69499339452341], [19.960001661873207, 39.91500580500605], [19.406081984136733, 40.250773423822466], [19.319058872157143, 40.72723012955356], [19.40354983895429, 41.40956574153546], [19.540027296637106, 41.71998607031276], [19.37176883309496, 41.877547512370654], [19.304486118250793, 42.19574514420782], [19.73805138517963, 42.68824738216557], [19.801613396898688, 42.50009349219084], [20.0707, 42.58863], [20.283754510181893, 42.32025950781508], [20.52295, 42.21787], [20.59024743010491, 41.855404161133606]]]} /> */}
      {euCountries.features.map((e, i) => (
        <Polygon
          eventHandlers={{
            mouseover: (e) => {
              console.log(e);
              e.target.setStyle({
                weight: 5,
                color: "#666",
                dashArray: "",
                fillOpacity: 0.7,
              });
            },
          }}
          pathOptions={purpleOptions}
          positions={e.geometry.coordinates as any}
          key={i}
        />
      ))}
      <Component />
    </MapContainer>
  );
}
