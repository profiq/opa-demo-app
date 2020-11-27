import React from 'react';
import './App.css';
import Layout from './pages/Layout';
import { Container } from '@material-ui/core';

function App() {
    return (
        <Container className="mainContainer" maxWidth="xl">
            <Layout />
        </Container>
    );
}

export default App;
