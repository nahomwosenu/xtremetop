import React, { useState } from "react";

interface ServerMenuProps {
  letter: string;
  servers: string[];
}

const ServerMenu: React.FC<ServerMenuProps> = ({ letter, servers }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-gray-800 rounded shadow-md overflow-hidden">
      {/* Header */}
      <div
        className="p-2 bg-gray-700 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-bold">{letter}</span>
        <button className="text-yellow-500">{isExpanded ? "▼" : "▲"}</button>
      </div>

      {/* Server List */}
      {isExpanded && (
        <ul className="p-2 space-y-1">
          {servers.map((server) => (
            <li
              key={server}
              className="hover:bg-gray-600 p-2 rounded cursor-pointer"
            >
              {server}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServerMenu;
