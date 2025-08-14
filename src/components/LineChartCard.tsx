"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type Point = Record<string, string | number>;

type YFormatOptions = Intl.NumberFormatOptions & {
  locale?: string; // defaults to browser locale
};

type Props = {
  title: string;
  data: Point[];
  xKey: keyof Point;
  yKey: keyof Point;
  yLabel?: string;
  yFormatOptions?: YFormatOptions; // ← serializable object, not a function
};

export default function LineChartCard({
  title,
  data,
  xKey,
  yKey,
  yLabel,
  yFormatOptions,
}: Props) {
  const locale = yFormatOptions?.locale;
  const nf = useMemo(
    () => new Intl.NumberFormat(locale, yFormatOptions),
    [locale, yFormatOptions]
  );

  return (
    <div className="mt-6 rounded-2xl border bg-white p-4 shadow-sm">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey as string} />
            <YAxis
              tickFormatter={(v: number) => nf.format(v)}
              label={
                yLabel
                  ? {
                      value: yLabel,
                      angle: -90,
                      position: "insideLeft",
                      offset: 10,
                    }
                  : undefined
              }
              width={yLabel ? 48 : 40}
            />
            <Tooltip
              formatter={(value: unknown) => {
                const n = typeof value === "number" ? value : Number(value);
                return nf.format(n);
              }}
              labelClassName="text-sm"
            />
            <Line type="monotone" dataKey={yKey as string} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
