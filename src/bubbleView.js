import React from 'react';
import {
  ScatterChart, XAxis, YAxis, ZAxis, Scatter, LabelList, Tooltip
} from 'recharts';

const data = [
    { topic: "Apple Devices", userUtterancesCount: 30, size: 30, utterances: ["new iphone", "new apple iphone", "apple watch"], color: "#FF6B6B" },
    { topic: "Google Pixel", userUtterancesCount: 20, size: 20, utterances: ["pixel 7", "google pixel", "pixel 6 pro"], color: "#FFD93D" },
    { topic: "Samsung Galaxy", userUtterancesCount: 25, size: 25, utterances: ["galaxy s21", "samsung galaxy", "galaxy s20"], color: "#6BCB77" },
    { topic: "OnePlus", userUtterancesCount: 15, size: 15, utterances: ["oneplus 9", "oneplus nord", "oneplus 8"], color: "#4D96FF" },
    { topic: "Other Phones", userUtterancesCount: 10, size: 10, utterances: ["xiaomi", "oppo", "vivo"], color: "#FF924C" },
    { topic: "Xiaomi", userUtterancesCount: 18, size: 18, utterances: ["xiaomi mi 11", "xiaomi redmi note", "xiaomi mi 10"], color: "#8E44AD" },
    { topic: "Sony Xperia", userUtterancesCount: 22, size: 22, utterances: ["sony xperia 1", "sony xperia 5", "sony xperia 10"], color: "#2ECC71" },
    { topic: "Nokia", userUtterancesCount: 12, size: 12, utterances: ["nokia 7.2", "nokia 6.2", "nokia 9 pureview"], color: "#1F8EF1" },
    { topic: "Motorola", userUtterancesCount: 25, size: 25, utterances: ["motorola edge", "motorola g9", "motorola razr"], color: "#E74C3C" },
    { topic: "Huawei", userUtterancesCount: 23, size: 23, utterances: ["huawei p40", "huawei mate 40", "huawei nova"], color: "#F39C12" }
  ];
  
  

// Function to handle bubble click and display utterances
const handleBubbleClick = (data) => {
  alert(`Topic: ${data.topic}\nUser Utterances Count: ${data.userUtterancesCount}`);
};

// Custom label component
const CustomLabel = ({ x, y, value, onClick }) => {
    const [topic, count] = value.split(' [');
    return (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        fill="#000000"
        fontSize={14}
        //display="block"
        //cursor="pointer"
        dy={4} // Adjust vertically to center text
        onClick={() => {
          const dataItem = data.find(item => item.topic === topic);
          if (dataItem) handleBubbleClick(dataItem);
        }}
      >
        {topic} [{count.replace(']', '')}]
      </text>
    );
  };

// Function to generate a random color
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
const BubbleView = () => (
  <ScatterChart
    width={1500}
    height={900}
    margin={{ top: 100, right: 20, bottom: 20, left: 20 }}
  >
            {/* Hide both X and Y Axes */}
            <XAxis type="category" dataKey="topic" hide />
        <YAxis type="number" dataKey="userUtterancesCount" hide />
        <ZAxis type="number" dataKey="size" range={[100, 1000]} name="Bubble Size" />
    {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}

    <Scatter
      name="Topics"
      data={data}
      fill="#8884d8"
      onClick={(e) => handleBubbleClick(e)}
      shape={(props) => {
        const { cx, cy, size, color } = props;
        return (
          <circle
            cx={cx}
            cy={cy}
            r={Math.sqrt(size) * 4} // Adjusting size to make the bubbles larger
            fill={color}
            stroke="none"
          />
        );
      }}
    >
      {/* Display topic and user utterance count inside the bubble */}
      <LabelList
          dataKey={({ topic, userUtterancesCount }) => `${topic} [${userUtterancesCount}]`}
          content={<CustomLabel />}
          fill="#000000"  // Set text color to black
          fontSize={14}   // Adjust font size if needed
         
      />
    </Scatter>
  </ScatterChart>
);

export default BubbleView;
