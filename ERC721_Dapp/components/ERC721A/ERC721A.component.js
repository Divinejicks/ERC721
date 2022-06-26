import { StyledCard, StyledCardMedium, StyledCardMini } from "../common_styles/Card.styled";
import { WhiteColorDiv } from "../common_styles/Color.styled";
import { StyledContainer } from "../common_styles/Container.styled";
import Web3Modal from 'web3modal';
import { useEffect, useRef, useState } from "react";
import { Contract, providers, utils } from 'ethers';
import { Flex } from "../../components/common_styles/Flex.styled";
import { StyledInputSemi } from "../common_styles/Fields.styled";
import { StyledButton } from "../common_styles/Button.styled";
import { ERC721ANFT_ABI, ERC721ANFT_Address } from "../../constants";

export default function ERC721ANFT() {
    const [walletConnected, setWalletConnected] = useState(false);
    const [address, setAddress] = useState("");
    const [hyphenatedAddress, setHyphenatedAddress] = useState("");
    const [amountToMint, setAmountToMint] = useState(0);
    const [numberMinted, setNumberMinted] = useState(0);
    
    const web3ModalRef = useRef();

    useEffect(() => {
        if(!walletConnected){
            web3ModalRef.current = new Web3Modal({
                network: "mumbai",
                providerOptions: {},
                disableInjectedProvider: false,
            });
        }

    }, [walletConnected])

    const getProviderOrSigner = async (needSigner = false)  => {
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);
        //addListeners(web3Provider);

        const { chainId } = await web3Provider.getNetwork();
        if(chainId !== 80001){
            window.alert("Change the network to polygon mumbai");
            //throw new Error("Change network to polygon mumbai");
        }

        const addr = await web3Provider.getSigner().getAddress()
        setAddress(addr);
        const _addressSub1 = addr.substring(0, 5);
        const _addressSub2 = addr.substring(38);
        setHyphenatedAddress(_addressSub1 + "...." +_addressSub2);

        if(needSigner) {
            const signer = web3Provider.getSigner();
            return signer;
        }

        return web3Provider;
    }

    const getERC721ANFTProvider = async () => {
        const provider = await getProviderOrSigner();
        const erc721ANFT = new Contract(
            ERC721ANFT_Address,
            ERC721ANFT_ABI,
            provider
        )

        return erc721ANFT;
    }

    const getERC721ANFTSigner = async () => {
        const signer = await getProviderOrSigner(true);
        const erc721ANFT = new Contract(
            ERC721ANFT_Address,
            ERC721ANFT_ABI,
            signer
        )

        return erc721ANFT;
    }

    const connectWallet = async () => {
        try {
            await getProviderOrSigner();
            setWalletConnected(true);
            getNumberOfNFTMinted();
        }
        catch(error) {
            console.log(error);
        }
    }

    const getNumberOfNFTMinted = async () => {
        const erc721ANFT = await getERC721ANFTProvider();
        const value = await erc721ANFT.totalSupply();
        setNumberMinted(value.toNumber());
    }

    const mint = async () => {
        const erc721ANFT = await getERC721ANFTSigner();
        const currentPrice = await erc721ANFT.mintRate();
        const price = utils.formatEther(currentPrice);
        const priceToPay = amountToMint*price;
        await erc721ANFT.mint(amountToMint, {value: utils.parseEther(priceToPay.toString())});
        setAmountToMint(0);
        getNumberOfNFTMinted();
    }


    return(
        <>
            <StyledContainer>
                <WhiteColorDiv>
                    <p>
                        Minting more than 1 NFT using <strong>ERC721A smart contract </strong>
                        cost far less than the normal ERC721. <br />
                        <strong>NB: </strong> Transfering an ERC721A is gas costly.
                    </p>
                </WhiteColorDiv>
                <StyledCard color="#999999">
                        {!walletConnected && 
                            <StyledCardMini color="#fff">
                                <>
                                    <h5>Connect to polygon mumbai network</h5>
                                    <StyledButton bg='#cce6ff' onClick={connectWallet}>Connect</StyledButton>
                                </>
                            </StyledCardMini>
                        }
                        {walletConnected && 
                            <>
                                <StyledCardMini color="#fff">
                                    <>
                                        <div>
                                            <h1> {numberMinted} / 500</h1>
                                            <h3>1 JKSV cost 0.01 matic</h3>
                                            <p>{hyphenatedAddress}</p>
                                        </div>
                                        <div>
                                            <p>Number of JSKV to mint(max = 20)</p>
                                            <StyledInputSemi value={amountToMint} type="number" 
                                            onChange={event => setAmountToMint(event.target.value)}/>
                                        </div>
                                        
                                        <StyledButton bg="#cce6ff" onClick={mint}>Mint</StyledButton>
                                    </>
                                </StyledCardMini>
                                
                            </>
                        }
                </StyledCard>
            </StyledContainer>
        </>
    )
}