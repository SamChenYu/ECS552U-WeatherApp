import './smallwidget.css'

const SmallWidget = ({ title, icon, level }) => {
    return (
        <div className="widget">
            <div className="wheader">
                <h2 className="wtitle">{title}</h2>
                <span className="wicon">{icon}</span>
            </div>
            <p className="wlevel">{level}</p>
        </div>
    )
}
export default SmallWidget