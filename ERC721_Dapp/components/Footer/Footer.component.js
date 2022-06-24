import { StyledContainer } from "../common_styles/Container.styled";
import { Flex } from "../common_styles/Flex.styled";
import { SocialIcons } from "../SocialIcons/SocialIcons";
import { StyledFooter } from "./Footer.styled";

export default function Footer() {
    return(
        <>
            <StyledFooter>
                <StyledContainer>
                    <Flex>
                        <ul>
                            <li>You can contact <strong>Mbuh Divine Cho</strong> on the following social outlets.</li>
                            <SocialIcons />
                        </ul>
                        <ul>
                            <h3>Web3.0</h3>
                            <li>Solidity</li>
                            <li>Openzeppelin</li>
                            <li>Ethers.js</li>
                            <li>Hardhat</li>
                            <li>Testing and Coverage</li>
                            <li>Security with Slither</li>
                            <li>Hashlips</li>
                        </ul>
                        <ul>
                            <h3>Web2</h3>
                            <li>C#</li>
                            <li>Angular</li>
                            <li>React.js</li>
                            <li>Next.js</li>
                            <li>Node Express.js</li>
                        </ul>
                        <ul>
                            <h3>Database</h3>
                            <li>SQL Server</li>
                            <li>PostgreSql</li>
                            <li>MongoDB</li>
                        </ul>
                    </Flex>
                    <p>&copy; 2022 Jicks. All rights reserved</p>
                </StyledContainer>
            </StyledFooter>
        </>
    )
}