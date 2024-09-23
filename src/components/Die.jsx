
export default function Die(props) {
    return (
        <div onClick={props.hold} className={props.die.isHeld ? "die held" : "die"}>
            {/* <p className="die-num" >{props.die.value}</p> */}
            <img className="die-face" src={props.face} alt={"dice"+props.die.value} />
        </div>
    )
}