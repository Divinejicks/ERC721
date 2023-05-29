import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from 'ethers'
import { StyledContainer } from '../../common_styles/Container.styled'
import { Flex } from '../../common_styles/Flex.styled'
import { StyledCardSmall } from '../../common_styles/Card.styled'
import { StyledButton } from '../../common_styles/Button.styled'
import { StyledInputSmall } from '../../common_styles/Fields.styled'


export default function MyNFTs_MarketPlace() {
    const nftPlug = useSelector((state) => state.walletPlug.nft)
    const marketplaceplug = useSelector((state) => state.walletPlug.marketplace)
    const myAddress = useSelector((state) => state.walletPlug.myaddress)

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [price, setPrice] = useState(null);

    useEffect(() => {
        loadItemsOnMarketPlace()
    })

    const loadItemsOnMarketPlace = async () => {
        console.log("1")
        if(marketplaceplug?.address !== undefined) {
            console.log("2")
            const itemCount = await marketplaceplug.itemCount();
            console.log("3")
        let items = []
        for(let i = 1; i <= itemCount; i++){
            const item = await marketplaceplug.items(i);
            console.log("4")
            if(!item.isOnSale && item.seller === myAddress && !item.sold) {
                console.log("5")
                //get uri url from nft contract
                const uri = await nftPlug.tokenURI(item.tokenId);
                console.log("6")
                //the uri is used to fetch nft metadata from ipfs
                const response = await fetch(uri);
                console.log("7")
                const metadata = await response.json();

                items.push({
                    price: item.price,
                    itemId: item.itemId,
                    seller: item.seller,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image
                })
            }
        }

        setItems(items);
        setLoading(false);
        }
    }

    const sellMarketItem = async (item) => {
        if(!price) return

        await (await marketplaceplug.putItemOnSale(item.itemId, utils.parseEther(price.toString()))).wait()
        loadItemsOnMarketPlace();
        setPrice(null)
    }

    if(loading) return (
        <StyledContainer>
            <h3>Loading.......</h3>
        </StyledContainer>
    )

    return(
        <>
            <StyledContainer>
                {items.length > 0 ? 
                    <Flex>
                        {items.map((item, index) => (
                            <StyledCardSmall key={index}>
                                <div>
                                    <img src={item.image} alt="NFT Image" />
                                </div>
                                <div>
                                    <strong>{item.name}</strong>
                                </div>
                                <div>
                                    <label>{item.description}</label>
                                </div>
                                <hr/>
                                <div>
                                    <label>Price in ETH</label>
                                    <StyledInputSmall type="number" placeholder="Price" 
                                        onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div>
                                    <StyledButton bg='#ff0099' color='#fff' 
                                        onClick={() => sellMarketItem(item)}>Sell for {utils.formatEther(item.price)} ETH
                                    </StyledButton>
                                </div>
                            </StyledCardSmall>
                        ))}
                    </Flex>
                : (
                    <Flex>
                        <h3>No assets are listed</h3>
                    </Flex>
                )}
            </StyledContainer>
        </>
    )
}