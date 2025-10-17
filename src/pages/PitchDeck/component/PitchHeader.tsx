import React from 'react'
import Gidipicth from '../../../../public/assets/Gidipitch Logo.svg'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUser } from '@/lib/query'
import { ChevronDown } from 'lucide-react'

const PitchHeader = () => {
const {data:user_data} = useGetUser()
  return (
    <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
     <img src={Gidipicth} alt="Gidipitch Logo" className="w-16 h-16" />
     <div>
        <DropdownMenu>
             <DropdownMenuTrigger asChild>
              <Button variant="none" className="flex items-center space-x-0">
                <Avatar className="h-[40px] w-[40px]">
  <AvatarImage src={user_data?.user?.profileImage || ""} />
  <AvatarFallback className="bg-primary text-white font-semibold">
    {user_data?.user?.firstname && user_data?.user?.lastname
      ? `${user_data.user.firstname.charAt(0)}${user_data.user.lastname.charAt(0)}`.toUpperCase()
      : user_data?.user?.email
      ? user_data.user.email.charAt(0).toUpperCase()
      : "NA"}
  </AvatarFallback>
</Avatar>

                <ChevronDown className="h-6 w-6 md:h-9 md:w-9 block" />
              </Button>
            </DropdownMenuTrigger>
        </DropdownMenu>
     </div>
    </div>
  )
}

export default PitchHeader
