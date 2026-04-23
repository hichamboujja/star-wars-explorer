import React from "react";

const PeopleCard = ({ person }) => {
  return (
    <div className="dark:text-neutral-400 hover:bg-white hover:dark:bg-neutral-800 transition ease-in-out duration-500 p-5 min-h-80 w-80 hover:shadow-2xl rounded-md border border-neutral-600">
      {person.image && (
        <img 
          src={person.image} 
          alt={person.name}
          className="w-full h-40 object-cover rounded-md mb-3"
          onError={(e) => e.target.style.display = 'none'}
        />
      )}
      <h1 className="font-bold truncate dark:text-neutral-200 text-neutral-900 text-3xl pb-5 border-b border-neutral-500">
        {person.name}
        {(person.name === "R2-D2" || person.name === "C-3PO" || person.name === "IG-88" || person.name === "BB-8") && (
          <span className="ml-3 text-sm bg-gray-600 text-white px-2 py-1 rounded-full inline-block align-middle">
            🤖 Droïde
          </span>
        )}
      </h1>
      <p className="pt-2">Species: {person.species || "Human"}</p>
      <p className="pt-2">Gender: {person.gender || "Unknown"}</p>
      <p className="pt-2">Homeworld: {person.homeworld || "Unknown"}</p>
    </div>
  );
};

export default PeopleCard;