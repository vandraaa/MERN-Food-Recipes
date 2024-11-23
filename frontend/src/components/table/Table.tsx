import React from "react";

interface TableProps {
  headers: string[];
  rows: { [key: string]: any }[];
  action?: (row: { [key: string]: any }) => React.ReactNode;
  updateStatus?: (row: { [key: string]: any }) => React.ReactNode;
  loading?: boolean;
}

export default function Table({
  headers,
  rows,
  action,
  updateStatus,
  loading = false,
}: TableProps) {
  return (
    <div className="mt-4 mx-2 sm:mx-6">
      {/* Wrapper untuk memastikan scroll hanya pada tabel */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-center">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={headers.length} className="my-4 mx-auto py-6">
                  <div className="flex justify-center items-center flex-col">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="text-sm text-gray-500 mt-3">
                      Loading data...
                    </p>
                  </div>
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-gray-500 py-6 text-sm font-medium"
                >
                  No Data Available.
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.keys(row)
                    .filter((key) => key !== "id")
                    .map((key, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-6 ${
                          row["image"] ? "h-24" : "py-4"
                        } whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm text-gray-700 align-middle`}
                      >
                        {key === "image" ? (
                          <img
                            src={row[key]}
                            alt="recipe"
                            className="h-4/5 max-h-4/5 object-contain mx-auto"
                          />
                        ) : (
                          row[key]
                        )}
                      </td>
                    ))}
                  <td
                    className={`${
                      row["image"] ? "h-24 px-2" : "py-4"
                    } whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm text-gray-700 align-middle`}
                  >
                    {action && action(row)}
                  </td>
                  <td
                    className={`${
                      row["image"] ? "h-24 px-2" : "py-4"
                    } whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm text-gray-700 align-middle`}
                  >
                    {updateStatus && updateStatus(row)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
