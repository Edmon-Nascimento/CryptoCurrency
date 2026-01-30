import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Detail } from "./pages/details/details";
import { NotFound } from "./pages/notfound/notfound";

export const router = createBrowserRouter([
    {
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/detail/:cripto",
                element:<Detail/>
            },
            {
                path:"*",
                element:<NotFound/>
            }
        ]
    }
])