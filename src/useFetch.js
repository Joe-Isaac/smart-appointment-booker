import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);

    useEffect(()=>{setTimeout(() => {
        fetch(url)
        .then(res => {
          if(!res.ok){
            throw Error("We could not fetch that resource. Try checking the resource address?")
          }
          return res.json();
        })
        .then((data)=> {
          console.log(data);
          setData(data);
          setIsPending(false);
        })
        .catch(err => {
          console.log(err.message);
          setIsPending(false);
        })
      
      }, 500);
    }, [url]);

    return { setData, data, isPending};
}

export default useFetch; 