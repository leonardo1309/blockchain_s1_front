import { createContext, useEffect, useState } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [isValid, setIsValid] = useState([]);
    const getChain = async () => {
        try{
            const response = await fetch('http://localhost:3000/chain');
            const result = await response.json();
            setData(result);
        }catch(error){
            console.error("Error fetching chain data", error);
        }
    };

    const addBlock = async (newBlockData) => {
        try{
            const response = await fetch('http://localhost:3000/addBlock', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newBlockData)
            });
            const result = await response.json();
            setData((prevData) => [...prevData, result])
        } catch(error){
            console.log("Error adding block: ", error);
        }
    }

    const validateChain = async() => {
        try{
            const response  = await fetch('http://localhost:3000/isChainValid');
            const result = await response.json();
            setIsValid(result.isValid)
            console.log(result)
        }catch (error){
            console.log("Error validating chain", error);
        }
    };

    useEffect(() => {
        getChain();
    }, []);

    return (
        <ApiContext.Provider value = {{data, getChain, addBlock, validateChain, isValid}}>
            {children   }
        </ApiContext.Provider>
    );
}