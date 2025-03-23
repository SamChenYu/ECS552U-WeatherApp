import "./smallwidget.css";

const SmallWidget = ({ title, icon, level, isDarkMode }) => {
  return (
    <div className={`widget ${isDarkMode ? "dark" : "light"}`}>
      <div className="wheader">
        <h2 className="wtitle">{title}</h2>
        <span className="wicon">{icon}</span>
      </div>
      <p className="wlevel">{level}</p>
    </div>
  );
};

export default SmallWidget;
