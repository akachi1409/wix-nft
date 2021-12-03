import React, { useEffect, useState }  from "react"

import "./utility.css"
import Card from "../card/card";
import logo_image from "../../assets/header/logo.webp"
import { BsFileMinusFill, BsFilePlusFill } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
function Utility(){
    const [card1, setCard1] = useState({
                title:"Cloud Analytics Modernization",
                svg:1
            })
    const [card2, setCard2] = useState({
        title:"Versatility in Application",
        svg:2
    })
    const [card3, setCard3] = useState({
        title:"Data Science Acceleration",
        svg:3
    })
    const [card4, setCard4] = useState({
        title:"Data Science Acceleration",
        svg:4
    })
    const [card5, setCard5] = useState({
        title:"Full Customer Experience Service",
            svg:5
    })
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [feedback, setFeedback] = useState("");
    const [claimingNft, setClaimingNft] = useState(false);
    const [mintNum, setMintNum] = useState(0)
    const claimNFTs = (_amount) => {
        _amount = document.getElementById("inputBox").textContent;
        if (_amount <= 0) {
            return;
        }
        setFeedback("Minting your Official BooCrew NFT...");
        setClaimingNft(true);
        blockchain.smartContract.methods
            .mint(blockchain.account, _amount)
            // ********
            // You can change the line above to
            // .whiteListMint(blockchain.account, _amount) if you want only whitelisted
            // users to be able to mint through your website!
            // And after you're done with whitelisted users buying from your website,
            // You can switch it back to .mint(blockchain.account, _amount).
            // ********
            .send({
                gasLimit: 285000 * _amount,
                to: "0x8815e06FC5b57Bd4d5590977a697582f19d2330e", // the address of your contract
                from: blockchain.account,
                value: blockchain.web3.utils.toWei((0.035 * _amount).toString(), "ether"),
            })
            .once("error", (err) => {
                console.log(err);
                setFeedback("Sorry, something went wrong. Check your transaction on Etherscan to find out what happened!");
                setClaimingNft(false);
            })
            .then((receipt) => {
                setFeedback(
                    "Your BooCrew NFT has been successfully minted!"
                );
                setClaimingNft(false);
                dispatch(fetchData(blockchain.account));
            });
    };

    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
        }
    };

    useEffect(() => {
        getData();
    }, [blockchain.account]);

    const plus_num = () =>{
        // const {mintNum} = this.state;
        setMintNum(mintNum +1);
    }
    const minus_num = () =>{
        // const {mintNum} = this.state;
        if ( mintNum ==0)return;
        setMintNum(mintNum -1)
    }
    
    return(
        <div className="utility_container">
            <div className="utility_section">
                <div className="utility_left_bar" >
                    <p className="utility_left_title">ADD UTILITIES HERE</p>
                    <p className="utility_left_text">I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.</p>
                </div>
                <div className="utility_right_bar">
                    <div className="cards_layout2">
                        <Card title={card1.title} svg={card1.svg}/>
                        <Card title={card2.title} svg={card2.svg}/>
                    </div>
                    <div className="cards_layout1">
                        <Card title={card3.title} svg={card3.svg}/>
                        <Card title={card4.title} svg={card4.svg}/>
                        <Card title={card5.title} svg={card5.svg}/>
                    </div>
                </div>
            </div>
            <div className="mint_button_container">
                <img className="logo_img_mint" src={logo_image} alt=""/>
                <div className="mint_button_layout">
                    <header><span>MINT</span> YOUR <br /> SPOOKY BOYS.</header>
                    <div className='number_control'>
                            <BsFileMinusFill color='white' size={40} onClick = {()=> minus_num()}/>
                            <span id = "inputBox">{mintNum}</span>
                            <BsFilePlusFill color='white' size={40} onClick = {() => plus_num()}/>
                    </div>
                    {
                        blockchain.account === "" || blockchain.smartContract === null ? 
                        <div className="flex-column">
                            <div 
                            className="mint_button_utility"
                            onClick={(e) => {
                                console.log("--------")
                                e.preventDefault();
                                dispatch(connect());
                                getData();
                            }}>
                                Connect
                            </div>
                            {blockchain.errorMsg !== "" ? (
                                <div style={{ textAlign: "center", fontSize: 20, color: "white"}}>
                                        {blockchain.errorMsg}
                                    </div>
                                
                            ) : null}
                        </div>
                        :
                        <div className="mint_button_utility"
                        onClick={(e) => {
                            e.preventDefault();
                            claimNFTs(1);
                            getData();
                        }}>
                                {claimingNft ? "BUSY" : "MINT"}
                            </div>
                            }
                </div>
            </div>
        </div>
    )
}

export default Utility;