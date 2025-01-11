import React, { useState, useEffect } from 'react';
import itemsData from '../items.json'; // Import the JSON data
import './itemsExpense.css'; // Import the scoped styles

const ItemsExpense = () => {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [foundItems, setFoundItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    // Load items from JSON file and retrieve persisted data
    useEffect(() => {
        setItems(itemsData);

        // Retrieve found items and total cost from localStorage
        const savedFoundItems = localStorage.getItem('foundItems');
        const savedTotalCost = localStorage.getItem('totalCost');

        if (savedFoundItems) {
            setFoundItems(JSON.parse(savedFoundItems));
        }
        if (savedTotalCost) {
            setTotalCost(parseFloat(savedTotalCost));
        }
    }, []);

    const searchItem = () => {
        const matchedItem = items.find(
            (item) => item.name.toLowerCase() === itemName.toLowerCase()
        );
        if (matchedItem) {
            setSearchResult(matchedItem);
            const updatedFoundItems = [...foundItems, matchedItem];
            const updatedTotalCost = totalCost + matchedItem.cost;

            setFoundItems(updatedFoundItems);
            setTotalCost(updatedTotalCost);

            // Persist updated data to localStorage
            localStorage.setItem('foundItems', JSON.stringify(updatedFoundItems));
            localStorage.setItem('totalCost', updatedTotalCost.toString());
        } else {
            setSearchResult(null);
        }
        setItemName(''); // Clear input field
    };

    return (
        <div className="items-expense-container">
            <h2>Household Items Cost Tracker</h2>
            <input
                type="text"
                placeholder="Enter Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
            />
            <button onClick={searchItem}>Search Item</button>
            {searchResult === null && itemName && <p>Item not found</p>}

            <h3>Items Found</h3>
            <ul>
                {foundItems.map((item, index) => (
                    <li key={index}>
                        {item.name}: ${item.cost.toFixed(2)}
                    </li>
                ))}
            </ul>

            <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
        </div>
    );
};

export default ItemsExpense;
