import { Map, Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { pb } from "~/pocketbase";
import { useLoaderData } from "@remix-run/react";

export const clientLoader = async () => {
  return {
    entries: await pb.collection("entries").getFullList({
      sort: "-created",
    }),
  };
};

export default function MapRoute() {
  const { entries } = useLoaderData<typeof clientLoader>();
  return (
    <Map
      initialViewState={{
        longitude: -111.8861,
        latitude: 40.6076,
        zoom: 16,
      }}
      mapStyle={`https://api.maptiler.com/maps/7faccc7c-ec4b-408f-a216-4f92dd1ca79b/style.json?key=${
        import.meta.env.VITE_MAPTILER_KEY
      }`}
    >
      {entries.map((entry) => (
        <Marker
          key={entry.id}
          latitude={entry.latitude}
          longitude={entry.longitude}
        />
      ))}
    </Map>
  );
}
