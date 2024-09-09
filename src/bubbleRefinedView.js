import React, { useState } from 'react';
import {
  ScatterChart, XAxis, YAxis, ZAxis, Scatter, LabelList, Tooltip
} from 'recharts';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Button, Grid, Typography, Paper, Avatar } from '@material-ui/core';
const data = [
  { topic: "Apple Devices", userUtterancesCount: 30, size: 30, utterances: ["new iphone", "new apple iphone", "apple watch"], color: "#FF6B6B" },
  { topic: "Google Pixel", userUtterancesCount: 20, size: 20, utterances: ["pixel 7", "google pixel", "pixel 6 pro"], color: "#FFD93D" },
  { topic: "New Apple iphone related query", userUtterancesCount: 25, size: 25, utterances: ["galaxy s21", "samsung galaxy", "galaxy s20"], color: "#6BCB77" },
  { topic: "OnePlus", userUtterancesCount: 15, size: 15, utterances: ["oneplus 9", "oneplus nord", "oneplus 8"], color: "#4D96FF" },
  { topic: "Other Phones", userUtterancesCount: 10, size: 10, utterances: ["xiaomi", "oppo", "vivo"], color: "#FF924C" },
  { topic: "Xiaomi", userUtterancesCount: 18, size: 18, utterances: ["xiaomi mi 11", "xiaomi redmi note", "xiaomi mi 10"], color: "#8E44AD" },
  { topic: "Sony Xperia", userUtterancesCount: 22, size: 22, utterances: ["sony xperia 1", "sony xperia 5", "sony xperia 10"], color: "#2ECC71" },
  { topic: "Nokia", userUtterancesCount: 12, size: 12, utterances: ["nokia 7.2", "nokia 6.2", "nokia 9 pureview"], color: "#1F8EF1" },
  { topic: "Motorola", userUtterancesCount: 25, size: 25, utterances: ["motorola edge", "motorola g9", "motorola razr"], color: "#E74C3C" },
  { topic: "Huawei", userUtterancesCount: 23, size: 23, utterances: ["huawei p40", "huawei mate 40", "huawei nova"], color: "#F39C12" }
];

const BubbleRefinedView = () => {
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const handleBubbleClick = (data) => {
    setCurrentData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentData(null);
  };

  const CustomLabel = ({ x, y, value, onClick }) => {
    const [topic, count] = value.split(' [');
    return (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        fill="#000000"
        fontSize={14}
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

  return (
    <div>
      <ScatterChart
        width={1500}
        height={900}
        margin={{ top: 100, right: 20, bottom: 20, left: 20 }}
      >
        <XAxis type="category" dataKey="topic" hide />
        <YAxis type="number" dataKey="userUtterancesCount" hide />
        <ZAxis type="number" dataKey="size" range={[100, 1000]} name="Bubble Size" />

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
          <LabelList
            dataKey={({ topic, userUtterancesCount }) => `${topic} [${userUtterancesCount}]`}
            content={<CustomLabel />}
            fill="#000000"  // Set text color to black
            fontSize={14}   // Adjust font size if needed
          />
        </Scatter>
      </ScatterChart>

      {/* Dialog for showing utterances */}
      {currentData && (
      <Dialog open={open} onClose={handleClose}>
        
        <DialogTitle>{currentData.topic}</DialogTitle>
        <DialogContent>
          
            <>
              <p>User Utterances Count: {currentData.userUtterancesCount}</p>
              <ul>
                {currentData.utterances.map((utterance, index) => (
                  <li key={index}>{utterance}</li>
                ))}
              </ul>
            </>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog> )}
    </div>
  );
};

export default BubbleRefinedView;
