"use client"
import { BountyCard } from "@/components/BountyCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BountyCardprops } from "@/components/BountyCard";

export const fetchCache = 'force-no-store'

export default function Home() {
  const [bounties, setBounties] = useState<BountyCardprops[]>([]);

  useEffect(() => {
    axios.get("https://auto-bounty-register-blink.vercel.app/api/getpost")
      .then(res => {
        setBounties(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
