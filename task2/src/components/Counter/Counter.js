import React, { useState } from "react";
import styles from "./Counter.module.css";
import "./counter.css";

const Counter = ({index,updateData,removeHandler,data}) => {
    const [counterValue, setCounterValue] = useState(data.count || 0);
    const [startValue, setStartValue] = useState(data.count || 0);
    const [counterName, setCounterName] = useState("Counter");
    const [counterName1, setCounterName1] = useState("");
    const [show, setShow] = useState({
        startShow: false,
        counterNameShow: false,
    });
    const { startShow, counterNameShow } = show;

    const handleIncrement = (i) => {
        setCounterValue(counterValue + 1);
        updateData(i,startValue+1,counterName1);
    };

    const handleDecrement = (i) => {
        setCounterValue(counterValue - 1);
        updateData(i,startValue-1,counterName1);
    };

    const handleReset = (i) => {
        setCounterValue(0);
        updateData(i,0,counterName1);
    };

    const handleStartValue = (i) => {
        setCounterValue(startValue);
        updateData(i,startValue,counterName1);
        setShow({ ...show, startShow: false });
    };

    const handleChangeCounterName = (i) => {
        // const newName = prompt('Enter new counter name:');
        setShow({ ...show, counterNameShow: false });
        updateData(i,startValue,counterName1);
        setCounterName1(counterName);
    };

    return (
        <div className="calbody">
            <span onClick={()=>removeHandler(data.id)} className="close-icon">*</span>
            <h2>{counterName1 || data.title || "Tally Counter"}</h2>
            <input
                type="text"
                className={styles.inputbox}
                value={counterValue || data.count}
                readOnly
            />
            <div className={styles.btn}>
                <button onClick={()=>handleIncrement(index)}>+</button>
                <button onClick={()=>handleDecrement(index)}>-</button>
            </div>
            <button onClick={()=>handleReset(index)}>RESET COUNTER</button>
            <div className="btn-wrapper">
                {startShow && (
                    <input
                        type="number"
                        name="startValue"
                        className="input-number"
                        onChange={(e) => setStartValue(e.target.value)}
                        value={startValue}
                        id=""
                    />
                )}
                <button
                    onClick={
                        !startShow
                            ? () => setShow({ ...show, startShow: true })
                            : ()=>handleStartValue(index)
                    }
                    className={startShow ? "w-30" : "start-value-btn"}
                >
                    START VALUE
                </button>
            </div>
            <div className="btn-wrapper">
                {counterNameShow && (
                    <input
                        type="text"
                        name="startValue"
                        className="input-number"
                        onChange={(e) => setCounterName(e.target.value)}
                        value={counterName}
                        id=""
                    />
                )}
                <button
                    onClick={
                        !counterNameShow
                            ? () => setShow({ ...show, counterNameShow: true })
                            : ()=>handleChangeCounterName(index)
                    }
                    className={counterNameShow ? "w-30" : "start-value-btn"}
                >
                    COUNTER NAME
                </button>
            </div>
        </div>
    );
};

export default Counter;
