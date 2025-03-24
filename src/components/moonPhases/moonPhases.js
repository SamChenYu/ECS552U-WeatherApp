import NewMoonSVG from "./new_moon.svg";
import WaxingCrescent from "./waxing_crescent.svg"
import FirstQuarterSVG from "./first_quarter.svg"
import WaxingGibbousSVG from "./waxing_gibbous.svg"
import FullMoonSVG from "./full_moon.svg"
import WaningGibbousSVG from "./waning_gibbous.svg"
import LastQuarter from "./last_quarter.svg"
import WaningCrescentSVG from "./waning_crescent.svg"

import "./moonPhases.css"


export default function getMoonPhaseIcon(moonPhase) {
    console.log("getMoonPhaseIcon", moonPhase)
    switch (moonPhase) {
        case "New Moon":
            return <img src={NewMoonSVG} className="moon-phase-icon" alt={moonPhase} />
        case "Waxing Crescent":
            return <img src={WaxingCrescent} className="moon-phase-icon" alt={moonPhase} />
        case "First Quarter":
            return <img src={FirstQuarterSVG} className="moon-phase-icon" alt={moonPhase} />
        case "Waxing Gibbous":
            return <img src={WaxingGibbousSVG} className="moon-phase-icon" alt={moonPhase} />
        case "Full Moon":
            return <img src={FullMoonSVG} className="moon-phase-icon" alt={moonPhase} />
        case "Waning Gibbous":
            return <img src={WaningGibbousSVG} className="moon-phase-icon" alt={moonPhase} />
        case "Last Quarter":
            return <img src={LastQuarter} className="moon-phase-icon" alt={moonPhase} />
        case "Waning Crescent":
            return <img src={WaningCrescentSVG} className="moon-phase-icon" alt={moonPhase} />
        default:
            return ""
    }
}