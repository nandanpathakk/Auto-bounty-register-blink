"use client"
import { BountyCard } from "@/components/BountyCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BountyCardprops } from "@/components/BountyCard";
import { unstable_noStore as nostore } from "next/cache";
import { Suspense } from "react";
import { BountyCardSkeleton } from "@/components/BountyCardSkeleton";

export default function Home() {
  const [bounties, setBounties] = useState<BountyCardprops[]>([]);
  const [loading, setLoading] = useState(false)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  nostore();

  // useEffect(() => {
  //   axios.get(`${apiUrl}/api/getpost`)
  //     .then(res => {
  //       setBounties(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${apiUrl}/api/getpost`, {
          next: {
            revalidate: 3
          }
        });
        if (!res.ok) {
          throw new Error('Failed to fetch bounties');
        }
        const data = await res.json();
        setBounties(data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };

    fetchBounties();
  }, []);



  return (
    <div>
      <Suspense fallback={null}>
        <h2 className="text-3xl font-bold tracking-wide my-6 mx-7 pb-4 text-gray-800 montserrat border-b-2">
          Bounties
        </h2>
        {
          loading ? (
            <div>
              <BountyCardSkeleton />
              <BountyCardSkeleton />
              <BountyCardSkeleton />
            </div>

          ) : (
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
          )

        }
      </Suspense>
    </div>
  );
}
