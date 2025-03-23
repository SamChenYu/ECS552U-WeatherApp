import "./loadingWidget.css"

const LoadingWidget = ({ isDarkMode }) => {
    return <div className={`widget error_widget ${isDarkMode ? "dark" : "light"}`}>
        <div className="error_widget_container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="loading_widget_spinner"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
            <h1>Loading...</h1>
        </div>
    </div>
}

export default LoadingWidget;