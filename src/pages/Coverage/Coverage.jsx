import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const branches = useLoaderData();
  const position = [23.8103, 90.4125];
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = branches.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 15);
    }
  };

  return (
    <div className="mt-3 md:mt-8 mb-20 py-10 px-4 md:px-10 lg:px-24 space-y-10 bg-base-100 rounded-2xl">
      <title>Coverage | zapShip</title>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-left">
        We are available in 64 districts
      </h2>

      {/* Search Bar */}
      <div className="w-full max-w-md">
        <form onSubmit={handleSearch} className="flex">
          <input
            name="location"
            className="outline-1 outline-primary p-3 w-full rounded-l-full"
            type="text"
            placeholder="Search Location"
          />
          <button
            type="submit"
            className="btn bg-primary font-bold text-lg text-secondary rounded-r-full px-6"
          >
            Search
          </button>
        </form>
      </div>

      {/* Map */}
      <div>
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="
            w-full 
            h-[300px] 
            sm:h-[400px] 
            md:h-[500px] 
            lg:h-[700px] 
            xl:h-[800px]
            rounded-xl
            overflow-hidden
          "
          ref={mapRef}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {branches.map((branch, index) => (
            <Marker key={index} position={[branch.latitude, branch.longitude]}>
              <Popup>
                <strong>{branch.district}</strong>
                <br />
                Covered Area: {branch.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
