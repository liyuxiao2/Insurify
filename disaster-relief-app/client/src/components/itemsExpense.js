
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import itemsData from '../items.json'; // Import the JSON data
import './itemsExpense.css'; // Import the scoped styles

const ItemsExpense = () => {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [foundItems, setFoundItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState([]); // State for suggestions
    const [showForm, setShowForm] = useState(false); // State to show/hide form with animation
    const [formVisible, setFormVisible] = useState(false); // State for animation delay
    const [quantity, setQuantity] = useState(1);
    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");

    // Load items from JSON file and retrieve persisted data
    useEffect(() => {
        setItems(itemsData);

        const savedFoundItems = localStorage.getItem("foundItems");
        const savedTotalCost = localStorage.getItem("totalCost");

        if (savedFoundItems) {
            setFoundItems(JSON.parse(savedFoundItems));
        }
        if (savedTotalCost) {
            setTotalCost(parseFloat(savedTotalCost));
        }
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setItemName(value);

        if (value) {
            // Filter suggestions based on the input
            const filteredSuggestions = items.filter((item) =>
                item.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setItemName(suggestion.name); // Set the clicked suggestion as the input value
        setSuggestions([]); // Clear suggestions after selecting one
    };

    const searchItem = () => {
        const matchedItem = items.find(
            (item) => item.name && item.name.toLowerCase().includes(itemName.toLowerCase())
        );
        if (matchedItem) {
            setSearchResult(matchedItem);
            setShowForm(true); // Trigger form visibility
            setTimeout(() => setFormVisible(true), 10); // Slight delay for CSS animation
        } else {
            setSearchResult(null);
        }
        setItemName("");
        setSuggestions([]); // Clear suggestions
    };

    const addItem = () => {
        if (!searchResult) return;

        const updatedFoundItems = [
            ...foundItems,
            { ...searchResult, quantity, age, description }
        ];
        const updatedTotalCost = totalCost + searchResult.cost * quantity;

        setFoundItems(updatedFoundItems);
        setTotalCost(updatedTotalCost);

        localStorage.setItem("foundItems", JSON.stringify(updatedFoundItems));
        localStorage.setItem("totalCost", updatedTotalCost.toString());

        setSearchResult(null);
        closeModal();
    };

    const closeModal = () => {
        setFormVisible(false); // Start fade-out animation
        setTimeout(() => setShowForm(false), 300); // Delay removal of form
        setQuantity(1);
        setAge("");
        setDescription("");
    };

    return (
        <div className="items-expense-container">
            <h2>Household Items Cost Tracker</h2>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter Item Name"
                    value={itemName}
                    onChange={handleInputChange}
                />
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button onClick={searchItem}>Search Item</button>

            {searchResult && showForm && (
                <>
                    <div className={`modal-backdrop ${formVisible ? "show" : ""}`}></div>
                    <dialog open className={`modal ${formVisible ? "fade-in" : "fade-out"}`}>
                        <h3>Search Result</h3>
                        <p style={{ color: "red", fontWeight: "bold" }}>
                            {searchResult.name}: ${searchResult.cost.toFixed(2)}
                        </p>
                        <div className="form-container">
                            <label>
                                Quantity:
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    min="1"
                                />
                            </label>
                            <label>
                                Age (years):
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </label>
                            <label>
                                Description:
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>
                            <button onClick={addItem}>Add Item</button>
                            <button id="closeBtn" onClick={closeModal}>Close</button>
                        </div>
                    </dialog>
                </>
            )}

            <h3>Items Found</h3>
            <div className="items-grid">
                {foundItems.map((item, index) => (
                    <div className="item-card" key={index}>
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p>Age: {item.age}</p>
                        <p>Description: {item.description}</p>
                        <p>${item.cost.toFixed(2)}</p>
                    </div>
                ))}
            </div>

            <div className="total-cost">Total Cost: ${totalCost.toFixed(2)}</div>
        </div>
    );
};

export default ItemsExpense;
