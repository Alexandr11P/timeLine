import { createEvent, createStore } from "effector";


const setPhase = createEvent<number>();

const $phase = createStore(0)
    .on(setPhase, (__, payload) => payload)

export { setPhase, $phase }