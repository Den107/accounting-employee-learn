import {Component} from "react";
import { v4 as uuidv4 } from 'uuid';


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
                {name: 'John Smith', salary: 1000, increase: false, id: uuidv4()},
                {name: 'Sam Winchester', salary: 800, increase: false, id: uuidv4()},
                {name: 'Den Steal', salary: 1200, increase: false, id: uuidv4()}
            ]
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
            id: uuidv4()
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    render() {
        return (
            <div className='app'>
                <AppInfo/>
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
                <EmployersList data={this.state.data} onDelete={this.deleteItem}/>
                <EmployersAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App