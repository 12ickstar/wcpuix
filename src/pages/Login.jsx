import { useState , useContext } from "react";
import { HomeContext } from "../MainContext";
import ReactTooltip from "react-tooltip";
import {onlychars} from "../data/imp";
import * as CryptoJS from "crypto-js";
import AES from "crypto-js/aes";
import {ethers} from "ethers";

export default function Login(){
    const {Value , setValue} = useContext(HomeContext);
    const [data, setData] = useState({address:Value.Myaddrs,password: "",secretPhrase: "",pk:""});

    const submitHandler = (e) => {
        e.preventDefault();

        var scph = (data.secretPhrase).replace(/\s/g,'');
        try {var rndmc = (AES.decrypt(localStorage.getItem('RANDOMCHARS'),(data.password)+scph)).toString(CryptoJS.enc.Utf8);
        }catch(err){console.log(err.message);alert("Invalid Credentials")};
        var entypedata = localStorage.getItem('DATA');
        try {var datax = AES.decrypt(entypedata,data.password+scph+rndmc).toString(CryptoJS.enc.Utf8);}catch(err){alert("Invalid Private Key")};
        try {var verifykey = ((new ethers.Wallet(data.pk)).address).toString()} catch(err){alert("Invalid Private Key")};

        try {
            if ((data.password).length < 8 || (data.password).length > 101 || ([...(data.password)]).every(val => onlychars.includes(val)) === false){
                alert("Invalid Passowrd");
            } else if (((data.secretPhrase).split(" ")).length < 5 || ((data.secretPhrase).split(" ")).length > 15){
                alert("Invalid Secret Phrase");
            } else if (verifykey !== data.address) {
                alert("Invalid Private Key");
            } else if (datax.slice(0,12) !== "xHAHAITWORKS" || rndmc.slice(0,12) !== "xHAHAITWORKS") {
                alert("Credentials are Invalid");
            } else {
                setValue({...Value,passx:((data.password)+scph),ChatState:true,pk:data.pk});
            }
        } catch(err){alert("Invalid Credentials")}
    };

    return (
        <div className="bg-[#00000080] min-h-screen py-16">
        <ReactTooltip effect="solid" place="right" />
        <div className="bg-white rounded-[30px] md:w-[650px] lg:w-[850px] mx-auto py-8 px-12">
        <h1 className="text-[60px] leading-[75px] font-light text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-pink-500">
        Login.
        </h1>
        <form onSubmit={submitHandler}>
        <h1 className="md:text-[20px] lg:text-[25px] font-light mb-2">Address</h1>
        <input type="text" value={Value.Myaddrs}
        className="border-2 border-[#000000] rounded-[5px] w-[100%] h-[40px] bg-blue-100 address-color text-xl text-center font-black"
        onChange={(e) => setData({ ...data, address: e.target.value })}/>
        <h1 className="md:text-[20px] lg:text-[25px] font-light mb-2 mt-5">Password</h1>
        <input type="password" required className="border-2 border-[#000000] rounded-[5px] w-[100%] h-[40px] text-2xl px-2 focus:outline-none"
        onChange={(e) => setData({ ...data, password: e.target.value })}/>
        <h1 className="md:text-[20px] lg:text-[25px] font-light mb-2 mt-5 text-2xl">Secret Phrase</h1>
        <input type="text" required className="border-2 border-[#000000] rounded-[5px] w-[100%] h-[40px] text-2xl px-2 focus:outline-none"
        onChange={(e) => setData({ ...data, secretPhrase: e.target.value })}/>
        <h1 className="md:text-[20px] lg:text-[25px] font-light mb-2 mt-5 text-2xl">Private Key</h1>
        <input type="password" required className="border-2 border-[#000000] rounded-[5px] w-[100%] h-[40px] text-2xl px-2 focus:outline-none"
        onChange={(e) => setData({ ...data, pk: e.target.value })}/>
        <div className="text-center mt-16">
        <button type="submit" className="text-white font-light text-[36px] bg-lbBg rounded-[10px] w-[200px] h-[70px]">Login</button>
        </div>
        </form>
        </div>
        </div>
    );
};
