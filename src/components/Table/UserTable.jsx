"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";

// Dummy data for demonstration
const users = [
  {
    id: 1,
    username: "john_doe",
    state: "California",
    city: "Los Angeles",
    pincode: "90001",
    plan: "Premium",
  },
  {
    id: 2,
    username: "jane_smith",
    state: "New York",
    city: "New York City",
    pincode: "10001",
    plan: "Basic",
  },
  {
    id: 3,
    username: "bob_johnson",
    state: "Texas",
    city: "Houston",
    pincode: "77001",
    plan: "Standard",
  },
  {
    id: 4,
    username: "alice_williams",
    state: "Florida",
    city: "Miami",
    pincode: "33101",
    plan: "Premium",
  },
  {
    id: 5,
    username: "charlie_brown",
    state: "Illinois",
    city: "Chicago",
    pincode: "60601",
    plan: "Basic",
  },
];
function sortData(data, sortKey, reverse) {
  if (!sortKey) return data;

  const sortedData = data.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}

export default function UserTable() {
  const [sortKey, setSortKey] = useState("username");
  const [sortOrder, setSortOrder] = useState("ascn");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    username: true,
    address: true,
    plan: true,
    userId: true,
  });

  const sortedData = sortData(users, sortKey, sortOrder === "desc");

  const filteredData = sortedData.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().startsWith(searchTerm.toLowerCase())
    )
  );

  function changeSort(key) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md w-full"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Object.entries(visibleColumns).map(([key, value]) => (
              <DropdownMenuCheckboxItem
                key={key}
                className="capitalize"
                checked={value}
                onCheckedChange={(checked) =>
                  setVisibleColumns((prev) => ({ ...prev, [key]: checked }))
                }
              >
                {key}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.username && (
                <TableHead className="w-[150px]">
                  <Button
                    variant="ghost"
                    onClick={() => changeSort("username")}
                  >
                    Username
                    {sortKey === "username" &&
                      (sortOrder === "ascn" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
              )}
              {visibleColumns.address && (
                <TableHead className="min-w-[250px]">
                  <Button variant="ghost" onClick={() => changeSort("state")}>
                    Address
                    {sortKey === "state" &&
                      (sortOrder === "ascn" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
              )}
              {visibleColumns.plan && (
                <TableHead className="w-[150px]">
                  <Button variant="ghost" onClick={() => changeSort("plan")}>
                    Plan
                    {sortKey === "plan" &&
                      (sortOrder === "ascn" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
              )}
              {visibleColumns.userId && (
                <TableHead className="w-[100px]">User ID</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((user) => (
              <TableRow key={user.id}>
                {visibleColumns.username && (
                  <TableCell className="font-medium">{user.username}</TableCell>
                )}
                {visibleColumns.address && (
                  <TableCell>
                    {user.city}, {user.state} {user.pincode}
                  </TableCell>
                )}
                {visibleColumns.plan && <TableCell>{user.plan}</TableCell>}
                {visibleColumns.userId && (
                  <TableCell>
                    <Link
                      href={`/user/${user.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {user.id}
                    </Link>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
