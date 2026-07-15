import type { Metadata } from "next";
import { MapPin, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export const metadata: Metadata = {
  title: "Service Areas",
  robots: { index: false },
};

const ACTIVE_AREAS = ["Kankarbagh", "Boring Road", "Bailey Road", "Rajendra Nagar"];

export default function PartnerAreasPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active localities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {ACTIVE_AREAS.map((area) => (
                  <Badge key={area} variant="gold" className="px-4 py-1.5 text-sm">
                    <MapPin /> {area}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-ink-500">
                You receive bookings from these 4 localities in Patna. Jobs within 5 km of your home base are
                prioritised.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Request a new area</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="area-city">City</Label>
                  <Select id="area-city" defaultValue="patna">
                    <option value="patna">Patna</option>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="area-locality">Locality</Label>
                  <Input id="area-locality" placeholder="e.g. Patliputra Colony" />
                </div>
                <Button type="button" variant="gold" className="w-full">
                  <Send /> Submit request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Map placeholder */}
        <Card className="overflow-hidden">
          <div className="bg-dots relative flex min-h-80 flex-1 items-center justify-center bg-cream-100 lg:h-full">
            <div className="text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-ink-950 text-gold-400 shadow-gold">
                <MapPin className="size-7" />
              </span>
              <p className="mt-3 font-display text-lg font-semibold text-ink-950">Patna coverage map</p>
              <p className="mt-1 text-sm text-ink-500">4 active localities · central Patna</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
