import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useContent } from "../../contexts/ContentContext";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";
import { uploadImage } from "../../../cloudinary";
import { ImageUpload } from "../../components/ui/imageupload";
import { WebsiteSettings } from "../../contexts/ContentContext";

export function WebsiteSettingsSection() {
  const { websiteSettings, saveWebsiteSettings } = useContent();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<WebsiteSettings>({});

  useEffect(() => {
    if (websiteSettings) {
      setFormData(websiteSettings);
    }
  }, [websiteSettings]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof WebsiteSettings
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof WebsiteSettings
  ) => {
    if (!e.target.files?.[0]) return;

    setUploading(true);
    try {
      const url = await uploadImage(e.target.files[0]);
      setFormData((prev) => ({
        ...prev,
        [field]: url,
      }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await saveWebsiteSettings(formData);
      toast.success("Website settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save website settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName || ""}
                  onChange={(e) => handleInputChange(e, "companyName")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyTagline">Company Tagline</Label>
                <Textarea
                  id="companyTagline"
                  placeholder="Enter company tagline"
                  value={formData.companyTagline || ""}
                  onChange={(e) => handleInputChange(e, "companyTagline")}
                  className="min-h-24"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Branding Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Company Logo</Label>
                <div className="space-y-2">
                  {formData.companyLogo && (
                    <div className="flex justify-center mb-4">
                      <img
                        src={formData.companyLogo}
                        alt="Company Logo"
                        className="h-32 object-contain"
                      />
                    </div>
                  )}
                  <ImageUpload
                    onUpload={(e) => handleImageUpload(e, "companyLogo")}
                    disabled={uploading}
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Favicon</Label>
                <div className="space-y-2">
                  {formData.favicon && (
                    <div className="flex justify-center mb-4">
                      <img
                        src={formData.favicon}
                        alt="Favicon"
                        className="h-16 object-contain"
                      />
                    </div>
                  )}
                  <ImageUpload
                    onUpload={(e) => handleImageUpload(e, "favicon")}
                    disabled={uploading}
                    accept="image/*"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="primaryEmail">Primary Email *</Label>
                <Input
                  id="primaryEmail"
                  type="email"
                  placeholder="email@company.com"
                  value={formData.primaryEmail || ""}
                  onChange={(e) => handleInputChange(e, "primaryEmail")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryPhone">Primary Phone *</Label>
                <Input
                  id="primaryPhone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.primaryPhone || ""}
                  onChange={(e) => handleInputChange(e, "primaryPhone")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryPhone">Secondary Phone (Optional)</Label>
                <Input
                  id="secondaryPhone"
                  placeholder="+1 (555) 123-4568"
                  value={formData.secondaryPhone || ""}
                  onChange={(e) => handleInputChange(e, "secondaryPhone")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  id="whatsappNumber"
                  placeholder="+1 (555) 123-4567"
                  value={formData.whatsappNumber || ""}
                  onChange={(e) => handleInputChange(e, "whatsappNumber")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="officeAddress">Office Address</Label>
                <Textarea
                  id="officeAddress"
                  placeholder="Enter office address"
                  value={formData.officeAddress || ""}
                  onChange={(e) => handleInputChange(e, "officeAddress")}
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessHours">Business Hours</Label>
                <Textarea
                  id="businessHours"
                  placeholder="e.g., Mon-Fri: 9:00 AM - 6:00 PM"
                  value={formData.businessHours || ""}
                  onChange={(e) => handleInputChange(e, "businessHours")}
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="panVatNumber">PAN/VAT Number</Label>
                <Input
                  id="panVatNumber"
                  placeholder="Enter PAN/VAT number"
                  value={formData.panVatNumber || ""}
                  onChange={(e) => handleInputChange(e, "panVatNumber")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="googleMapsEmbedUrl">Google Maps Embed URL</Label>
                <Textarea
                  id="googleMapsEmbedUrl"
                  placeholder="Paste the embed iframe code"
                  value={formData.googleMapsEmbedUrl || ""}
                  onChange={(e) => handleInputChange(e, "googleMapsEmbedUrl")}
                  className="min-h-24 font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook URL</Label>
                <Input
                  id="facebookUrl"
                  placeholder="https://facebook.com/yourpage"
                  value={formData.facebookUrl || ""}
                  onChange={(e) => handleInputChange(e, "facebookUrl")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagramUrl">Instagram URL</Label>
                <Input
                  id="instagramUrl"
                  placeholder="https://instagram.com/yourprofile"
                  value={formData.instagramUrl || ""}
                  onChange={(e) => handleInputChange(e, "instagramUrl")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  placeholder="https://linkedin.com/company/yourcompany"
                  value={formData.linkedinUrl || ""}
                  onChange={(e) => handleInputChange(e, "linkedinUrl")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktokUrl">TikTok URL</Label>
                <Input
                  id="tiktokUrl"
                  placeholder="https://tiktok.com/@yourprofile"
                  value={formData.tiktokUrl || ""}
                  onChange={(e) => handleInputChange(e, "tiktokUrl")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={loading || uploading}
          className="gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
