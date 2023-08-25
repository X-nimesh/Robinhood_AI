import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const About = () => {
    return (
        <Flex marginTop={'100px'} direction={'column'} gap='20px' >
            <Text fontSize={"4xl"}>About</Text>
            <Text>Welcome to Robinhood AI – your innovative stock market analysis partner.
                Developed as a cutting-edge college project, Robinhood AI merges finance and technology,
                ffering a sophisticated platform for investors.
                Powered by advanced technologies like React.js and Nest.js, and supported by a robust risk analysis algorithm, o
                ur platform empowers investors with data-driven decision-making tools.
                With a vision to reshape stock market analysis, we bring real-time data processing and user-friendly interfaces together.
                ur platform's prowess lies in the synergy of technology and finance, applying sophisticated algorithms to real-world financial contexts. Join us in this visionary journey, equipping future finance professionals with AI-driven tools to navigate the complexities of stock markets.</Text>
            <Image src="/coverPhoto.svg" alt="COver" w="90vw" h='100%' marginTop={"200px"} margin='0 auto' />

        </Flex>
    )
}

export default About
