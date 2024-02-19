import React from 'react';
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts';
import {crypto} from "./data";

const EarningExpensesChart = ({activeChart}) => {

    const topChart = activeChart;
    const bottomChart = activeChart === "Parcel_Delivered" ? "Parcel_Received" : "Parcel_Delivered";
    const lowerbottomChart = activeChart === "Parcel_Delivered" ? "Parcel_Rejected" : "Parcel_Rejected";
    const topChartColor = activeChart === "Parcel_Delivered" ? "#F43B86" : "#2D46B9";
    const bottomChartColor = activeChart === "Parcel_Delivered" ? "#2D46B9" : "#F43B86";
    const lowerbottomChartColor = activeChart === "Parcel_Rejected" ? "#ffa500" : "#ffa500";

//     if (activeChart === "earning") {
        
// const topChartColor = activeChart === "earning" ? "#F43B86" : "#2D46B9";

//     } else {
//          const bottomChartColor = activeChart === "earning" ? "#2D46B9" : "#F43B86";

//     }



    return (
        <ResponsiveContainer height={152}>
            <AreaChart data={crypto.revenueSummary} margin={{top: 0, right: 20, left: 20, bottom: 0}}>
                <Tooltip
                    content={({active, label, payload}) => {
                        return active ? (
                            <div style={{color: "#fff"}}>
                                {payload.map((row, index) => {
                                    return (
                                        <div key={index} className={"mb-1"}>
                                            <div style={{
                                                color: row.color,
                                                fontSize: 8,
                                                letterSpacing: 2,
                                                textTransform: 'uppercase'
                                            }}>
                                                {(row.name)}
                                            </div>
                                            <div style={{
                                                color: row.color
                                            }}
                                            >{row.value} %
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : null;
                    }}
                    wrapperStyle={{
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: 4,
                        padding: '5px 8px',
                        fontWeight: 500,
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }}
                />
                <XAxis tickLine={false} dataKey="month" axisLine={false}/>
                <Area 
                dataKey={bottomChart} 
                stackId="3" 
                stroke={bottomChartColor} 
                fillOpacity={.5} 
                strokeOpacity={.3}
                fill={bottomChartColor}
                />
                <Area 
                dataKey={topChart} 
                stackId="2" 
                stroke={topChartColor} 
                fillOpacity={.8} 
                strokeOpacity={.3}
                fill={topChartColor}
                />
            <Area
                dataKey={lowerbottomChart} 
                stackId="1" 
                stroke={lowerbottomChartColor} 
                fillOpacity={.8} 
                strokeOpacity={.3}
                fill={lowerbottomChartColor}
                />
            </AreaChart>
            
        </ResponsiveContainer>
    );
};

export default EarningExpensesChart;
