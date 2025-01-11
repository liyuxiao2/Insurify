import React, { useState, useEffect } from 'react';
import itemsData from '../items.json'; // Import the JSON data
import './itemsExpense.css';

const ItemsExpense = () => {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [foundItems, setFoundItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    // Load items from JSON file when the component mounts
    useEffect(() => {
        setItems(itemsData);
    }, []);

    const searchItem = () => {
        const matchedItem = items.find(
            (item) => item.name.toLowerCase() === itemName.toLowerCase()
        );
        if (matchedItem) {
            setSearchResult(matchedItem);
            setFoundItems((prevItems) => [...prevItems, matchedItem]);
            setTotalCost((prevTotal) => prevTotal + matchedItem.cost);
        } else {
            setSearchResult(null);
        }
        setItemName(''); // Clear input field
    };

    return (
        <div>
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
