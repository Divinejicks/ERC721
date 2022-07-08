import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from 'ethers'
import { StyledContainer } from '../../common_styles/Container.styled'
import { Flex } from '../../common_styles/Flex.styled'
import { StyledCardSmall } from '../../common_styles/Card.styled'


export default function MarketPlaceHome() {
    const nftPlug = useSelector((state) => state.walletPlug.nft)
    const marketplaceplug = useSelector((state) => state.walletPlug.marketplace)

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadItemsOnMarketPlace()
    }, [])

    const loadItemsOnMarketPlace = async () => {
        if(marketplaceplug?.address !== undefined) {
            const itemCount = await marketplaceplug.itemCount();
        let items = []
        for(let i = 1; i <= itemCount; i++){
            const item = await marketplaceplug.items(i);
            if(item.isOnSale) {
                //get uri url from nft contract
                const uri = await nftPlug.tokenURI(item.tokenId);
                //the uri is used to fetch nft metadata from ipfs
                const response = await fetch(uri);
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

    const buyMarketItem = async (item) => {
        console.log("Price", item.price);
        await (await marketplaceplug.purchaseItem(item.itemId, {value: item.price})).wait()
        loadItemsOnMarketPlace();
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
                    <div>
                        {items.map((item, index) => (
                            <Flex key={index}>
                                <StyledCardSmall>
                                    <img src={item.image} />
                                    <label>{item.name}</label>
                                    <label>{item.description}</label>
                                    <button onClick={() => buyMarketItem(item)}>Buy for {utils.formatEther(item.price)} ETH</button>
                                </StyledCardSmall>
                            </Flex>
                        ))}
                    </div>
                : (
                    <Flex>
                        <h3>No assets are listed</h3>
                    </Flex>
                )}
            </StyledContainer>
        </>
    )
}