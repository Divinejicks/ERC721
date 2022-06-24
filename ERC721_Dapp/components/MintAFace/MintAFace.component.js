import { StyledContainer } from "../common_styles/Container.styled";
import { Flex } from "../common_styles/Flex.styled";
import Image from 'next/image'
import { StyledCard } from "../common_styles/Card.styled";
import { StyledButton } from "../common_styles/Button.styled";

export default function MintAFace() {
    return(
        <>
            <Flex>
                <div>
                    <h3>This is a gif preview of the NFT</h3>
                    <Image src="/assets/preview.gif" alt="Preview of gif" width={300} height={300} />
                </div>
                <StyledCard color='#ffc'>
                    <h4>Mint Jicks NFT</h4>
                    <strong>3/100</strong>
                    <p>Quantity to mint (max 2)</p>
                    <div>
                        <StyledButton>-</StyledButton>
                        <input type="text" />
                        <StyledButton>+</StyledButton>
                    </div>
                    <StyledButton bg='#b3b3ff' color='#fff'>Mint</StyledButton>
                </StyledCard>
            </Flex>
        </>
    )
}