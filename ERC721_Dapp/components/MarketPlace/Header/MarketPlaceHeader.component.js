import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from "react";
import Web3Modal from 'web3modal';
import { BigNumber, Contract, providers, utils } from 'ethers';
import { StyledButton } from '../../common_styles/Button.styled';
import { StyledLink, StyledLinkDiv, StyledNav } from '../../NFTHeader/NFTHeader.styled';
import { MarketPlace_ABI, MarketPlace_Address, NFT_ABI, NFT_Address } from '../../../constants';

export default function MarketPlaceHeader(){
    const [walletConnected, setWalletConnected] = useState(false);
    const [address, setAddress] = useState("");
    const [hyphenatedAddress, setHyphenatedAddress] = useState("");
    const [nft, setNft] = useState({});
    const [marketplace, setMarketplace] = useState({});

    const web3ModalRef = useRef();

    const router = useRouter();
    const [pathName, setPathName] = useState(router.pathname);

    const newPathName = () => {
        setPathName(router.pathname)
    }

    // useEffect(() => {
    //     newPathName();
    // }, [pathName])

    useEffect(() => {
        if(!walletConnected){
            web3ModalRef.current = new Web3Modal({
                network: "mumbai",
                providerOptions: {},
                disableInjectedProvider: false,
            });

            connectWallet();
        }

    }, [walletConnected]); 

    const ProviderOrSigner = async ()  => {
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);

        const { chainId } = await web3Provider.getNetwork();
        if(chainId !== 80001){
            window.alert("Change the network to polygon mumbai");
        }

        const addr = await web3Provider.getSigner().getAddress()
        setAddress(addr);
        const _addressSub1 = addr.substring(0, 5);
        const _addressSub2 = addr.substring(38);
        setHyphenatedAddress(_addressSub1 + "...." +_addressSub2);
        
        const signer = web3Provider.getSigner();

        LoadContracts(signer);
    }

    const LoadContracts = async (signer) => {
        const marketplace = new Contract(
            MarketPlace_Address,
            MarketPlace_ABI,
            signer
        )

        setMarketplace(marketplace)

        const nft = new Contract(
            NFT_Address,
            NFT_ABI,
            signer
        )

        setNft(nft);
    }

    const connectWallet = async () => {
        try {
            await ProviderOrSigner();
            setWalletConnected(true);
        }
        catch(error) {
            console.log(error);
        }
    }

    const data = {
        nft,
        marketplace
    }

    return(
        <>
            <StyledNav bg="#ffb84d">
                <StyledLinkDiv>
                    <Link href="/market_place" passHref>
                        <StyledLink onClick={newPathName} pathname={pathName}> Market Place </StyledLink> 
                    </Link>
                    <Link href="/market_place/create_nfts" passHref> 
                        <StyledLink  onClick={newPathName} pathname={pathName}> Create NFTs </StyledLink>
                    </Link>
                    <Link href="/market_place/my_nfts" passHref> 
                        <StyledLink  onClick={newPathName} pathname={pathName}> My NFTs </StyledLink>
                    </Link>
                    <Link href="/market_place/purchased_nfts" passHref> 
                        <StyledLink  onClick={newPathName} pathname={pathName}> Purchased NFTs </StyledLink>
                    </Link>
                    <Link href="/market_place/sold_nfts" passHref> 
                        <StyledLink  onClick={newPathName} pathname={pathName}> Sold NFTs </StyledLink>
                    </Link>
                </StyledLinkDiv>
                {!walletConnected &&
                    <>
                        <StyledButton onClick={connectWallet}>
                            Connect
                        </StyledButton>
                    </>
                }
                {walletConnected &&
                    <StyledButton>
                        {hyphenatedAddress}
                    </StyledButton>
                }
            </StyledNav>
        </>
    )
}