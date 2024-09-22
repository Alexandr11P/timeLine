
import { useEffect, useState } from 'react';
import { db } from '../model/db';
import { $phase, setPhase } from '../model/phase';
import classes from './circle.module.scss'
import { useUnit } from 'effector-react'





function Circle() {

    const [phaseSet, phase] = useUnit([setPhase, $phase]);
    const [name, setName] = useState(0);
    useEffect(() => { setTimeout(() => setName(phase), 1000) }, [phase])

    const shift = db.length > 2 ? 1 : 0.5

    return (
        <ul className={classes.circle}>
            {db.map((__, i) =>
                <li className={phase === i ? classes.active : ''}
                    onClick={() => phaseSet(i)}
                    key={i}
                    style={{ transform: `rotate(${360 / db.length * (i + db.length - phase - shift)}deg)` }}>
                    <div className={classes.border}></div>
                    <div className={classes.number}
                        style={{ transform: `rotate(${-360 / db.length * (i + db.length - phase - shift)}deg)` }}>
                        <span>{i + 1}</span>
                        <div className={classes.name} style={name === i && phase === i ? { opacity: 1 } : {}}>
                            {db[i].name}
                        </div>
                    </div>
                </li>)}
        </ul>
    )
}

export default Circle


