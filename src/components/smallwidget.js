import "./smallwidget.css";

const SmallWidget = ({ title, subtitle, icon, level, subtext, isDarkMode }) => {
  return (
    <div className={`widget ${isDarkMode ? "dark" : "light"}`}>
      <div className="wheader">
        <h2 className="wtitle">{title}</h2>
        {icon && <span className="wicon">{icon}</span>}
      </div>
      <div className='wlevel-container'>
        <p className="wlevel">{level}</p>
        {subtitle && <p className='wsubtitle'>{subtitle}</p>}
      </div>
      {subtext && <p className='wsubtext'>{subtext}</p>}
    </div>
  )
}

export default SmallWidget