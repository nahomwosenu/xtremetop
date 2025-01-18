import React, { useEffect, useState } from "react";
import { useSearch } from "../../context/SearchContext";

interface ServerMenuProps {
  letter?: string;
  servers: string[];
}

const ServerMenu: React.FC<ServerMenuProps> = ({ letter, servers }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [rows, setFilteredRows] = useState<Array<Array<string | { key: string } | null>>>([]);
  const { searchTerm } = useSearch();
  useEffect(() => {
    // Group servers by their first letter
    servers = searchTerm ? servers.filter((s) => s.toLowerCase().includes(searchTerm)) : servers;
    const groupedGames = servers.reduce((acc: { [key: string]: string[] }, game) => {
      const firstLetter = game[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(game);
      return acc;
    }, {});

    // Sort keys alphabetically
    const sortedKeys = Object.keys(groupedGames).sort();

    // Filter groups based on the letter prop (if provided)
    const filteredKeys = letter ? sortedKeys.filter((key) => key === letter.toUpperCase()) : sortedKeys;

    // Flatten data for column-first layout
    const flatData: Array<string | { key: string }> = [];
    filteredKeys.forEach((key) => {
      flatData.push({ key }); // Add the group title
      flatData.push(...groupedGames[key].sort()); // Add the games
    });

    // Prepare column-first layout
    const columnCount = 4; // Number of columns
    const rs: Array<Array<string | { key: string } | null>> = [];

    for (let i = 0; i < Math.ceil(flatData.length / columnCount); i++) {
      const row = [];
      for (let j = 0; j < columnCount; j++) {
        const index = i + j * Math.ceil(flatData.length / columnCount);
        row.push(flatData[index] || null); // Fill with `null` for empty cells
      }
      rs.push(row);
    }

    setFilteredRows(rs); // Update state with filtered and grouped rows
  }, [searchTerm, servers, letter]);


  return (
    <div className="text-white p-4 relative">
      <table className="table-fixed border-collapse border border-[#F6B723] w-max bg-blue-900 ">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className="align-top border border-[#F6B723] p-2 text-start"
                  style={{ verticalAlign: "top" }}
                >
                  {cell ? (
                    typeof cell === "object" ? (
                      <span className="font-bold text-[#F6B723]">{cell.key}</span> // Render group title
                    ) : (
                      <span className="hover:underline">{cell}</span> // Render game
                    )
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default ServerMenu;

/*
game: 671737eb16223d8c09d8a176
title: "Fire Fury"
region: "67119f616a3cc759b6a6d798"
description: "7 days to die games"

screenshots: []
serverStatus: "online"
rating: 0
totalVotes: 0
owner: 67263caa8771929ae7b34515

votes: []

reviews: []

tags: ["test","test server"]
server_ip: "192.168.1.1"
server_port: "25000"
server_query_port: "25001"
createdAt: 2024 - 11-02T14: 58:00.928 +00:00
updatedAt: 2024 - 11-02T14: 58:00.928 +00:00

*/
