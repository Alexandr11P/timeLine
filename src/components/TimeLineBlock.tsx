import classes from './timeLineBlock.module.scss'
import Circle from './Circle/Circle'
import { $phase, setPhase } from './model/phase'
import { useUnit } from 'effector-react'
import { db } from './model/db'
import { useEffect, useRef, useState } from 'react'
import Slider from './Slider/Slider'
import TimeLineBlockMobile from './TimeLineBlockMobile/TimeLineBlockMobile'


function TimeLineBlock() {

    const [phase, setPh] = useUnit([$phase, setPhase])
    const [startYear, setStartYear] = useState(db[0].startYear)
    const [endYear, setEndYear] = useState(db[0].endYear)
    const [styleSlider, setStyleSlider] = useState(1)
    const [sliderContent, setSliderContent] = useState(0)
    const [width, setWidth] = useState(window.innerWidth)

    const styleTimeout = useRef<NodeJS.Timeout>(null)

    useEffect(() => {
        setStyleSlider(0);
        styleTimeout.current = setTimeout(() => { setStyleSlider(1); setSliderContent(phase) }, 1000)
    }, [phase])

    useEffect(() => { clearTimeout(styleTimeout.current); setStyleSlider(1) }, [])

    const interval = useRef<NodeJS.Timeout>(null)

    useEffect(() => {
        if (interval.current) { clearTimeout(interval.current) }
        interval.current = setTimeout(() => {
            if (db[phase].startYear > startYear) { setStartYear(s => s + 1) }
            if (db[phase].startYear < startYear) { setStartYear(s => s - 1) }
            if (db[phase].endYear > endYear) { setEndYear(s => s + 1) }
            if (db[phase].endYear < endYear) { setEndYear(s => s - 1) }
            if (db[phase].endYear === endYear && db[phase].startYear === startYear) { clearInterval(interval.current) }
        }, 20)
    }, [phase, startYear, endYear])

    const widthTimeout = useRef<NodeJS.Timeout>(null)

    useEffect(() => {
        window.addEventListener('resize', () => {
            clearTimeout(widthTimeout.current)
            widthTimeout.current = setTimeout(() => setWidth(window.innerWidth), 20)
        })
    }, [])

    useEffect(() => { document.querySelector('.' + classes.his_head)?.scrollIntoView() }, [])

    if (width <= 768) {
        return <TimeLineBlockMobile startYear={startYear} endYear={endYear} styleSlider={styleSlider} sliderContent={sliderContent} />
    }

    return (
        <div
            className={classes.main}
            style={{
                transform: `scale(${width / 1920})`, height: 100 / (width / 1920) + 'vh'
            }}
        >
            <div className={classes.gradient}></div>
            <div className={classes.h}></div>
            <div className={classes.v}></div>
            <Circle />
            <div className={classes.his_head}>Исторические даты</div>
            <div className={classes.date}>
                <span>{startYear}</span> <span>{endYear}</span>
            </div>
            <div className={classes.btn_block}>
                {phase + 1}/{db.length}<br />
                <button className={classes.btn_back}
                    disabled={phase === 0}
                    onClick={() => { setPh(phase - 1) }}></button>
                <button className={classes.btn_next}
                    disabled={phase === db.length - 1}
                    onClick={() => { setPh(phase + 1) }}></button>
            </div>
            <div className={classes.slider_box} style={{ opacity: styleSlider }}>
                <Slider events={db[sliderContent].events} />
            </div>
        </div>
    )
}

export default TimeLineBlock
