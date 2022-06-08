import {Component} from "react";
import {v4 as uuidv4} from 'uuid';


import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";

import './app.css'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {name: 'John Smith', salary: 1000, increase: false, rise: false, id: uuidv4()},
                {name: 'Sam Winchester', salary: 800, increase: false, rise: false, id: uuidv4()},
                {name: 'Den Steal', salary: 1200, increase: false, rise: false, id: uuidv4()}
            ],
            term: '',
            filter: 'all'
        }
    }


    deleteItem = (id) => {
        this.setState(({data}) => ({
            data: data.filter(i => i.id !== id)
        }))
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: uuidv4()
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = term => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(i => i.rise)
            case 'moreThen1000':
                return items.filter(i => i.salary > 1000)
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state
        const increased = data.filter(i => i.increase).length
        const visibleData = this.filterPost(this.searchEmp(data, term), filter)

        return (
            <div className='app'>
                <AppInfo allItems={data.length} allItemsWithCookie={increased}/>
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployersList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployersAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App