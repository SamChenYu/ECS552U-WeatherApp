import "./smallwidget.css";

const SmallWidget = ({ title, subtitle, icon, level, image, subtext, isDarkMode, isMobile }) => {
  return (
    <div className={`widget ${isDarkMode ? "dark" : "light"}`}>
      <div className="wheader">
        <h2 className={`wtitle${isMobile ? "_mobile" : ""}`}>{title}</h2>
        {icon && <span className="wicon">{icon}</span>}
      </div>
      <div className={`wlevel-container${image ? "_image" : ""}`}>
        {image ? image : ""}
        {!image && <>
          <p className="wlevel">{level}</p>
          {subtitle && <p className='wsubtitle'>{subtitle}</p>}
        </>}

      </div>
      {subtext && <p className='wsubtext'>{subtext}</p>}
    </div>
  )
}

export default SmallWidget