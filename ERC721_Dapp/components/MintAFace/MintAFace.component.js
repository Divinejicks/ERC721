import { Flex } from "../common_styles/Flex.styled";
import Image from 'next/image'
import { StyledCard } from "../common_styles/Card.styled";
import { StyledButton, StyledButtonCirlce } from "../common_styles/Button.styled";
import { useEffect, useRef, useState } from 'react';
import Web3Modal from 'web3modal';
import { Contract, providers, utils } from 'ethers';
import { ERC721Contract_ABI, ERC721Contract_Address } from "../../constants";
import { WhiteColorDiv } from "../common_styles/Color.styled";

export default function MintAFace() {
    const [walletConnected, setWalletConnected] = useState(false);
    const [address, setAddress] = useState("");
    const [hyphenatedAddress, setHyphenatedAddress] = useState("");
    const [quantityToMint, setQuantityToMint] = useState(1);
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

    }, [walletConnected]);

    
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

    const getERC721ContractProvider = async () => {
        const provider = await getProviderOrSigner();
        const erc721Contract = new Contract(
            ERC721Contract_Address,
            ERC721Contract_ABI,
            provider
        )

        return erc721Contract;
    }

    const getERC721ContractSigner = async () => {
        const signer = await getProviderOrSigner(true);
        const erc721Contract = new Contract(
            ERC721Contract_Address,
            ERC721Contract_ABI,
            signer
        )

        return erc721Contract;
    }

    const connectWallet = async () => {
        try {
            await getProviderOrSigner();
            setWalletConnected(true);
            getNumberOfJKSMinted();
        }
        catch(error) {
            console.log(error);
        }
    }

    const decrementQuantityToMint = () => {
        if(quantityToMint !== 0) {
            setQuantityToMint(quantityToMint - 1)
        }
    }

    const incrementQuantityToMint = () => {
        if(quantityToMint < 2) {
            setQuantityToMint(quantityToMint + 1)
        }
    }

    const getNumberOfJKSMinted = async () => {
        const erc721Contract = await getERC721ContractProvider();
        const value = await erc721Contract.totalSupply();
        setNumberMinted(value.toNumber());
    }

    const mintJKS = async () => {
        const erc721Contract = await getERC721ContractSigner();
        console.log("erc721Contract", erc721Contract)
        const currentPrice = await erc721Contract.price();
        const price = utils.formatEther(currentPrice);
        const priceToPay = quantityToMint*price;
        await erc721Contract.mint(quantityToMint, {value: utils.parseEther(priceToPay.toString())});
        getNumberOfJKSMinted();
    }

    const addListeners = async (web3ModalProvider) => {
        console.log("tgus")
        web3ModalProvider.on("accountsChanged", (accounts) => {
          window.location.reload()
          //clearCachedProvider()
        });
    
        // Subscribe to chainId change
        web3ModalProvider.on("chainChanged", (chainId) => {
          if(chainId !== "0x13881"){
            alert("Connect to polygon mumbai")
            return
          }
        });
      }

    return(
        <>
            <Flex>
                <WhiteColorDiv>
                    <h3>This is a gif preview of the NFT</h3>
                    <Image src="/assets/preview.gif" alt="Preview of gif" width={300} height={300} />
                </WhiteColorDiv>
                <StyledCard color='#999999'>
                    <h1> {numberMinted} / 100</h1>
                    <p>{hyphenatedAddress}</p>
                    <h2> 1 JKS costs 0.01 matic</h2>
                    
                    {!walletConnected && 
                        <>
                            <h5>Connect to polygon mumbai network</h5>
                            <StyledButton bg='#b3b3ff' color='#fff' onClick={connectWallet}>Connect</StyledButton>
                        </>
                    }

                    {walletConnected && 
                        <>
                            <p>Quantity to mint (max 2)</p>
                            <div>
                                <StyledButtonCirlce onClick={decrementQuantityToMint}>-</StyledButtonCirlce>
                                <label> {quantityToMint} </label>
                                <StyledButtonCirlce onClick={incrementQuantityToMint}>+</StyledButtonCirlce>
                            </div>
                            <StyledButton bg='#b3b3ff' color='#fff' onClick={mintJKS}>Mint</StyledButton>
                        </>
                    }
                </StyledCard>
                <WhiteColorDiv>
                    <h2>All about <i>mint a face</i> project</h2>
                    <p>
                    This is to demonstrate how to mint an ERC721 NFT. In this sample project 
                    a person can mint upto 2 Jicks NFTs at a time. There is a total supply of 100. 
                    In this project i am using the hid and reveal method. At the lunch, NFTs minted 
                    are hidden and only the owner of the contract can reveal the NFTs. <br/>

                    This project uses <strong>Polygon mumbai testnet</strong> for low gas fees. The minting 
                    process can equally be paused and unpaused by the owner.<br/>

                    <strong>NB:</strong> measures are taken to ensure low gas fees. You can as well  
                    <i> Check out my ERC721-A project.</i>
                    </p>
                </WhiteColorDiv>
            </Flex>
        </>
    )
}