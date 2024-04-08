import React, { useState, useEffect } from 'react';
import './TableRepresentation.css';
import { useSelector } from 'react-redux';

const CategoryGraph = ({ columnname }) => {
  const data = useSelector((state) => state.selectedData);

  const graphbox = {
    borderRadius: '10px',
    height: '330px',
    width: '50%',
    padding: '1rem',
    boxShadow: '1px 5px 5px ',
  };

  const getCountsByCountry = () => {
    const counts = {};
    data.forEach((item) => {
      const country = item.Category;
      counts[country] = counts[country] ? counts[country] + 1 : 1;
    });
    return Object.entries(counts)
      .map(([country, count]) => ({ _id: country, count }))
      .sort((a, b) => b.count - a.count); // Sort by count in descending order
  };

  const [countryCounts, setCountryCounts] = useState(getCountsByCountry());

  useEffect(() => {
    setCountryCounts(getCountsByCountry());
  }, [data]);

  return (
    <div className="m-2" style={graphbox}>
      <h1 style={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center', color: '#0A6E7C' }}>
        Category Graph
        
      </h1>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {countryCounts.map((country, index) => (
              <tr key={index}>
                <td>{country._id}</td>
                <td>{country.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryGraph;
