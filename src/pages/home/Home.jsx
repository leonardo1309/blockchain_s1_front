import React, { useContext, useEffect, useState } from "react";
import './Home.css'
import { ApiContext } from "../../context/ApiContext";
import { Button, Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import AddBlock from "../../components/AddBlock";

const Home = () => {
    const {data, getChain, addBlock, validateChain} = useContext(ApiContext);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if(getChain){
            getChain();
        }
    },[getChain]);


    const handleShowModal = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    /*const handleAddBlock = () => {
        console.log("AddBlock")
        const newBlockData = {
            data: {
                amount: 60,
                descripcion: "Se agregó un nuevo bloque"
            }
        };
        if(addBlock) {
            addBlock(newBlockData);
        }
    }*/

    const handleValidateChain = () => {
        if (validateChain) {
            validateChain();
        }
    }

    return (
        <Container>
        <div className='container'>
        <span className='title'>Bienvenido Blockchain</span>
        </div>
        <Button onClick={handleShowModal}>
            Add Block
        </Button>
        <Button onClick={handleValidateChain}>
            Validate
        </Button>
        <Table>
            <thread>
                <tr>
                    <th>index</th>
                    <th>Timestamp</th>
                    <th>Data</th>
                    <th>PreviousHash</th>
                    <th>Hash</th>
                </tr>
            </thread>
            <tbody>
                {data.map((block, index) =>{
                    <tr key={index}>
                        <td>{block.index}</td>
                        <td>{block.timestamp}</td>
                        <td>{block.data}</td>
                        <td>{block.prevhash}</td>
                        <td>{block.hash}</td>
                    </tr>
                })}
            </tbody>
        </Table>
        <AddBlock show={showModal} handleClose={handleClose}/>
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
        
        </Container>
    )
}

export default Home