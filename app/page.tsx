"use client"
import { BountyCard } from "@/components/BountyCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BountyCardprops } from "@/components/BountyCard";

export const fetchCache = 'force-no-store'

export default function Home() {
  const [bounties, setBounties] = useState<BountyCardprops[]>([]);

  // useEffect(() => {
  //   axios.get("http://localhost:3000/api/getpost")
  //     .then(res => {
  //       setBounties(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  async function fetchData() {
    try {
      const res = await fetch('http://localhost:3000/api/getpost', { cache: 'no-store' || 'no-cache' });
      
      // Parse the JSON data
      const data = await res.json();
  
      // Set the bounties state with the parsed data
      setBounties(data);
      
      // Log the data after it's been parsed
      console.log(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }  

  useEffect(() => {
    // fetch("https://auto-bounty-register-blink.vercel.app/api/getpost", {
    //   cache: fetchCache
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     setBounties(data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    fetchData();
  }, []);
  

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-wide my-6 mx-7 pb-4 text-gray-800 montserrat border-b-2">
        Bounties
      </h2>
      {
        bounties.map((bounty, index) => (
          <BountyCard 
            key={bounty._id}
            title={bounty.title} 
            description={bounty.description} 
            amount={bounty.amount} 
            deadline={bounty.deadline} 
            link={bounty.link} 
          />
        ))
      }
    </div>
  );
}
