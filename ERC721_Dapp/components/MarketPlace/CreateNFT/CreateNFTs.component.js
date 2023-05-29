import { ethers } from "ethers";
import { useSelector } from 'react-redux'

import { create as ipfsHttpClient } from "ipfs-http-client";
import { useState } from "react";
import { StyledContainer } from "../../common_styles/Container.styled";
import { StyledInput, StyledTextArea } from "../../common_styles/Fields.styled";
import { StyledButton } from "../../common_styles/Button.styled";

const projectId = "2QT8sTOtKxppuIZempBPl1DuyjP";
const projectSecret = "43b7c1553060a3545d728d44a670a8f2";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;

const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

export default function CreateNFTs_MarketPlace() {
    const nftPlug = useSelector((state) => state.walletPlug.nft)
    const marketplaceplug = useSelector((state) => state.walletPlug.marketplace)

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const uploadToIPFS = async (event) => {
        event.preventDefault();
        const file = event.target.files[0]
        if(typeof file !== undefined) {
            try {
                const result = await client.add(file)
                console.log("result", result)
                setImage(`https://divinejicks.infura-ipfs.io/ipfs/${result.path}`)  
            } catch (error) {
                console.log("failed to upload image to ipfs", error);
            }
        }
    }

    const createNFT = async () => {
        
        if(!image || !name || !description) return
        try {
            const result = await client.add(JSON.stringify({image, name, description}))
            mintNFTAndList(result);
        } catch (error) {
            console.log("failed to upload ipfs uri", error)
        }
    }

    const mintNFTAndList = async (result) => {
        const uri = `https://divinejicks.infura-ipfs.io/ipfs/${result.path}`;
        //mint nft
        await (await nftPlug.mint(uri)).wait();
        const tokenId = await nftPlug.tokenIdCount();
        //approving the market place contract to spend the nft
        await (await nftPlug.setApprovalForAll(marketplaceplug.address, true)).wait()
        //add nft to market place
        await (await marketplaceplug.createItem(nftPlug.address, tokenId)).wait();
        setImage('')
        setName('')
        setDescription('')
    }

    return(
        <>
            <StyledContainer>
                <p><strong>NOTE: </strong> After clicking on <strong>Create NFT </strong>, you have to confirm <strong>3 transactions</strong>.
                    <br/>
                    1. Minting the NFT. <br/>
                    2. Approving the market place to use your NFT. <br/>
                    3. Transfer the NFT to <strong>My NFTs </strong> menu.
                </p>
                <StyledInput type="file" name="file" onChange={uploadToIPFS} />
                <StyledInput type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
                <StyledTextArea placeholder="description" onChange={(e) => setDescription(e.target.value)} />
                <div>
                    <StyledButton bg='#b3b3ff' color='#fff' onClick={createNFT}>Create NFT </StyledButton>
                </div>
            </StyledContainer>
        </>
    )
}