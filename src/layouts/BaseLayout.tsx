import { ReactNode, useState } from "react";
import Header from "./header/Header";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";

interface Props {
    children: ReactNode;
}

const BaseLayout = ({ children }: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Header onNavOpen={() => setOpen(true)} />
            <Navbar isNavOpen={open} onNavClose={() => setOpen(false)} />
            {children}
            <Footer />
        </>
    );
};

export default BaseLayout;
