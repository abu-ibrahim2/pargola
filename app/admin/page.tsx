import React from "react";
import { InfoIcon } from "lucide-react";

const page = async () => {
  
  return (
    <div>
      <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
        <InfoIcon size={16} strokeWidth={2} />
        This is a protected page that you can only see as the admin
      </div>
    </div>
  );
};

export default page;
