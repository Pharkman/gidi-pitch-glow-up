import { useGetPeople } from '@/lib/query';
import React from 'react'

const PeopleData = () => {
    //   const waitlistMutation = useWaitlist();
  const { data: peopleData, isLoading: peopleLoading } = useGetPeople();

  return (
    <div>
            <p className="text-sm text-[#555555] mb-12 text-center mt-20">
  {peopleLoading
    ? "Loading..."
    : `${peopleData?.data.count || 0} ${
        peopleData?.data.count === 1 ? "PERSON" : "PEOPLE"
      } JOINED`}
</p>
    </div>
  )
}

export default PeopleData
