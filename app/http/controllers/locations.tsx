import React from "react";
import Server from "../../../src/Server";
import LocationPage from "../../components/routes/LocationPage";
import Location from "../../models/Location";
import LocationDetailPage from "../../components/routes/LocationDetailPage";

const locations = {
    async index() {

        await Server.set(async () => ({
            locations: (await Location.query().all()).serialize()
        }));

        return <LocationPage locations={Server.get('locations')} />;
    },
    async view() {

        await Server.set(async (req) => ({
            location: (await Location.query().find(req.params.id)).serialize()
        }));

        return <LocationDetailPage />;
    }
};

export default locations;