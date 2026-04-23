import React, { useEffect, useState } from "react";
import { PeopleCard, CardSkeleton } from "../Components";

const People = () => {
  const [people, setPeople] = useState(null);
  const [filteredPeople, setFilteredPeople] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDroidsOnly, setShowDroidsOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const droids = ["R2-D2", "C-3PO", "IG-88", "BB-8", "IG-11", "K-2SO", "D-O", "L3-37"];

  useEffect(() => {
    fetch("https://akabab.github.io/starwars-api/api/all.json")
      .then((res) => res.json())
      .then((data) => {
        const characters = data.filter(item => item.type === "people" || item.name);
        setPeople(characters);
        setFilteredPeople(characters);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API :", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (people) {
      let filtered = people;
      
      if (showDroidsOnly) {
        filtered = filtered.filter(char => droids.includes(char.name));
      }
      
      if (searchTerm.trim()) {
        filtered = filtered.filter(char => 
          char.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      setFilteredPeople(filtered);
    }
  }, [showDroidsOnly, searchTerm, people]);

  if (loading) {
    return (
      <div className="w-full h-fit flex flex-wrap justify-center gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold dark:text-white">
          🌟 Star Wars Characters ({filteredPeople?.length})
        </h2>
        
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button
            onClick={() => setShowDroidsOnly(!showDroidsOnly)}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              showDroidsOnly 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            {showDroidsOnly ? "👥 All Characters" : "🤖 Droids Only"}
          </button>
        </div>
      </div>
      
      {filteredPeople?.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 dark:text-gray-400">No characters found 😢</p>
          <button 
            onClick={() => {setSearchTerm(""); setShowDroidsOnly(false);}}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="w-full h-fit flex justify-center flex-wrap gap-5">
          {filteredPeople.map((character) => (
            <PeopleCard key={character.id} person={character} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;