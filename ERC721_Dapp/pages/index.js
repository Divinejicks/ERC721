import Head from 'next/head';
import { StyledButton } from '../components/common_styles/Button.styled';
import { StyledContainer } from '../components/common_styles/Container.styled';
import { Flex } from '../components/common_styles/Flex.styled';
import Footer from '../components/Footer/Footer.component';
import Header from '../components/Header/header.component';
import { StyledImage } from '../components/Header/Header.styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const projects = [
    {
      title: 'Peace Keepers',
      description: 'An unbiased and decentralized system promoting fair resolutions for complex disputes.',
      imageUrl: '/assets/pkLogo.png',
      link: 'https://www.peace-keepers.io/',
    },
    {
      title: 'Enkaare',
      description: 'A global talent hiring company connecting businesses with top talent across the globe.',
      imageUrl: '/assets/enkLogo.png',
      link: 'https://enkaare.com/',
    },
    {
      title: 'CodeInBlock',
      description: 'A DAO equipping young Africans with skills to build blockchain-based solutions for local challenges.',
      imageUrl: '/assets/cibLogo.png',
      link: 'https://codeinblock.com/',
    },
  ];

  const skills = [
    'Blockchain Development (Solidity, Ethers.js, viem)',
    'Full-Stack Web Development (React, Node.js, Next.js, C# (ASP.Net), Angular)',
    'Smart Contract Development',
    'Telegram mini-game developer',
    'Decentralized Applications (dApps)',
    'Mentoring and Training Developers',
    'Version Control (Git)',
    'Remote Team Collaboration',
    'Leadership and Project Management',
  ];

  const languages = [
    'Solidity', 'JavaScript', 'TypeScript', 'Node.js', 'C#', 'HTML/CSS', 'SQL', 'MongoDB', 'MySQL', 
    'Tailwind CSS', 'Next.js', 'Viem', 'Radom', 'Moralis'
  ];

  return (
    <>
      <Header />
      <StyledContainer style={{ backgroundColor: '#f5f5f5', color: '#333', minHeight: '100vh', padding: '2rem' }}>
        <Head>
          <title>My Portfolio</title>
          <meta name="description" content="Welcome to my portfolio website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Hero Section */}
        <Flex style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ color: '#ff5722', fontSize: '2rem', marginBottom: '1rem' }}>Get In Touch</h2>
            <p style={{ lineHeight: '1.6', color: '#555' }}>
              You can send me an email by clicking on the button below or by copying my email address. 
              <strong> mbuhdivinecho@gmail.com </strong>. I will get back to you as soon as possible.
            </p>
            <StyledButton bg='#ff5722' color='#fff' onClick={() => window.location = 'mailto:mbuhdivinecho@gmail.com'}>
              Contact me
            </StyledButton>
          </div>
          <StyledImage src="/assets/profilepic.jpeg" alt="Profile picture" style={{ borderRadius: '50%', maxWidth: '200px' }} />
        </Flex>

        {/* About Me Section */}
        <section>
          <h3 style={{ color: '#ff5722', marginBottom: '1rem', fontSize: '1.8rem' }}>About Me</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            I am the Co-founder and CTO of{' '}
            <a
              href="https://www.peace-keepers.io/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ff5722', textDecoration: 'underline' }}
            >
              Peace-Keepers
            </a>, a global organization with team members in the USA and Mexico. We focus on building impactful decentralized applications and fostering international collaboration in the blockchain space.
          </p>
        </section>

        {/* Skills Section */}
        <section style={{ marginTop: '3rem' }}>
          <h3 style={{ color: '#ff5722', marginBottom: '1rem', fontSize: '1.8rem' }}>Skills & Expertise</h3>
          <ul style={{ listStyleType: 'none', padding: 0, columns: 2, columnGap: '2rem', color: '#555' }}>
            {skills.map((skill, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                - {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Programming Languages Section */}
        <section style={{ marginTop: '3rem' }}>
          <h3 style={{ color: '#ff5722', marginBottom: '1rem', fontSize: '1.8rem' }}>Programming Languages</h3>
          <ul style={{ listStyleType: 'none', padding: 0, columns: 2, columnGap: '2rem', color: '#555' }}>
            {languages.map((language, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                - {language}
              </li>
            ))}
          </ul>
        </section>

        {/* Project Carousel */}
        <h3 style={{ textAlign: 'center', color: '#ff5722', marginTop: '4rem', fontSize: '2rem' }}>My Past Projects</h3>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          style={{ marginTop: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div style={{ textAlign: 'center', padding: '1rem', borderRadius: '10px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                <h4 style={{ color: '#333', marginTop: '1rem' }}>{project.title}</h4>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>{project.description}</p>
                <StyledButton
                  bg='#ff5722'
                  color='#fff'
                  onClick={() => window.open(project.link, '_blank')}
                  style={{ marginTop: '1rem' }}
                >
                  See Project
                </StyledButton>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </StyledContainer>
      <Footer />
    </>
  );
}
