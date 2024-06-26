import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [hand, setHand] = useState([]);
    const [sortedHand, setSortedHand] = useState([]);
    const [sorted, setSorted] = useState(false); // État pour gérer si la main est triée ou non

    useEffect(() => {
        fetchHand();
    }, []);

    const fetchHand = () => {
        axios.get('http://localhost:8000/main')
            .then(response => {
                console.log(response);
                setHand(response.data);
            });
    };

    const sortHand = () => {
        axios.post('http://localhost:8000/sorted-hand', hand)
            .then(response => {
                console.log(response);
                setSortedHand(response.data);
                setSorted(true); // Met à jour l'état pour indiquer que la main est triée
            });
    };

    return (
        <div>
            <h1>Main non triée</h1>
            <ul>
                {hand.map((card, index) => (
                    <li key={index}>{card.color} {card.value}</li>
                ))}
            </ul>

            {/* Bouton pour trier la main */}
            <button onClick={sortHand}>Trier</button>

            {/* Affichage de la main triée si elle est triée */}
            {sorted && (
                <>
                    <h1>Main triée</h1>
                    <ul>
                        {sortedHand.map((card, index) => (
                            <li key={index}>{card.color} {card.value}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default App;
