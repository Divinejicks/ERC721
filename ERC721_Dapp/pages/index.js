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
      description: 'Peace Keepers is an unbiased and decentralized system that promotes fair and appropriate resolutions no matter how complex the dispute is.',
      imageUrl: '/assets/pkLogo.png',
      link: 'https://www.peace-keepers.io/',
    },
    {
      title: 'Enkaare',
      description: 'Enkaare is a talent hiring company that focuses on helping businesses find the best talent wherever they may be located acrose the globe.',
      imageUrl: '/assets/enkLogo.png',
      link: 'https://enkaare.com/',
    },
    {
      title: 'CodeInBlock',
      description: 'CodeInBlock, is a Decentralize Autonomous Organization (DAO) that aims to EQUIP young Africans with the right SKILLS and KNOWLEDGE to be able to contribute to their community by building BLOCKCHAIN based solutions that can solve most AFRICAN problems that blockchain technology can address.',
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
    'Solidity',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'C#',
    'HTML/CSS',
    'SQL',
    'MongoDB',
    'MySQL',
    'Tailwind CSS',
    'Next.js',
    'Viem',
    'Radom',
    'Moralis'
  ];

  return (
    <>
      <Header />
      <StyledContainer style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
        <Head>
          <title>My Dark Portfolio</title>
          <meta name="description" content="Welcome to my portfolio website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Flex style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ color: '#ff0099' }}>If you like what you see, send me an email</h2>
            <p>
              You can send me an email by clicking on the button below or by copying my email address. 
              <strong> mbuhdivinecho@gmail.com </strong>. I will get back to you as soon as possible.
            </p>
            <StyledButton bg='#ff0099' color='#fff' onClick={() => window.location = 'mailto:mbuhdivinecho@gmail.com'}>
              Contact me
            </StyledButton>
          </div>
          <StyledImage src="/assets/profilepic.jpeg" alt="Profile picture" />
        </Flex>

        {/* About Me Section */}
        <section>
          <h3 style={{ color: '#ff0099', marginBottom: '1rem' }}>About Me</h3>
          <p>
            I am the Co-founder and CTO of{' '}
            <a
              href="https://peace-keepers.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ff0099', textDecoration: 'underline' }}
            >
              Peace-Keepers
            </a>, a global organization with team members in the USA and Mexico. We focus on building impactful decentralized applications and fostering international collaboration in the blockchain space.
          </p>
        </section>

        {/* What I Can Do Section */}
        <section style={{ marginTop: '3rem' }}>
          <h3 style={{ color: '#ff0099', marginBottom: '1rem' }}>What I Can Do</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {skills.map((skill, index) => (
              <li key={index} style={{ marginBottom: '0.5rem', color: '#fff' }}>
                - {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Programming Languages Section */}
        <section style={{ marginTop: '3rem' }}>
          <h3 style={{ color: '#ff0099', marginBottom: '1rem' }}>Programming Languages</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {languages.map((language, index) => (
              <li key={index} style={{ marginBottom: '0.5rem', color: '#fff' }}>
                - {language}
              </li>
            ))}
          </ul>
        </section>

        {/* Project Carousel */}
        <h3 style={{ textAlign: 'center', color: '#ff0099', marginTop: '4rem' }}>My Past Projects</h3>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          style={{ marginTop: '2rem' }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div style={{ textAlign: 'center', padding: '1rem', borderRadius: '10px', background: '#1c1c1c' }}>
                <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                <h4 style={{ color: '#fff', marginTop: '1rem' }}>{project.title}</h4>
                <p style={{ color: '#ccc' }}>{project.description}</p>
                <StyledButton
                  bg='#ff0099'
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
