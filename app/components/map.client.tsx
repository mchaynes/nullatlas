import { type LatLngTuple } from "leaflet";
import { FeatureLayer, BasemapLayer } from 'react-esri-leaflet'
import { MapContainer } from 'react-leaflet/MapContainer'
import { ZoomControl } from 'react-leaflet/ZoomControl'
import globe from '#app/routes/_marketing+/logos/punk-rock.png'


import { UserDropdown } from './profile-dropdown.tsx';
import { SearchBar } from './search-bar.tsx';

export default function Map() {
  const position: LatLngTuple = [51.505, -0.09];

  return (
    <>
      <MapContainer
        className="absolute top-0 left-0 h-full p-0 m-0 w-full"
        style={{
          position: "absolute",
        }}
        center={position}
        zoom={13}
        zoomControl={false}
      >
        <ZoomControl position='bottomright' />
        <BasemapLayer name="DarkGray" />
        <FeatureLayer
          url="https://gismaps.kingcounty.gov/arcgis/rest/services/Environment/KingCo_SensitiveAreas/MapServer/11"
        />
      </MapContainer>
      <div className="absolute top-0 left-0 h-[50rem] p-0 m-0 z-[10000] w-full pointer-events-none">
        <div className="w-full flex flex-col justify-center p-10">
          <div className="w-2/3 flex flex-row justify-between self-center pointer-events-auto">
            <div className="rounded-xl bg-black p-1">
              <img src={globe} width={"60px"} height={"60px"} />
            </div>
            <div className="w-2/3">
              <SearchBar status="idle" />
            </div>
            <UserDropdown />
          </div>
        </div>
      </div>
    </>
  );
}
