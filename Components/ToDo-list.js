import React, { useEffect, useState } from 'react';
import './Style.css';
import { Link } from 'react-router-dom';

const ToDo = () => {
    const [fruit, setFruit] = useState([]);
    const [newFruit, setNewFruit] = useState("");
    const [editingFruit, setEditingFruit] = useState(null);
    const [editingFruitName, setEditingFruitName] = useState("");

    useEffect(() => {
        getFruit();
    }, []);

    // Api to Get the data from server
    function getFruit() {
        fetch("http://localhost:4000/Fruits")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error();
                }
            })
            .then(data => {
                console.log(data);
                setFruit(data);
            })
            .catch(err => {
                alert("Unable to fetch fruits");
            });
    }

    // Api to Post the data to the server
    function addFruit() {
        let newObj = { fruitName: newFruit };

        fetch("http://localhost:4000/Fruits", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObj)
        })
            .then((res) => {
                console.log("Done");
                getFruit();
                setNewFruit(""); // Clear input after adding fruit
            })
            .catch(err => {
                alert("Unable to add fruit");
            });
    }

    // Api to delete the object from the server based on id
    const deleteFruit = (id) => {
        fetch(`http://localhost:4000/Fruits/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                console.log("deleted");
                getFruit();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Api to update the object on the server based on id
    const editItem = (id, fruitName) => {
        let updatedFruit = { fruitName };

        fetch(`http://localhost:4000/Fruits/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFruit)
        })
            .then((res) => {
                console.log("Fruit Edited");
                setEditingFruit(null);
                getFruit();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <div className="main_div">
                <div className="center_div">
                    <br />
                    <h1>Fruits List</h1>
                    <br />
                    <input
                        type="text"
                        placeholder='Add a Fruit'
                        value={newFruit}
                        onChange={(e) => setNewFruit(e.target.value)}
                    />
                    <button onClick={addFruit}> Add </button>

                    <section>
                        {fruit &&
                            fruit.map((item) => {
                                return (
                                    <ul key={item.id}>
                                        <li>
                                            {editingFruit === item.id ? (
                                                <input
                                                    type='text'
                                                    className='card_name'
                                                    value={editingFruitName}
                                                    onChange={(e) => setEditingFruitName(e.target.value)}
                                                />
                                            ) : (
                                                <span className='card_name'>{item.fruitName}</span>
                                            )}
                                            <span>
                                                {editingFruit === item.id ? (
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => editItem(item.id, editingFruitName)}
                                                        style={{ marginRight: 15 }}
                                                    >
                                                        Save
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => {
                                                            setEditingFruit(item.id);
                                                            setEditingFruitName(item.fruitName);
                                                        }}
                                                        style={{ marginRight: 15 }}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                                <Link to={`/update/${item.id}`} role='button' style={{ marginRight: 20 }}>Update</Link>
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => deleteFruit(item.id)}
                                                    type="button"
                                                >
                                                    Delete
                                                </button>
                                            </span>


                                        </li>
                                    </ul>
                                )
                            })
                        }
                    </section>
                </div>
            </div>
        </>
    );
}

export default ToDo;
