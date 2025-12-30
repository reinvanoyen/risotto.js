import ProjectPage from "../../components/routes/ProjectPage";
import React from "react";
import DetailPage from "../../components/routes/DetailPage";
import NotFound from "../../../src/errors/NotFound";
import server from "../../../src/utils/server";

const projects = {
    async index() {

        await server.only(async (req) => {
            if (req.query.title === 'notfound') {
                throw new NotFound();
            }

            return {
                title: req.query.title
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