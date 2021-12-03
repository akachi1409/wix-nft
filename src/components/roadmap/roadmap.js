import React from "react";

import "./roadmap.css";
class Roadmap extends React.Component{
    render(){
        return(
            <div className="roadmap_layout">
                <div className="roadmap_section">
                    <div className="roadmap_left_bar" >
                        <p className="roadmap_left_title">ADD ROADMAP HERE</p>
                    </div>
                    <div className="roadmap_right_bar">
                        <p className="roadmap_right_text">
                            I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.
                        </p>
                        <p className="roadmap_right_text">
                        This is a great space to write a long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide. Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are.
                        </p>
                        <div className="roadmap_mint_container">
                            <button className="roadmap_mint">
                                Learn More
                            </button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Roadmap