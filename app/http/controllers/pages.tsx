import Homepage from "../../components/routes/Homepage";
import React from "react";
import AboutPage from "../../components/routes/AboutPage";

export default {
    home() {
        return <Homepage />;
    },
    about() {
        return <AboutPage />;
    }
};