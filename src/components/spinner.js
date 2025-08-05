import React from "react";
import tw from "tailwind-styled-components";

// 기본 스피너 컴포넌트
const SpinnerContainer = tw.div`
  flex items-center justify-center
`;

// 원형 스피너
const CircularSpinner = tw.div`
  animate-spin rounded-full border-4 border-gray-200 border-t-blue-500
`;

// 점 3개 스피너
const DotsSpinner = tw.div`
  flex space-x-1
`;

const Dot = tw.div`
  w-2 h-2 bg-blue-500 rounded-full animate-bounce
`;

// 막대 스피너
const BarSpinner = tw.div`
  flex space-x-1
`;

const Bar = tw.div`
  w-1 h-6 bg-blue-500 rounded-full animate-pulse
`;

// 펄스 스피너
const PulseSpinner = tw.div`
  w-4 h-4 bg-blue-500 rounded-full animate-ping
`;

export default function Spinner({ 
  type = "circular", 
  size = "md", 
  color = "blue",
  className = "" 
}) {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const colorClasses = {
    blue: "border-t-blue-500 bg-blue-500",
    green: "border-t-green-500 bg-green-500", 
    red: "border-t-red-500 bg-red-500",
    yellow: "border-t-yellow-500 bg-yellow-500",
    purple: "border-t-purple-500 bg-purple-500"
  };

  const renderSpinner = () => {
    switch (type) {
      case "dots":
        return (
          <DotsSpinner className={className}>
            <Dot className={`bg-${color}-500`} style={{ animationDelay: "0ms" }} />
            <Dot className={`bg-${color}-500`} style={{ animationDelay: "150ms" }} />
            <Dot className={`bg-${color}-500`} style={{ animationDelay: "300ms" }} />
          </DotsSpinner>
        );
      
      case "bars":
        return (
          <BarSpinner className={className}>
            <Bar className={`bg-${color}-500`} style={{ animationDelay: "0ms" }} />
            <Bar className={`bg-${color}-500`} style={{ animationDelay: "150ms" }} />
            <Bar className={`bg-${color}-500`} style={{ animationDelay: "300ms" }} />
            <Bar className={`bg-${color}-500`} style={{ animationDelay: "450ms" }} />
          </BarSpinner>
        );
      
      case "pulse":
        return <PulseSpinner className={`${sizeClasses[size]} ${colorClasses[color]} ${className}`} />;
      
      case "circular":
      default:
        return (
          <CircularSpinner 
            className={`${sizeClasses[size]} ${colorClasses[color]} ${className}`}
          />
        );
    }
  };

  return (
    <SpinnerContainer className={className}>
      {renderSpinner()}
    </SpinnerContainer>
  );
}

// 특정 용도별 스피너 컴포넌트들
export const LoadingSpinner = ({ size = "md", className = "" }) => (
  <Spinner type="circular" size={size} color="blue" className={className} />
);

export const ButtonSpinner = ({ className = "" }) => (
  <Spinner type="circular" size="sm" color="white" className={className} />
);

export const PageSpinner = ({ className = "" }) => (
  <div className="flex items-center justify-center min-h-screen">
    <Spinner type="circular" size="xl" color="blue" className={className} />
  </div>
);

export const InlineSpinner = ({ className = "" }) => (
  <Spinner type="dots" size="sm" color="blue" className={className} />
);
