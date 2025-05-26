"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface Form3Props {
  formData: {
    feedback: string;
    acceptTerms: boolean;
  };
  updateFormData: (data: any) => void;
}

const Form3: React.FC<Form3Props> = ({ formData, updateFormData }) => {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
        <CardDescription>Add your Feedback</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea
              id="feedback"
              value={formData.feedback}
              onChange={(e) => updateFormData({ feedback: e.target.value })}
              placeholder="Share your feedback..."
            />
          </div>
          <div className="flex flex-row space-x-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) =>
                updateFormData({ acceptTerms: checked })
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Form3;
