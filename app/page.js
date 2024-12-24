// pages/index.js

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Documentation from "./components/Documentation";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

/**
 * -------------------------------------------
 *  "Hashem Hasan Data Sorter"
 * -------------------------------------------
 */
export default function Home() {
  // -------------------------
  // State Hooks
  // -------------------------
  // Original user data (as JSON string for editable input)
  const [users, setUsers] = useState("[]");
  // Sorted data
  const [sortedData, setSortedData] = useState([]);
  // Sorting key
  const [sortKey, setSortKey] = useState("weight");
  // Overweight percentage
  const [overweightPercentage, setOverweightPercentage] = useState(0);
  // Show overweight section
  const [showOverweight, setShowOverweight] = useState(false);
  // Which code tooltip to show: "js" or "cpp"
  const [showCodeTooltip, setShowCodeTooltip] = useState<null | "js" | "cpp">(null);
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // -------------------------
  // useEffect to fetch data
  // -------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Convert to JSON string for editable textarea
        setUsers(JSON.stringify(data.users, null, 2));
        setIsLoading(false);
        // Initially, do not show overweight percentage
        setShowOverweight(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch user data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // -------------------------
  // Selection Sort Function
  // -------------------------
  /**
   * selectionSort
   * -------------
   * Sorts an array of objects by a given numeric key
   * using the Selection Sort algorithm.
   *
   * @param {Array} array - The array to sort.
   * @param {String} key - The property name to sort by (e.g., "weight" or "height").
   * @returns {Array} - A new sorted array.
   */
  const selectionSort = (array, key) => {
    const arr = [...array];

    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        // Ensure comparison is numeric
        if (Number(arr[j][key]) < Number(arr[minIndex][key])) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      }
    }
    return arr;
  };

  // -------------------------
  // Overweight Percentage
  // -------------------------
  /**
   * calculateOverweightPercentage
   * -----------------------------
   * Calculates the percentage of users who are considered overweight.
   * We define "overweight" by the standard BMI >= 25.
   *
   * BMI = weight(kg) / ((height(cm) / 100) * (height(cm) / 100))
   * Overweight if BMI >= 25
   *
   * @param {Array} usersList - The users data array.
   */
  const calculateOverweightPercentage = (usersList) => {
    if (!usersList?.length) return;

    let overweightCount = 0;

    usersList.forEach((user) => {
      const heightInMeters = user.height / 100;
      const bmi = user.weight / (heightInMeters * heightInMeters);
      if (bmi >= 25) {
        overweightCount++;
      }
    });

    const percentage = (overweightCount / usersList.length) * 100;
    setOverweightPercentage(percentage.toFixed(2));
  };

  // -------------------------
  // Handle Sort Function
  // -------------------------
  const handleSort = () => {
    try {
      const parsedData = JSON.parse(users);
      const sorted = selectionSort(parsedData, sortKey);
      setSortedData(sorted);
      calculateOverweightPercentage(sorted);
      setShowOverweight(true); // Show overweight percentage after sorting
      setError(null); // Clear any previous errors
    } catch (error) {
      alert("Invalid JSON data. Please correct it before sorting.");
      console.error("Error parsing JSON:", error);
      setError("Invalid JSON format. Please ensure the data is correctly formatted.");
    }
  };

  // -------------------------
  // Chart Data
  // -------------------------
  const chartData = {
    labels: ["Overweight", "Normal"],
    datasets: [
      {
        label: "% of Users",
        data: [overweightPercentage, (100 - overweightPercentage).toFixed(2)],
        backgroundColor: ["#f87171", "#60a5fa"],
      },
    ],
  };

  // -------------------------
  // Code Snippets
  // -------------------------
  const jsCode = `// Selection Sort Function (JavaScript)
const selectionSort = (array, key) => {
  const arr = [...array];

  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (Number(arr[j][key]) < Number(arr[minIndex][key])) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
};`;

  const cppCode = `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct User {
    string firstName;
    string lastName;
    string email;
    double weight; 
    double height;
    string country;
};

// Selection Sort for weight or height
void selectionSort(vector<User> &arr, const string &key) {
    for (int i = 0; i < (int)arr.size() - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < (int)arr.size(); j++) {
            double valJ = (key == "weight") ? arr[j].weight : arr[j].height;
            double valMin = (key == "weight") ? arr[minIndex].weight : arr[minIndex].height;

            if (valJ < valMin) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            User temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

int main() {
    // Example fake data
    vector<User> users = {
        {"John", "Doe", "john.doe@example.com", 75.0, 180.0, "USA"},
        {"Jane", "Smith", "jane.smith@example.com", 62.0, 165.0, "UK"},
        {"Michael", "Brown", "michael.brown@example.com", 90.0, 185.0, "Canada"},
        {"Emily", "Johnson", "emily.johnson@example.com", 68.5, 158.0, "Australia"},
        {"Daniel", "Lee", "daniel.lee@example.com", 85.2, 176.0, "Germany"}
    };

    // Sort by weight (change to "height" if needed)
    selectionSort(users, "weight");

    // Print sorted data
    cout << "Sorted by weight:\\n";
    for (auto &u : users) {
        cout << u.firstName << " " << u.lastName
             << ", Email: " << u.email
             << ", Weight: " << u.weight
             << ", Height: " << u.height
             << ", Country: " << u.country << "\\n";
    }

    return 0;
}
`;

  // -------------------------
  // Render User Information
  // -------------------------
  const renderUserTable = (data) => {
    return (
      <div className="h-96 overflow-y-auto border rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Weight (kg)</th>
              <th className="py-2 px-4 border-b">Height (cm)</th>
              <th className="py-2 px-4 border-b">Country</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{`${user.firstName} ${user.lastName}`}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.weight}</td>
                <td className="py-2 px-4 border-b">{user.height}</td>
                <td className="py-2 px-4 border-b">{user.address?.country || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      {/* Header */}
      <motion.div
        className="text-center items-center flex flex-col justify-center mb-12 relative"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold">Hashem Hasan Data Sorter</h1>

        <div className="flex gap-4 mt-4">
          {/* View JavaScript Code */}
          <div
            className="text-lg cursor-pointer relative underline"
            onMouseEnter={() => setShowCodeTooltip("js")}
            onMouseLeave={() => setShowCodeTooltip(null)}
          >
            <span>View JavaScript Code</span>
            <AnimatePresence>
              {showCodeTooltip === "js" && (
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-gray-800 text-left text-white p-4 rounded-lg shadow-lg z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <pre className="text-sm overflow-auto max-h-64">
                    <code>{jsCode}</code>
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View C++ Code */}
          <div
            className="text-lg cursor-pointer relative underline"
            onMouseEnter={() => setShowCodeTooltip("cpp")}
            onMouseLeave={() => setShowCodeTooltip(null)}
          >
            <span>View C++ Code</span>
            <AnimatePresence>
              {showCodeTooltip === "cpp" && (
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-gray-800 text-left text-white p-4 rounded-lg shadow-lg z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <pre className="text-sm overflow-auto max-h-64">
                    <code>{cppCode}</code>
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Editable Input */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-2">Input Data</h2>
          {isLoading ? (
            <p className="text-center text-gray-600">Loading data...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <textarea
              className="w-full h-96 p-4 border rounded-lg resize-none bg-gray-50 text-black font-mono"
              value={users}
              onChange={(e) => setUsers(e.target.value)}
              placeholder="Edit JSON data here..."
            ></textarea>
          )}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="sortKey" className="text-lg font-medium">
              Sort By:
            </label>
            <select
              id="sortKey"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="weight">Weight</option>
              <option value="height">Height</option>
            </select>
            <button
              onClick={handleSort}
              disabled={isLoading || !!error}
              className={`px-4 py-2 rounded-lg transition ${
                isLoading || !!error
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Sort Data
            </button>
          </div>
        </motion.div>

        {/* Sorted Output */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-2">Sorted Data</h2>
          {sortedData.length > 0 ? (
            renderUserTable(sortedData)
          ) : (
            <p className="text-gray-600">
              No sorted data to display. Please sort the data.
            </p>
          )}
        </motion.div>
      </div>

      {/* Overweight Percentage and Chart */}
      <AnimatePresence>
        {showOverweight && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Overweight Percentage</h2>
            <p className="text-xl font-medium mb-4">
              {overweightPercentage}% of users are overweight (BMI ≥ 25)
            </p>
            <div className="max-w-md mx-auto">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Overweight vs Normal",
                    },
                  },
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Documentation */}
      <Documentation />
    </div>
  );
}
