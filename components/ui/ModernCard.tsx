import React from "react";
import { Card, CardContent } from "./card";
import { LucideIcon } from "lucide-react";

interface ModernCardProps {
  title: string;
  icon: LucideIcon;
  value?: string | number;
  description?: string;
  children?: React.ReactNode;
}

export default function ModernCard({
  title,
  icon: Icon,
  value,
  description,
  children,
}: ModernCardProps) {
  return (
    <Card className="rounded-xl shadow-md bg-white hover:shadow-xl transition-all duration-300 border border-gray-200">
      <div className="flex items-center gap-3 pb-2 border-b">
        <Icon className="w-5 h-5 text-green-600" />
        <div>
          <h3 className="text-md font-semibold text-gray-800">{title}</h3>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
      </div>
      <CardContent className="pt-4 px-4">
        {value && <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>}
        {children}
      </CardContent>
    </Card>
  );
}