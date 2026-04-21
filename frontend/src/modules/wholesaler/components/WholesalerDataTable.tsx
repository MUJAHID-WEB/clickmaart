import type { ReactNode } from "react";

type WholesalerDataTableColumn<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
};

export default function WholesalerDataTable<T>({
  caption,
  columns,
  rows,
  emptyMessage,
}: {
  caption: string;
  columns: Array<WholesalerDataTableColumn<T>>;
  rows: T[];
  emptyMessage: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <p className="text-sm font-medium text-slate-700">{caption}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-white">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td
                      key={`${column.key}-${index}`}
                      className="px-4 py-4 align-top text-sm text-slate-700"
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
