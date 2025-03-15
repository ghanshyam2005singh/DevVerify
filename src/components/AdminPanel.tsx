import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { 
  Upload, 
  Calendar, 
  Github, 
  Linkedin, 
  Mail, 
  Twitter, 
  Eye, 
  Download, 
  Copy, 
  CheckCircle,
  X,
  ArrowLeft,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { cn } from '../lib/utils';

const certificateTypes = [
  'Internship',
  'Letter of Recommendation',
  'Completion Certificate',
  'Offer Letter',
  'Custom'
];

export function AdminPanel() {
  const [formData, setFormData] = useState({
    candidateName: '',
    collegeName: '',
    certificateType: certificateTypes[0],
    customType: '',
    certificateId: '',
    issueDate: new Date(),
    internshipStart: null as Date | null,
    internshipEnd: null as Date | null,
    photo: null as File | null,
    photoPreview: '',
    photoSource: 'manual' as 'manual' | 'linkedin',
    socials: {
      github: '',
      linkedin: '',
      twitter: '',
      email: '',
    },
  });

  const [showPreview, setShowPreview] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [isLoadingLinkedInPhoto, setIsLoadingLinkedInPhoto] = useState(false);

  useEffect(() => {
    // If LinkedIn URL changes and photoSource is set to LinkedIn, try to fetch the profile picture
    if (formData.photoSource === 'linkedin' && formData.socials.linkedin) {
      fetchLinkedInProfilePicture();
    }
  }, [formData.socials.linkedin, formData.photoSource]);

  const fetchLinkedInProfilePicture = async () => {
    // In a real implementation, you would use LinkedIn's API or a scraping service
    // For this demo, we'll simulate fetching with a placeholder image
    if (!formData.socials.linkedin) return;
    
    setIsLoadingLinkedInPhoto(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Extract username from LinkedIn URL for demonstration
      const username = formData.socials.linkedin.split('/in/')[1]?.split('/')[0] || 'default';
      
      // Use a placeholder image based on the username
      // In a real implementation, you would use LinkedIn's API
      const placeholderUrl = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80`;
      
      setFormData({
        ...formData,
        photoPreview: placeholderUrl,
      });
    } catch (error) {
      console.error('Error fetching LinkedIn profile picture:', error);
      alert('Failed to fetch LinkedIn profile picture. Please upload manually or try again.');
    } finally {
      setIsLoadingLinkedInPhoto(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) { // 10MB limit
      setFormData({
        ...formData,
        photo: file,
        photoPreview: URL.createObjectURL(file),
        photoSource: 'manual',
      });
    } else {
      alert('Please select an image under 10MB');
    }
  };

  const handlePhotoSourceChange = (source: 'manual' | 'linkedin') => {
    setFormData({
      ...formData,
      photoSource: source,
    });
    
    if (source === 'linkedin' && formData.socials.linkedin) {
      fetchLinkedInProfilePicture();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Certificate data:', formData);
    alert('Certificate created successfully!');
  };

  const generateQRCode = () => {
    setQrGenerated(true);
  };

  const downloadQR = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qr-${formData.certificateId}.png`;
      link.href = url;
      link.click();
    }
  };

  const copyQRLink = () => {
    const url = `${window.location.origin}/${formData.certificateId}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const PreviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Preview Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ArrowLeft 
              className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" 
              onClick={() => setShowPreview(false)}
            />
            <h2 className="text-xl font-semibold">Certificate Preview</h2>
          </div>
          <X 
            className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" 
            onClick={() => setShowPreview(false)}
          />
        </div>

        {/* Certificate Preview */}
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Enhanced Header Background with Modern Design Elements and Animation */}
            <div className="relative h-32 overflow-hidden">
              {/* Base Gradient with Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 animate-gradient-x"></div>
              
              {/* Animated Floating Particles */}
              <div className="absolute inset-0">
                <div className="absolute top-5 right-20 w-16 h-16 rounded-full bg-white opacity-10 transform rotate-45 animate-float-slow"></div>
                <div className="absolute top-10 left-20 w-20 h-20 rounded-full bg-white opacity-10 animate-float"></div>
                <div className="absolute bottom-5 left-1/3 w-12 h-12 rounded-full bg-white opacity-10 animate-float-fast"></div>
              </div>
              
              {/* Animated Wave Pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full animate-wave" preserveAspectRatio="none">
                  <path fill="rgba(255, 255, 255, 0.5)" fillOpacity="1" 
                    d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                  </path>
                </svg>
              </div>
              
              {/* Animated Glassmorphism Effect */}
              <div className="absolute inset-0 backdrop-blur-sm bg-white/5 animate-pulse-slow"></div>

              {/* Animated Verification Badge */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/30 animate-badge-glow">
                  <CheckCircle2 className="w-5 h-5 text-white animate-pulse" />
                  <span className="text-white font-medium">Verified</span>
                </div>
              </div>
            </div>

            {/* Fixed positioning for the profile photo to ensure it's fully visible */}
            <div className="relative px-8 pb-8">
              {/* Profile Photo Container - Positioned to overlap the header */}
              <div className="absolute -top-16 left-8">
                {formData.photoPreview && (
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                      <img
                        src={formData.photoPreview}
                        alt={formData.candidateName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {formData.photoSource === 'linkedin' && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full">
                        <Linkedin className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Certificate Content - Add padding-top to make space for the profile photo */}
              <div className="pt-20 mt-4">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {formData.candidateName || 'Candidate Name'}
                    </h1>
                    <p className="text-gray-500">{formData.collegeName || 'College Name'}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Certificate Type</p>
                      <p className="font-medium text-gray-900">
                        {formData.certificateType === 'Custom' ? formData.customType : formData.certificateType}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Certificate ID</p>
                      <p className="font-medium text-gray-900">#{formData.certificateId}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Issue Date</p>
                      <p className="font-medium text-gray-900">{formatDate(formData.issueDate)}</p>
                    </div>
                    {(formData.internshipStart || formData.internshipEnd) && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Internship Duration</p>
                        <p className="font-medium text-gray-900">
                          {formatDate(formData.internshipStart)} → {formatDate(formData.internshipEnd)}
                        </p>
                      </div>
                    )}
                  </div>

                  {Object.values(formData.socials).some(value => value) && (
                    <div className="pt-6 border-t border-gray-200">
                      <h2 className="text-sm font-medium text-gray-500 mb-4">
                        {formData.candidateName || 'Candidate'} Socials
                      </h2>
                      <div className="flex space-x-4">
                        {formData.socials.github && (
                          <a
                            href={formData.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "p-2 rounded-full transition-colors duration-200",
                              "hover:bg-gray-100"
                            )}
                          >
                            <Github className="w-5 h-5 text-gray-600" />
                          </a>
                        )}
                        {formData.socials.linkedin && (
                          <a
                            href={formData.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "p-2 rounded-full transition-colors duration-200",
                              "hover:bg-gray-100"
                            )}
                          >
                            <Linkedin className="w-5 h-5 text-gray-600" />
                          </a>
                        )}
                        {formData.socials.twitter && (
                          <a
                            href={formData.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "p-2 rounded-full transition-colors duration-200",
                              "hover:bg-gray-100"
                            )}
                          >
                            <Twitter className="w-5 h-5 text-gray-600" />
                          </a>
                        )}
                        {formData.socials.email && (
                          <a
                            href={`mailto:${formData.socials.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "p-2 rounded-full transition-colors duration-200",
                              "hover:bg-gray-100"
                            )}
                          >
                            <Mail className="w-5 h-5 text-gray-600" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Footer */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Back to Edit
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={cn(
              "flex items-center px-6 py-2 rounded-md",
              "bg-primary text-white font-medium",
              "hover:bg-primary-hover transition-colors duration-200"
            )}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirm & Upload
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Admin Dashboard</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Photo Upload Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">Candidate Photo</label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handlePhotoSourceChange('manual')}
                className={cn(
                  "px-3 py-1 text-xs rounded-md",
                  formData.photoSource === 'manual' 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                Manual Upload
              </button>
              <button
                type="button"
                onClick={() => handlePhotoSourceChange('linkedin')}
                className={cn(
                  "px-3 py-1 text-xs rounded-md flex items-center",
                  formData.photoSource === 'linkedin' 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                <Linkedin className="w-3 h-3 mr-1" />
                LinkedIn
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              {isLoadingLinkedInPhoto ? (
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />
                </div>
              ) : formData.photoPreview ? (
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img
                      src={formData.photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {formData.photoSource === 'linkedin' && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full">
                      <Linkedin className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
              )}
              {formData.photoSource === 'manual' && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              )}
            </div>
            <div className="text-sm text-gray-500">
              {formData.photoSource === 'manual' ? (
                <>
                  <p>Upload candidate photo</p>
                  <p>PNG, JPG (max. 10MB)</p>
                </>
              ) : (
                <>
                  <p>LinkedIn profile photo</p>
                  <p>Will be fetched automatically when LinkedIn URL is provided</p>
                  {formData.socials.linkedin && !formData.photoPreview && !isLoadingLinkedInPhoto && (
                    <button
                      type="button"
                      onClick={fetchLinkedInProfilePicture}
                      className="text-primary hover:underline mt-1 flex items-center"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" /> Fetch photo
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Candidate Name</label>
            <input
              type="text"
              value={formData.candidateName}
              onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">College Name</label>
            <input
              type="text"
              value={formData.collegeName}
              onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Certificate Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Certificate Type</label>
            <select
              value={formData.certificateType}
              onChange={(e) => setFormData({ ...formData, certificateType: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
              {certificateTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {formData.certificateType === 'Custom' && (
              <input
                type="text"
                value={formData.customType}
                onChange={(e) => setFormData({ ...formData, customType: e.target.value })}
                placeholder="Enter custom certificate type"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Certificate ID</label>
            <input
              type="text"
              value={formData.certificateId}
              onChange={(e) => setFormData({ ...formData, certificateId: e.target.value })}
              placeholder="e.g., HH-123456"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Issue Date</label>
            <div className="mt-1 relative">
              <DatePicker
                selected={formData.issueDate}
                onChange={(date: Date) => setFormData({ ...formData, issueDate: date })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Internship Start</label>
            <div className="mt-1 relative">
              <DatePicker
                selected={formData.internshipStart}
                onChange={(date: Date) => setFormData({ ...formData, internshipStart: date })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Internship End</label>
            <div className="mt-1 relative">
              <DatePicker
                selected={formData.internshipEnd}
                onChange={(date: Date) => setFormData({ ...formData, internshipEnd: date })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input
                type="url"
                value={formData.socials.github}
                onChange={(e) => setFormData({
                  ...formData,
                  socials: { ...formData.socials, github: e.target.value }
                })}
                placeholder="GitHub Profile URL"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
              <Github className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="url"
                value={formData.socials.linkedin}
                onChange={(e) => setFormData({
                  ...formData,
                  socials: { ...formData.socials, linkedin: e.target.value }
                })}
                placeholder="LinkedIn Profile URL"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
              <Linkedin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="url"
                value={formData.socials.twitter}
                onChange={(e) => setFormData({
                  ...formData,
                  socials: { ...formData.socials, twitter: e.target.value }
                })}
                placeholder="Twitter Profile URL"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
              <Twitter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="email"
                value={formData.socials.email}
                onChange={(e) => setFormData({
                  ...formData,
                  socials: { ...formData.socials, email: e.target.value }
                })}
                placeholder="Email Address"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Certificate QR Code</h3>
          <div className="flex items-start space-x-6">
            <div className="bg-white rounded-lg shadow-md p-4 w-fit">
              {qrGenerated ? (
                <QRCodeSVG
                  value={`${window.location.origin}/${formData.certificateId}`}
                  size={128}
                  level="H"
                  includeMargin={true}
                />
              ) : (
                <div className="w-32 h-32 bg-gray-100 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={generateQRCode}
                className={cn(
                  "flex items-center px-4 py-2 rounded-md w-full",
                  qrGenerated
                    ? "bg-gray-100 text-gray-700"
                    : "bg-primary text-white hover:bg-primary-hover"
                )}
                disabled={qrGenerated}
              >
                <Eye className="w-4 h-4 mr-2" />
                {qrGenerated ? 'QR Code Generated' : 'Generate QR Code'}
              </button>
              {qrGenerated && (
                <>
                  <button
                    type="button"
                    onClick={downloadQR}
                    className="flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download QR Code
                  </button>
                  <button
                    type="button"
                    onClick={copyQRLink}
                    className="flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 w-full"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Certificate Link
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="flex items-center px-6 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            <Eye className="w-5 h-5 mr-2" />
            Preview
          </button>
          <button
            type="submit"
            className={cn(
              "flex items-center px-6 py-2 rounded-md",
              "bg-primary text-white font-medium",
              "hover:bg-primary-hover transition-colors duration-200"
            )}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Create Certificate
          </button>
        </div>
      </form>

      {showPreview && <PreviewModal />}
    </div>
  );
}