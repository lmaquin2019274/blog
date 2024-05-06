/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import { Settings } from "../settings/Settings";

export const Content = ({hotels, getHotels, rooms, getRooms}) => {
    return(
        <div className="content-container">
            <Routes>
                <Route path="settings" element={<Settings/>}/>
            </Routes>
        </div>
    )
}   