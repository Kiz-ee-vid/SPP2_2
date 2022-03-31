import React from "react";
import {Container} from "react-bootstrap";
import TodosPage from "./pages/TodosPage";

const App: React.FC = () => {
    return (
        <Container className="min-vh-100 shadow p-3 pt-5 bg-light rounded">
            <TodosPage/>
        </Container>
    );
};

export default App;
