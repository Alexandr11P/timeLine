import classes from './timeLineBlockMobile.module.scss'
import { $phase, setPhase } from '../model/phase'
import { useUnit } from 'effector-react'
import { db } from '../model/db'
import Slider from '../Slider/Slider'


function TimeLineBlockMobile({ startYear, endYear, styleSlider, sliderContent }: { startYear: number, endYear: number, styleSlider: number, sliderContent: number }) {

    const [phase, setPh] = useUnit([$phase, setPhase])



    return (
        <div className={classes.main}>
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
                <div className={classes.name}>{db[sliderContent].name}</div>
                <div className={classes.h}></div>
                <Slider events={db[sliderContent].events} />
            </div>
            <ul className={classes.line}>{db.map((__, i) =>
                <li key={i}
                    className={phase === i ? classes.active : ''}
                    onClick={() => { setPh(i) }}
                ></li>)}</ul>
        </div>
    )
}

export default TimeLineBlockMobile