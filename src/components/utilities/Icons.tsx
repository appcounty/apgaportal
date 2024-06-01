import React from "react";

type iconProps = {
  name:
    | "arrow-down"
    | "arrow-up"
    | "loader"
    | "error-alert"
    | "info-alert"
    | "close";
  width?: string;
  height?: string;
  strokeColor?: string;
  bgColor?: string;
  strokeWidth?: string;
  className?: string;
  strokeLinecap?: "round" | "square";
  strokeLinejoin?: "round" | "miter" | "bevel" | "inherit" | undefined;
  clickHandler?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const Icon = ({
  name,
  width,
  height,
  strokeColor,
  bgColor,
  strokeWidth,
  className,
  strokeLinecap,
  strokeLinejoin,
  clickHandler,
}: iconProps): JSX.Element => {
  const icons = {
    "arrow-down": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-chevron-down"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "miter"}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 9l6 6l6 -6" />
      </svg>
    ),

    "arrow-up": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-chevron-up"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "miter"}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 15l6 -6l6 6" />
      </svg>
    ),

    loader: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-loader-2"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "miter"}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 3a9 9 0 1 0 9 9" />
      </svg>
    ),

    "error-alert": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-loader-2"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "miter"}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 9v-1a3 3 0 0 1 6 0v1" />
        <path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3" />
        <path d="M3 13l4 0" />
        <path d="M17 13l4 0" />
        <path d="M12 20l0 -6" />
        <path d="M4 19l3.35 -2" />
        <path d="M20 19l-3.35 -2" />
        <path d="M4 7l3.75 2.4" />
        <path d="M20 7l-3.75 2.4" />
      </svg>
    ),

    "info-alert": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-loader-2"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "miter"}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"
          strokeWidth="0"
          fill={`${bgColor || "currentColor"}`}
        />
      </svg>
    ),

    close: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-x"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "miter"}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    ),
  };

  return (
    <div onClick={clickHandler} className={className || ""}>
      {icons[name]}
    </div>
  );
};

export default Icon;
