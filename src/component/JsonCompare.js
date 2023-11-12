import React, { useState } from 'react';
import deepDiff from 'deep-diff';

function JsonCompare() {
  const [json1, setJson1] = useState('');
  const [json2, setJson2] = useState('');
  const [differences, setDifferences] = useState([]);

  const handleCompare = () => {
    try {
      const obj1 = JSON.parse(json1);
      const obj2 = JSON.parse(json2);
      console.log(obj1);
      const differences = deepDiff.diff(obj1, obj2);
      setDifferences(differences);
      console.log("differences", differences)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <textarea onChange={(e) => setJson1(e.target.value)} />
      <textarea onChange={(e) => setJson2(e.target.value)} />
      <button onClick={handleCompare}>Compare</button>
      <ul>
        {differences.map((difference, index) => (
          <li key={index} style={{  backgroundColor: "#ffc107"}}>
            {JSON.stringify(difference)}
          </li>
        ))}
      </ul>
      {/* <style>
        .difference {
          background-color: #ffc107;
        }
      </style> */}
    </div>
  );
}

export default JsonCompare;
