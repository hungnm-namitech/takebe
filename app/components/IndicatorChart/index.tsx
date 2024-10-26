import dynamic from "next/dynamic";
import { Layout, PlotData } from "plotly.js";
import React from "react";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type Props = {
  dataIndicator:
    | {
        participants: number;
      }
    | undefined;
};

const IndicatorChart = ({ dataIndicator }: Props) => {
  const data: Partial<PlotData>[] = [
    {
      type: "indicator",
      value: dataIndicator?.participants || 1,
      gauge: {
        axis: {
          visible: false,
          range: [0, 200],
        },
        bordercolor: "#1B9BC3",
        borderwidth: 2,
        bar: { color: "#1B9BC3" },
      },
      // domain: { row: 0, column: 0 },
      mode: "gauge+number",
      number: {
        font: {
          family: '"Fredoka", serif',
          color: "#F46D6D",
          size: 70,
        },
      },
    },
  ];

  const layout: Partial<Layout> = {
    width: 325,
    height: 161,
    margin: { t: 0, b: 0, l: 0, r: 0 },
    autosize: true,
  };
  return (
    <div>
      <Plot
        data={data}
        layout={layout}
        config={{ displaylogo: false, displayModeBar: false }}
        style={{ fontWeight: "bolder" }}
      />
    </div>
  );
};

export default IndicatorChart;
