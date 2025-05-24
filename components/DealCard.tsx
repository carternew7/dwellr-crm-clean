import React from 'react';

const DealCard = ({ title, stage, value }: any) => (
  <div className="p-4 bg-white rounded shadow">
    <h3 className="font-bold">{title}</h3>
    <p>Stage: {stage}</p>
    <p>Value: {value}</p>
  </div>
);

export default DealCard;