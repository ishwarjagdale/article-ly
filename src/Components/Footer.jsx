import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
                <footer className={"w-full flex items-center bg-black py-6 text-white mt-12 z-50"}>
                    <div className={"flex flex-wrap md:flex-nowrap md:w-10/12 items-center justify-center md:justify-start w-full mx-auto"}>
                        <img id={"nav-brand"} src={"/img/journal-1.png"} className={
                            "h-12"
                        } alt={"journal-logo"}/>
                        <span className={"text-sm text-gray-300 font-medium text-ubuntu mx-4"}>Copyright © 2021</span>
                    </div>
                </footer>
            </>
        )
    }

}

export default Footer;