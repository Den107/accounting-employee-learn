import './app-info.css'

const AppInfo = ({allItems, allItemsWithCookie}) => ((
    <div className="app-info">
        <h1>Учет сотрудников в компании TopCompany</h1>
        <h2>Общее число сотрудников: {allItems}</h2>
        <h2>Премию получат: {allItemsWithCookie}</h2>
    </div>
))

export default AppInfo