"use client";

import { Badge } from "@/components/ui/badge";

interface UserStatusToggleProps {
  isActive: boolean;
  // onChange: (isActive: boolean) => void;
}

export function UserStatusToggle({
  isActive,
  //onChange,
}: UserStatusToggleProps) {
  return (
    <div className="flex items-center gap-2">
      {/*  <Switch
        checked={isActive}
        onCheckedChange={onChange}
        aria-label="Toggle user status"
      /> */}
      <Badge variant={isActive ? "default" : "destructive"}>
        {isActive ? "Active" : "Inactive"}
      </Badge>
    </div>
  );
}
