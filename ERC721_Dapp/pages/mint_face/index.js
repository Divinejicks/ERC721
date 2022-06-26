import Head from 'next/head';
import { StyledContainerLarge } from '../../components/common_styles/Container.styled';
import Header from '../../components/Header/Header.component';
import MintAFace from '../../components/MintAFace/MintAFace.component';

export default function Home() {
  return (
    <>
      <Header />
      <StyledContainerLarge bg="#333333" size="150px">

        <MintAFace />

      </StyledContainerLarge>
    </>
  )
}
