import "./trending.css"
import { useEffect, useState, useRef } from "react"
import Thumbnail from "./thumbnail"

export default function Latest({mode, urls, more}) {

    const [popular, setPopular] = useState([]);
    const [second, setSecond] = useState([])

    const componentWillUnmount = useRef(false)

    const url = urls
    useEffect(() => {
        fetchPopular()
        testapi()
        return () => {
            componentWillUnmount.current = true
        }
      },[popular]);

    const testapi = async() => {
        const response = await fetch(more, { headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }});
        const data = await response.json();
        setSecond(data.results.slice(0, 4));

    }

    const fetchPopular = async () => {
        const data = await fetch(url, { headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }})
        const movies = await data.json() 
        setPopular([...second, ...movies.results])
        
    }

    const movie = popular.map(item => {
      return (
      <Thumbnail key={item.id} item={item} />
      )
    })


    return(
        <div>
            <div className='trending'>
                <div>
                    <h1 className="section-title">{mode}</h1>
                </div>
            </div>
            <div className="thumbs">
                {movie} 
            </div>
        </div>
    )
}