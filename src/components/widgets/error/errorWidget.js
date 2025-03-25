import "./errorWidget.css"

const ErrorWidget = ({ error, isDarkMode, isMobile }) => {
    return <div className={`widget error_widget${isMobile ? "_mobile" : ""} ${isDarkMode ? "dark" : "light"}`}>
        <div className={`error_widget_container${isMobile ? "_mobile" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
            <h1>{error}</h1>
        </div>
    </div>
}

export default ErrorWidget;