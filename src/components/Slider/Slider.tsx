import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation } from 'swiper/modules';
import classes from './slider.module.scss'
import 'swiper/css';



function Slider({ events }: { events: { year: number; text: string; }[] }) {




    return (
        <Swiper
            navigation={true}
            slidesPerView={'auto'}
            keyboard={{
                enabled: true,
            }}
            modules={[Keyboard, Navigation]}
            className={classes.swiper}
        >
            {events.map((e, i) => <SwiperSlide key={i}>
                <div className={classes.span}>{e.year}</div>
                {e.text}
            </SwiperSlide>)}
            <div className={classes.hiden_left}></div>
            <div className={classes.hiden_right}></div>
        </Swiper>
    )
}

export default Slider