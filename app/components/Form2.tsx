"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Form2Props {
  formData: {
    email: string;
    phone: string;
  };
  updateFormData: (data: any) => void;
}

const Form2: React.FC<Form2Props> = ({ formData, updateFormData }) => {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Fill up your Contact Information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              placeholder="Enter your email address"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Form2;
