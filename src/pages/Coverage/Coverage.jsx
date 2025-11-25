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
    <div className="mt-8 mb-28 py-20 px-24 space-y-12 bg-base-100 rounded-2xl">
      <title>Coverage | zapShip</title>
      <h2 className={`text-start!`}>We are available in 64 districts</h2>
      <div className="relative w-80">
        <form onSubmit={handleSearch}>
          {" "}
          <button
            type="submit"
            className="btn bg-primary font-bold text-xl text-secondary rounded-r-full absolute left-56"
          >
            Search
          </button>
          <input
            name="location"
            className="outline-1 outline-primary p-2 w-full rounded-full"
            type="text"
            placeholder="Search Location"
          />
        </form>
      </div>
      <div>
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[800px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {branches.map((branch, index) => (
            <Marker key={index} position={[branch.latitude, branch.longitude]}>
              <Popup>
                <strong>{branch.district}</strong>
                <br />
                Coverd Area : {branch.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
