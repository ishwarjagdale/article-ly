import React from "react";

<div className={"flex flex-col items-center relative w-full"}>
    <div className={"xl:absolute xl:pt-6 top-0 container md:my-8 py-8 px-2 md:p-4 md:p-0 w-full max-w-[1440px]"} id={"side-profile"}>
        <div className={"w-full justify-center xl:w-60 flex flex-wrap xl:flex-col xl:ml-6 2xl:ml-8"}>
            <img className={"w-44"} src={this.state.userProfile.image_url} alt={"author"}/>
            <div className={"flex-col"}>
                <span className={"font-bold py-2 block text-lg font-ssp"}>{this.state.userProfile.name}</span>
                <p className={"text-sm text-gray-600 w-44 md:w-60"}>
                    {this.state.userProfile.bio}
                </p>
                <FollowButton appState={this.props.appState} registerPop={this.props.registerPop} profile={this.state.userProfile}/>
            </div>
        </div>
    </div>
    <div id={"content"} className={"container md:my-8 p-4 md:p-0 w-full max-w-[1440px] mx-auto flex justify-center flex-col items-center"}>
        {
            this.state.userProfile.posts.map((post) => <StorySnip postID={post}/>)
        }
    </div>
</div>


<div className={"xl:flex-1 p-4 h-full w-full"}>
    <div id={"side-profile"} className={"w-full hidden xl:block justify-center xl:w-60 flex flex-wrap xl:flex-col xl:ml-auto xl:m-4"}>
        <img className={"w-full rounded-2xl object-cover"} src={this.state.userProfile.image_url + "?today=" + (new Date()).toDateString()} alt={"author"}/>
        <div className={"flex-col"}>
            <span className={"font-bold py-2 block text-lg font-ssp"}>{this.state.userProfile.name}</span>
            <p className={"text-sm text-gray-600 w-44 md:w-60"}>
                {this.state.userProfile.bio}
            </p>
            <FollowButton appState={this.props.appState} registerPop={this.props.registerPop} profile={this.state.userProfile}/>
        </div>
    </div>
</div>
<div className={"xl:flex-[2] p-4 h-full flex flex-col items-center w-fit border-x"}>
    {
        this.state.userProfile.posts.map((post) => <StorySnip postID={post}/>)
    }
</div>
<div className={"xl:flex-1 p-4 w-full h-full"}/>