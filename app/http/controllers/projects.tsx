import ProjectPage from "../../components/routes/ProjectPage";
import React from "react";
import DetailPage from "../../components/routes/DetailPage";
import Server from "../../../src/Server";

const projects = {
    async index() {

        await Server.set(async () => {
            return {
                'title': 'Nice'
            };
        });

        return <ProjectPage />;
    },
    view() {
        //const { id } = req.params;
        return <DetailPage id={"ok"} />;
    }
};

export default projects;