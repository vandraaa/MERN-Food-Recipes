interface TableProps {
    headers: string[];
    rows: { [key: string]: any }[];
    action?: (row: { [key: string]: any }) => React.ReactNode;
  }

export default function Table({ headers, rows, action }: TableProps) {
  return (
    <div className="overflow-x-auto mt-4 mx-2 sm:mx-6">
      <table className="min-w-full bg-white border border-gray-200 text-center">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-700"
                >
                  {cell}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm flex items-center justify-center gap-x-2 text-gray-700">
                {action && action(row)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
