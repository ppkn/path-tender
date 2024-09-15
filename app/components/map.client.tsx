import { Map, Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { EntriesResponse } from "pocketbase-types";

export default function Component({ entry }: { entry: EntriesResponse }) {
  return (
    <Map
      initialViewState={{
        longitude: -111.8861,
        latitude: 40.6076,
        zoom: 16,
      }}
      mapStyle={`https://api.maptiler.com/maps/7faccc7c-ec4b-408f-a216-4f92dd1ca79b/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}`}
      style={{ height: 350 }}
    >
      <Marker
        key={entry.id}
        latitude={entry.latitude}
        longitude={entry.longitude}
      />
    </Map>
  )
}

