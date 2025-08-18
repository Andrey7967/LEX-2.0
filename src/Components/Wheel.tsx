import wheelImg from '../img/Frame 2.svg'


export default function Wheel({ title, change, position, Swipe }) {



    return (

        <div>
            <div className="hole">
                <div className="wheel" onWheel={(e) => {
                    change(e);

                }}
                    onTouchStart={(e) => Swipe.start(e)} onTouchMove={(e) => Swipe.move(e)} onTouchEnd={Swipe.end}>
                    <img className="svgAccurate " style={{ transform: "translateY(" + position + "%)" }} src={wheelImg}></img>
                    <img className="svgAccurate" style={{ transform: "translateY(" + position + "%)" }} src={wheelImg}></img>

                </div>
            </div>
            <div className="p10 TextCenter">{title}</div>
        </div>
    )
}