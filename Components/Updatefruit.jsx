import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Updatefruit() {
    const { id } = useParams();
    const [fruit, setFruit] = useState({});

    useEffect(() => {
        getFruit();
    }, [id]);

    function getFruit() {
        fetch(`http://localhost:4000/Fruits/${id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch fruit');
                }
            })
            .then(data => {
                setFruit(data.fruitName);
            })
            .catch(err => {
                alert("Unable to fetch fruit");
            });
    }

    const updateFruit = () => {
        let newObj = { fruitName: fruit };
        fetch(`http://localhost:4000/Fruits/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newObj)
        })
            .then(data => {
                console.log(data)
                console.log("Fruit updated");
                getFruit();
            })
            .catch(err => {
                console.log(err);
              
            });
    }

  

    return (
        <div className="main_div">
            <div className="center_div">
                <br />
                <h1>Update Fruit</h1>
                <br />
                <input
                    type="text"
                    placeholder='Add a Fruit'
                    value={fruit}
                    onChange={(e) => setFruit(e.target.value)}
                />
                <Link to={"/todo"} role='button' onClick={updateFruit}>Update</Link>
            </div>
        </div>
    );
}

export default Updatefruit;
