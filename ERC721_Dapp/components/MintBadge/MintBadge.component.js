import { useEffect, useRef, useState } from "react";
import { StyledButton } from "../common_styles/Button.styled";
import { StyledCard } from "../common_styles/Card.styled";
import { StyledContainer } from "../common_styles/Container.styled";
import Web3Modal from 'web3modal';
import { Contract, providers, utils } from 'ethers';
import { ERC721Badge_ABI, ERC721Badge_Address } from "../../constants";

export default function MintBadge() {
    const [walletConnected, setWalletConnected] = useState(false);
    const [address, setAddress] = useState("");
    const [hyphenatedAddress, setHyphenatedAddress] = useState("");
    const [badgeTokenId, setBadgeTokenId] = useState(1);
    const [beneficialAddresses, setBeneficialAddresses] = useState("");
    
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
        await erc721Badge.mint(beneficialAddresses.split(','), badgeTokenId);
    }

    return(
        <>
            <StyledContainer>
                <StyledCard color="#ff9999">
                    <h1>Still in progress.</h1>
                    <h4><strong>Only admins can send a badge. If you want to test this out 
                        send your mumbai address to me through email and i will make you an admin</strong>
                    </h4>
                    <p>{hyphenatedAddress}</p>

                    {!walletConnected && 
                        <>
                            <h5>Connect to polygon mumbai network</h5>
                            <StyledButton bg='#cce6ff' onClick={connectWallet}>Connect</StyledButton>
                        </>
                    }

                    {walletConnected && 
                        <>
                            <div>
                                <p>Enter the addresses as comma separated string</p>
                                <input type="text" placeholder="Enter address" onChange={event => setBeneficialAddresses(event.target.value)} />
                            </div>
                            <div>
                                <p>Enter the tokenId</p>
                                <input type="number" onChange={event => setBadgeTokenId(event.target.value)}/>
                            </div>
                            <StyledButton bg="#cce6ff" onClick={mintBadge}>Mint Badge</StyledButton>
                        </>
                    }
                </StyledCard>
            </StyledContainer>
        </>
    )
}