import Head from 'next/head';
import { StyledContainerLarge } from '../../components/common_styles/Container.styled';
import Header from '../../components/Header/header.component';
import MintAFace from '../../components/MintAFace/MintAFace.component';
import NFTHeader from '../../components/NFTHeader/NFTHeader.component';

export default function Home() {
  return (
    <>
      <Header />
      <StyledContainerLarge bg="#333333" size="10px">
        <NFTHeader />
        <MintAFace />

      </StyledContainerLarge>
    </>
  )
}
