import {FaTwitter, FaLinkedin, FaDiscord} from 'react-icons/fa';
import { StyledSocialIcons } from './SocialIcons.styled';
import Link from 'next/link';

export function SocialIcons() {
    return(
        <>
            <StyledSocialIcons>
                <li>
                    <Link href="https://twitter.com/Talkweb03">
                        <a target="_blank"><FaTwitter /></a>
                    </Link>
                    <Link href="https://www.linkedin.com/in/divine-cho-257858131/">
                        <a target="_blank"><FaLinkedin /></a>
                    </Link>
                    <Link href="/">
                        <a target="_blank"><FaDiscord /></a>
                    </Link>
                </li>
            </StyledSocialIcons>
        </>
    )
}