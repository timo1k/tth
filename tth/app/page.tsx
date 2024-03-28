//import Image from "next/image";
import  styles from "../Styles/Landing.module.css";
import "../Styles/global.css";
import '@fontsource/kadwa/700.css';
import Topbar from "../components/Topbar";
import Item from "../components/Item";
import img1 from "../Images/plato_complete_works.jpg"
import RevHoodie from "../Images/Revenge_Hoodie.webp";
import img2 from "../Images/Stanley_cup_pic.jpg";
import img3 from "../Images/sweater_for_Trade.webp";
import img4 from "../Images/worn_Vans.webp"
import img5 from "../Images/used_iphone_xr.webp"
const Rev = RevHoodie.src;
const Plato = img1.src;
const StanleyCup = img2.src;
const Sweater = img3.src;
const vans = img4.src;
const XR = img5.src;
//import Stack from '@mui/material/Stack';
//import Button from '@mui/material/Button';


  function Hub(){

    return(
      <main className={styles.Hello}>
        <Topbar />
       <div className={styles.upper_content}>
          <div className={styles.display_demo}>
            <Item imageUrl={Plato} item_name="Plato complete works" item_condition="Good Condition"/> 
            <Item imageUrl={Sweater} item_name="pastel-sweater" item_condition="Never Worn"/> 
            <Item imageUrl={StanleyCup} item_name="Stanley Cup - white" item_condition="never used"/> 
            <Item imageUrl={vans} item_name="Low Top Vans - Black" item_condition="Heavily Used"/> 
            <Item imageUrl={Rev} item_name="Revenge Hoodie Embroidered" item_condition="Never Worn"/> 
            <Item imageUrl={XR} item_name="Iphone XR - Black" item_condition="used"/> 
          </div>
          <div className={styles.slogan}>
            <h1 id={styles.one}>Trading made <span>Simple</span>,</h1>
            <h1 id={styles.two}>Trading made <span>Safe</span>,</h1>
            <h1 id={styles.three}>Trading made <span>Easy</span>.</h1>
          </div>
        </div>
       
       
      </main>
    );
  }



export default Hub;
