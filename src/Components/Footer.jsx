import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
                <footer className={"w-full flex items-center bg-black py-6 text-white mt-12 z-50"}>
                    <div className={"flex flex-col md:flex-row flex-wrap md:flex-nowrap md:w-10/12 items-center justify-center md:justify-between w-full mx-auto"}>
                        <div className={"flex items-center"}>
                            <img id={"nav-brand"} src={"/img/journal-1.png"} className={
                                "h-12"
                            } alt={"journal-logo"}/>
                            <span className={"text-sm text-gray-300 font-medium text-ubuntu mx-4"}>Copyright © 2021</span>
                        </div>
                        <div className={"flex hidden md:block items-center mt-4 md:m-0 text-gray-200"}>
                            <a href={"/contact"}>Contact</a>
                        </div>
                    </div>
                </footer>
            </>
        )
    }

}

export default Footer;