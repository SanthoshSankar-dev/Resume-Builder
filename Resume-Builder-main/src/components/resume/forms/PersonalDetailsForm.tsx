import { PersonalDetails } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface PersonalDetailsFormProps {
  data: PersonalDetails;
  onChange: (data: PersonalDetails) => void;
}

export const PersonalDetailsForm = ({ data, onChange }: PersonalDetailsFormProps) => {
  const handleChange = (field: keyof PersonalDetails, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-display font-semibold text-foreground">Personal Details</h2>
        <p className="text-muted-foreground text-sm">
          Add your basic information so employers can contact you.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="fullName" className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            Location
          </Label>
          <Input
            id="location"
            placeholder="San Francisco, CA"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-muted-foreground" />
            LinkedIn Profile
          </Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/johndoe"
            value={data.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github" className="flex items-center gap-2">
            <Github className="w-4 h-4 text-muted-foreground" />
            GitHub Profile
          </Label>
          <Input
            id="github"
            placeholder="github.com/johndoe"
            value={data.github}
            onChange={(e) => handleChange('github', e.target.value)}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="portfolio" className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            Portfolio Website
          </Label>
          <Input
            id="portfolio"
            placeholder="johndoe.dev"
            value={data.portfolio}
            onChange={(e) => handleChange('portfolio', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
