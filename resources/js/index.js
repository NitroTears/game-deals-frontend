import React from "react";
import ReactDOM from "react-dom";
import DealsHome from "./components/dealshome";
import { ChakraProvider } from "@chakra-ui/react";

function Index() {
    return (
        <ChakraProvider>
            <DealsHome />
        </ChakraProvider>
    );
}

export default Index;

if (document.getElementById("app")) {
    ReactDOM.render(<Index />, document.getElementById("app"));
}
