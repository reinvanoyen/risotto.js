import React, {useState} from "react";

type TLayoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }: TLayoutProps) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <header style={{backgroundColor: 'green', color: 'white', padding: '20px'}}>
                <button onClick={() => setIsOpen(! isOpen)}>{isOpen ? 'close' : 'open'}</button>
                {isOpen && (
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/projects">Projects</a></li>
                        <li><a href="/events">Events</a></li>
                        <li><a href="/locations">Locations</a></li>
                    </ul>
                )}
            </header>
            {children}
            <footer style={{backgroundColor: 'black', color: 'white', padding: '20px'}}>
                Footer
            </footer>
        </div>
    );
};

export default Layout;