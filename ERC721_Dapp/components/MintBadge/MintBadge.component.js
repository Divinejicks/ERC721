import { useEffect, useRef, useState } from "react";
import { StyledButton } from "../common_styles/Button.styled";
import { StyledCard, StyledCardMedium, StyledCardMini } from "../common_styles/Card.styled";
import { StyledContainer } from "../common_styles/Container.styled";
import Web3Modal from 'web3modal';
import { Contract, providers, utils } from 'ethers';
import { ERC721Badge_ABI, ERC721Badge_Address } from "../../constants";
import { Flex } from "../../components/common_styles/Flex.styled";
import Dropdown from "../UserControls/DropdownUserControl/Dropdown.component";
import { StyledInput, StyledInputSemi } from "../common_styles/Fields.styled";
import { WhiteColorDiv } from "../common_styles/Color.styled";

export default function MintBadge() {
    const [walletConnected, setWalletConnected] = useState(false);
    const [address, setAddress] = useState("");
    const [hyphenatedAddress, setHyphenatedAddress] = useState("");
    const [badgeTokenId, setBadgeTokenId] = useState(0);
    const [beneficialAddresses, setBeneficialAddresses] = useState("");
    const [amountToMint, setAmountToMint] = useState(0);
    const [badgeTokenIdToMint, setBadgeTokenIdToMint] = useState(0);
    
    const web3ModalRef = useRef();

    const options = [
        {label: 'Beginner', value: 1},
        {label: 'Intermediate', value: 2},
        {label: 'Expert', value: 3}
    ];

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

    const getERC721BadgeProvider = async () => {
        const provider = await getProviderOrSigner();
        const erc721Badge = new Contract(
            ERC721Badge_Address,
            ERC721Badge_ABI,
            provider
        )

        return erc721Badge;
    }

    const getERC721BadgeSigner = async () => {
        const signer = await getProviderOrSigner(true);
        const erc721Badge = new Contract(
            ERC721Badge_Address,
            ERC721Badge_ABI,
            signer
        )

        return erc721Badge;
    }

    const connectWallet = async () => {
        try {
            await getProviderOrSigner();
            setWalletConnected(true);
        }
        catch(error) {
            console.log(error);
        }
    }

    const mintBadge = async () => {
        const erc721Badge = await getERC721BadgeSigner();
        const currentPrice = await erc721Badge.price();
        const price = utils.formatEther(currentPrice);
        const priceToPay = amountToMint*price;
        await erc721Badge.mintBadge(badgeTokenIdToMint, amountToMint, {value: utils.parseEther(priceToPay.toString())});
        setAmountToMint(0);
        setBadgeTokenIdToMint(0);
    }

    const sendBadge = async () => {
        const erc721Badge = await getERC721BadgeSigner();
        await erc721Badge.sendBadge(beneficialAddresses.split(','), badgeTokenId);
        setBadgeTokenId(0)
        setBeneficialAddresses("")
    }

    return(
        <>
            <StyledContainer>
                <WhiteColorDiv>
                    <p>
                        This is to demonstrate how we can build an ERC721 NFT to send badges to persons who have 
                        gone through your training program or course.
                        <br/>
                        There are 3 badges: <strong>Biginner, Intermediate and Expert</strong> badges. Having 
                        token Ids on IPFS as 1, 2, and 3 respectively.
                    </p>
                </WhiteColorDiv>
                <StyledCard color="#999999">
                    <h4><strong>Only admins can send a badge but anyone can mint a badge.
                     If you want to test this out send your mumbai address to me through email and i will make you an admin 
                     or just mint a badge</strong>
                    </h4>
                    
                        {!walletConnected && 
                            <StyledCardMini color="#fff">
                                <>
                                    <h5>Connect to polygon mumbai network</h5>
                                    <StyledButton bg='#cce6ff' onClick={connectWallet}>Connect</StyledButton>
                                </>
                            </StyledCardMini>
                        }
                    
                    <Flex>
                            {walletConnected && 
                                <>
                                    <StyledCardMedium color="#fff">
                                        <>
                                            <div>
                                                <h3>Mint a badge (1 badge cost 0.01 matic)</h3>
                                                <p>{hyphenatedAddress}</p>
                                                <Dropdown 
                                                    label="Enter the tokenId"
                                                    value={badgeTokenIdToMint}
                                                    options={options}
                                                    onChange={event => setBadgeTokenIdToMint(event.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <p>Number of badges to mint</p>
                                                <StyledInputSemi value={amountToMint} type="number" 
                                                onChange={event => setAmountToMint(event.target.value)}/>
                                            </div>
                                            
                                            <StyledButton bg="#cce6ff" onClick={mintBadge}>Mint Badge</StyledButton>
                                        </>
                                    </StyledCardMedium>

                                    <StyledCardMedium color="#fff">
                                        <>
                                            <div>
                                                <h3>Send a badge</h3>
                                                <p>{hyphenatedAddress}</p>
                                                <p>Enter the addresses as comma separated values</p>
                                                <StyledInput value={beneficialAddresses} type="text" placeholder="e,g ab45,but67e,45thh" 
                                                    onChange={event => setBeneficialAddresses(event.target.value)} />
                                            </div>
                                            <div>
                                                <Dropdown 
                                                    label="Enter the tokenId"
                                                    value={badgeTokenId}
                                                    options={options}
                                                    onChange={event => setBadgeTokenId(event.target.value)}
                                                />
                                            </div>
                                            
                                            <StyledButton bg="#cce6ff" onClick={sendBadge}>Send Badge</StyledButton>
                                        </>
                                    </StyledCardMedium>
                                </>
                            }
                        
                    </Flex>
                </StyledCard>
            </StyledContainer>
        </>
    )
}