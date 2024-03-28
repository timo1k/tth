import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
//import { motion, useAnimation } from 'framer-motion';
import styles from "../Styles/TopBar.module.css"
import '@fontsource/inter/300.css'; // 300 represents the font weight
import '@fontsource/jua/400.css';
import Image from 'next/image'




const TopBar: React.FC = () =>{
    
    return(
        <div className={styles.topBar}>
            <div className={styles.section}>
            <Image
               src="/Images/r&w_T_SVG.svg"
               alt="Vercel Logo"
               className={styles.vercelLogo}
               width={100}
               height={100}
               priority
            />
                emple Trading Hub
            </div>
            <div className={styles.section2}></div>
            <div className={styles.topButtons}>
                <Stack spacing={2} direction="row">
                    <Button className={styles.buttonstyle} variant="text">Home </Button>
                    {/* fix later
                    <span>|</span> */}
                    <Button className={styles.buttonstyle} variant="text">Trading</Button>
                    <Button className={styles.buttonstyle} variant="text">About Us</Button>
                </Stack>
            </div>
        </div>
    );

}


export default TopBar;