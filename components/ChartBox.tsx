import React from 'react';

type ChartBoxProps = {
  title: string;
};

const ChartBox: React.FC<ChartBoxProps> = ({ title }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {/* Put chart component or placeholder here */}
      <div className="h-40 bg-gray-100 rounded mt-2"></div>
    </div>
  );
};

export default ChartBox;
