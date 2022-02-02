import React from "react";
import "./Search.css";
import PostCard from "../PostCard/PostCard";
import {search} from "../../api/ArticlesAPI";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            loading: false,
            query: "",
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({query: e.target.value})
    }

    handleSearch(e) {
        e.preventDefault();
        this.setState({loading: true});
        search(this.state.query).then(res => {
            this.setState({content: res, loading: false})
        })
    }

    render() {
        return (
            <>
                <div className={"search-popover"} >
                    <i className="fas fa-close close-button" onClick={this.props.toggleWindow}/>
                    <div className={"content-wrapper"}>
                        <form onSubmit={this.handleSearch}>
                            <input
                                name={"search"}
                                id={"search-field"}
                                type={"text"}
                                className={"search-input"}
                                placeholder={"Looking for something?"}
                                autoComplete={"off"}
                                onKeyDown={(e) => {
                                    if(e.key === "Escape") {
                                        this.props.toggleWindow();
                                    }
                                }}
                                onChange={this.handleChange}
                            />
                        </form>
                        <div className={"search-result"}>
                            {
                                !this.state.loading ? <>
                                    {
                                        this.state.content.map((post) => {
                                            return <PostCard key={post.id} post={post} />
                                        } )
                                    }
                                </> :
                                    <>
                                        <p className={"load-status"} >Searching...</p>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Search;