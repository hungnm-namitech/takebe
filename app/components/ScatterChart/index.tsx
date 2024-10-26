"use client";
import dynamic from "next/dynamic";
import { Layout, ScatterData } from "plotly.js";
import React, { useEffect, useMemo, useState } from "react";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type Props = {
  coordinates:
    | {
        coorDinatesX: number[];
        coorDinatesY: number[];
      }
    | undefined;
};

const ScatterChart = ({ coordinates }: Props) => {
  const [isTablet, setIsTablet] = useState(false);

  const maxY = useMemo(() => {
    let maxCoordinateY = 1;
    const defaultY = 40;
    if (coordinates)
      maxCoordinateY = Math.ceil(Math.max(...coordinates?.coorDinatesY));

    return maxCoordinateY > defaultY ? maxCoordinateY + 5 : defaultY;
  }, [coordinates?.coorDinatesY]);

  const maxX = useMemo(() => {
    let maxCoordinateX = 0.5;
    const defaultX = 1;
    if (coordinates)
      maxCoordinateX = Math.ceil(Math.max(...coordinates?.coorDinatesX));

    return maxCoordinateX > defaultX ? maxCoordinateX + 0.1 : defaultX;
  }, [coordinates?.coorDinatesX]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTablet(window.innerWidth <= 750);
    }

    const handleResize = () => {
      setIsTablet(window.innerWidth <= 750);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const trace1: Partial<ScatterData> = {
    x: coordinates?.coorDinatesX || [],
    y: coordinates?.coorDinatesY || [],
    mode: "markers",
    type: "scatter",
    name: "Team A",
    marker: { size: 7, color: "#1B9BC3" },
  };
  const data = [trace1];

  const layout: Partial<Layout> = {
    xaxis: {
      range: [0.3, maxX],
      gridcolor: "#1B9BC3",
      linecolor: "#1B9BC3",
      linewidth: 2,
      dividercolor: "red",
      dividerwidth: 2,
      fixedrange: true,
      showdividers: true,
    },
    yaxis: {
      range: [10, maxY],
      gridcolor: "#1B9BC3",
      linecolor: "#1B9BC3",
      linewidth: 2,
      dividercolor: "red",
      fixedrange: true,
      dividerwidth: 2,
      showdividers: true,
      showgrid: true,
    },
    font: {
      size: 12,
      family: '"Zen Maru Gothic", serif',
    },
    width: 886,
    height: 514,
    autosize: true,
    shapes: [
      {
        type: "line",
        x0: 0.3,
        y0: 25,
        x1: 25,
        y1: 25,
        line: {
          color: "#1B9BC3",
          width: 2,
          dash: "solid",
        },
      },
      {
        type: "line",
        x0: 0.3,
        x1: 1,
        y0: 40,
        y1: 40,
        line: {
          color: "#1B9BC3",
          width: 1,
          dash: "solid",
        },
      },
      {
        type: "line",
        x0: 1,
        x1: 1,
        y0: 10,
        y1: 40,
        line: {
          color: "#1B9BC3",
          width: 1,
          dash: "solid",
        },
      },
      {
        type: "rect",
        x0: 0.6,
        x1: 1,
        y0: 1,
        y1: 25,
        fillcolor: "#F46D6D",
        opacity: 0.1,
        line: {
          width: 0,
        },
      },
    ],
    annotations: [
      {
        x: 0.3,
        y: 25,
        text: "非肥満型",
        showarrow: false,
        xshift: 40,
        yshift: -13,
        font: {
          size: 15,
        },
      },
      {
        x: 0.3,
        y: 25,
        text: "肥満型",
        showarrow: false,
        xshift: 34,
        yshift: 13,
        font: {
          size: 15,
        },
      },
    ],
  };
  return (
    <div className="font-black">
      <Plot
        data={data}
        layout={layout}
        config={{ displayModeBar: false, responsive: true }}
        useResizeHandler={true}
        style={{
          width: "100%",
          height: "100%",
          fontWeight: "bold",
        }}
      />
    </div>
  );
};
export default ScatterChart;
