import React, { useEffect, useState } from "react";

const Planets = () => {
  const [planets, setPlanets] = useState(null);
  const [filteredPlanets, setFilteredPlanets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // API SPÉCIFIQUE pour les planètes Star Wars
    fetch("https://swapi.dev/api/planets/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API SWAPI ne répond pas");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Planètes SWAPI :", data.results);
        setPlanets(data.results);
        setFilteredPlanets(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur SWAPI :", err);
        // PLANÈTES DE SECOURS (si SWAPI est down)
        const fallbackPlanets = [
          { name: "Tatooine", climate: "arid", terrain: "desert", population: "200000" },
          { name: "Alderaan", climate: "temperate", terrain: "grasslands, mountains", population: "2000000000" },
          { name: "Yavin IV", climate: "temperate, tropical", terrain: "jungle, rainforests", population: "1000" },
          { name: "Hoth", climate: "frozen", terrain: "tundra, ice caves", population: "0" },
          { name: "Dagobah", climate: "murky", terrain: "swamp, jungles", population: "0" },
          { name: "Bespin", climate: "temperate", terrain: "gas giant", population: "6000000" },
          { name: "Endor", climate: "temperate", terrain: "forests, mountains", population: "1000000" },
          { name: "Naboo", climate: "temperate", terrain: "grassy hills, swamps, forests", population: "4500000000" },
          { name: "Coruscant", climate: "temperate", terrain: "cityscape", population: "1000000000000" },
          { name: "Kamino", climate: "temperate", terrain: "ocean", population: "100000000" },
          { name: "Geonosis", climate: "hot, arid", terrain: "rock, desert", population: "100000000" },
          { name: "Mustafar", climate: "hot", terrain: "volcanoes, lava rivers", population: "20000" },
          { name: "Kashyyyk", climate: "tropical", terrain: "jungle, forests", population: "45000000" },
          { name: "Utapau", climate: "arid, temperate", terrain: "caves, sinkholes", population: "95000000" }
        ];
        setPlanets(fallbackPlanets);
        setFilteredPlanets(fallbackPlanets);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (planets) {
      let filtered = planets;
      
      if (searchTerm.trim()) {
        filtered = filtered.filter(planet => 
          planet.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      setFilteredPlanets(filtered);
    }
  }, [searchTerm, planets]);

  if (loading) {
    return (
      <div className="w-full h-fit flex flex-wrap justify-center gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="dark:text-neutral-400 p-5 min-h-80 w-80 rounded-md border border-neutral-600 animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold dark:text-white">
          🪐 Star Wars Planets ({filteredPlanets?.length})
        </h2>
        
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="🔍 Search planet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
          
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      
      {filteredPlanets?.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 dark:text-gray-400">🔍 No planet found for "{searchTerm}"</p>
          <button 
            onClick={() => setSearchTerm("")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="w-full h-fit flex justify-center flex-wrap gap-5">
          {filteredPlanets.map((planet, index) => (
            <div key={index} className="dark:text-neutral-400 hover:bg-white hover:dark:bg-neutral-800 transition ease-in-out duration-500 p-5 min-h-80 w-80 hover:shadow-2xl rounded-md border border-neutral-600">
              <h1 className="font-bold truncate dark:text-neutral-200 text-neutral-900 text-3xl pb-5 border-b border-neutral-500">
                🪐 {planet.name}
              </h1>
              <p className="pt-2">🌡️ Climate: {planet.climate || "Unknown"}</p>
              <p className="pt-2">⛰️ Terrain: {planet.terrain || "Unknown"}</p>
              <p className="pt-2">👥 Population: {planet.population === "unknown" ? "Unknown" : parseInt(planet.population)?.toLocaleString() || planet.population || "Unknown"}</p>
              {planet.diameter && planet.diameter !== "unknown" && (
                <p className="pt-2">📏 Diameter: {parseInt(planet.diameter).toLocaleString()} km</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;