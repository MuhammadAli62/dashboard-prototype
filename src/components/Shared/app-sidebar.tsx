
import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar"

import logo from "../../assets/FTSLOGO.png"
import Sidebarmenu from "./Sidebarnav"
const AppSidebar = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <img src={logo} alt="logo" />
            </SidebarHeader>
            <SidebarContent>
                <Sidebarmenu />
            </SidebarContent>
        </Sidebar>
    )
}
export default AppSidebar