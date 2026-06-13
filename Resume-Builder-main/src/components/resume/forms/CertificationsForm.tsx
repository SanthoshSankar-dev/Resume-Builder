import { useState } from 'react';
import { Certification } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CertificationsFormProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

export const CertificationsForm = ({ certifications, onChange }: CertificationsFormProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(certifications[0]?.id || null);

  const addCertification = () => {
    const newCertification: Certification = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
      link: '',
    };
    onChange([...certifications, newCertification]);
    setExpandedId(newCertification.id);
  };

  const removeCertification = (id: string) => {
    onChange(certifications.filter((cert) => cert.id !== id));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange(
      certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-xl font-display font-semibold text-foreground">Certifications & Awards</h2>
        <p className="text-muted-foreground text-sm">
          Add certifications, licenses, and awards that highlight your achievements.
        </p>
      </div>

      <div className="space-y-4">
        {certifications.map((cert) => (
          <Card key={cert.id} className="overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">
                    {cert.name || 'New Certification'}
                  </p>
                  <p className="text-sm text-muted-foreground">{cert.issuer || 'Issuing organization'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCertification(cert.id);
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {expandedId === cert.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                expandedId === cert.id ? "max-h-[400px]" : "max-h-0"
              )}
            >
              <CardContent className="pt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor={`name-${cert.id}`}>Certification Name</Label>
                    <Input
                      id={`name-${cert.id}`}
                      placeholder="AWS Solutions Architect"
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`issuer-${cert.id}`}>Issuing Organization</Label>
                    <Input
                      id={`issuer-${cert.id}`}
                      placeholder="Amazon Web Services"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`date-${cert.id}`}>Date Earned</Label>
                    <Input
                      id={`date-${cert.id}`}
                      placeholder="March 2023"
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor={`link-${cert.id}`}>Credential URL (optional)</Label>
                    <Input
                      id={`link-${cert.id}`}
                      placeholder="https://www.credential.net/..."
                      value={cert.link}
                      onChange={(e) => updateCertification(cert.id, 'link', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}

        <Button onClick={addCertification} variant="outline" className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Add Certification
        </Button>
      </div>
    </div>
  );
};
