"use client"
import { BountyCard } from "@/components/BountyCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BountyCardprops } from "@/components/BountyCard";

export default function Home() {

  const [bounties, setBounties] = useState<BountyCardprops[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/getpost")
      .then(res => {
        setBounties(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return <div>
    {
      bounties.map((bounty) => 
      <BountyCard 
        title={bounty.title} 
        description={bounty.description} 
        amount={bounty.amount} 
        deadline={bounty.deadline}
        link={bounty.link} />)
    }
  </div>
}
