import {FaTwitter, FaLinkedin, FaDiscord} from 'react-icons/fa';
import { StyledSocialIcons } from './SocialIcons.styled';

export function SocialIcons() {
    return(
        <>
            <StyledSocialIcons>
                <li>
                    <a href="https://twitter.com/Talkweb03">
                        <FaTwitter />
                    </a>
                    <a href="https://www.linkedin.com/in/divine-cho-257858131/">
                        <FaLinkedin />
                    </a>
                    <a href="/">
                        <FaDiscord />
                    </a>
                </li>
            </StyledSocialIcons>
        </>
    )
}