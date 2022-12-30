import React from "react";
import axios from "axios";

import Narbar from "../components/Navbar";
import Unit from "../components/Unit";

export default function Home() {
    const [units, setUnits] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:8000/api/units').then(res => {
            setUnits(res.data);
        })
    }, []);

    return (
        <div>
            <Narbar />
            
            {units.map(unit => (
                <Unit key={unit._id} unit={unit}/>
            ))}

        </div>
    )
}