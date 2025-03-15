import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock data for demonstration - replace with actual data fetching
const mockCertificates = [
  {
    id: 'HH-12345',
    candidateName: 'Ramakrushna Biswal',
    collegeName: 'GIET University',
    certificateType: 'Offer Letter',
    issuedDate: 'Feb 27, 2025',
    internshipDuration: {
      start: 'March 1, 2025',
      end: 'May 31, 2025',
    },
    photo: 'https://media.licdn.com/dms/image/v2/D5603AQEp0ho2K84olQ/profile-displayphoto-shrink_800_800/B56ZPOmwuJGsAg-/0/1734338089173?e=1746057600&v=beta&t=y9vWM5QH3ARK4O9GDXcADqkizsnGuL0-EdepQBN9ifE',
    socials: {
      github: 'https://github.com/ram/',
      linkedin: 'https://www.linkedin.com/in/ram',
      email: 'mailto:ram@gmail.com',
    },
  },

  // For testing the LinkedIn profile picture fetching
  {
    id: 'HH-98765',
    candidateName: 'John Doe',
    collegeName: 'University of Technology',
    certificateType: 'Internship',
    issuedDate: 'January 15, 2025',
    internshipDuration: {
      start: 'December 1, 2024',
      end: 'January 31, 2025',
    },
    photo: '',
    photoSource: 'linkedin' as 'manual' | 'linkedin',
    socials: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
      email: 'mailto:john@example.com',
    },
  },
];

export function CertificateResult() {
  const { certificateId } = useParams();
  const certificate = mockCertificates.find(cert => cert.id === certificateId);
  const isValid = !!certificate;
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);

  useEffect(() => {
    if (isValid && certificate && certificate.socials?.linkedin && (!certificate.photo || certificate.photo === '') && certificate.photoSource === 'linkedin') {
      fetchLinkedInProfilePicture();
    }
  }, [isValid, certificate]);

  const fetchLinkedInProfilePicture = async () => {
    if (!certificate || !certificate.socials?.linkedin) return;
    
    setIsLoadingPhoto(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would use LinkedIn's API
      const placeholderUrl = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80`;
      
      // This is just for demonstration - in a real app, you would update this in your database
      const updatedCertificates = mockCertificates.map(cert => {
        if (cert.id === certificateId) {
          return { ...cert, photo: placeholderUrl };
        }
        return cert;
      });
      
      // For demo purposes only
      console.log('Updated certificates with LinkedIn photo', updatedCertificates);
    } catch (error) {
      console.error('Error fetching LinkedIn profile picture:', error);
    } finally {
      setIsLoadingPhoto(false);
    }
  };

  if (!isValid) {
    return (
      <div className="flex flex-col items-center justify-center p-8 animate-fade-in">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Invalid Certificate ID. Please check again.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 animate-fade-in">
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
          <div className="absolute top-4 right-4 z-10">
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
            {isLoadingPhoto ? (
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-lg">
                <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
              </div>
            ) : certificate.photo ? (
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <img
                    src={certificate.photo}
                    alt={certificate.candidateName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {certificate.photoSource === 'linkedin' && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full">
                    <Linkedin className="w-4 h-4" />
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Certificate Content - Add padding-top to make space for the profile photo */}
          <div className="pt-20 mt-4">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {certificate.candidateName}
                </h1>
                <p className="text-gray-500">{certificate.collegeName}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Certificate Type</p>
                  <p className="font-medium text-gray-900">{certificate.certificateType}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Certificate ID</p>
                  <p className="font-medium text-gray-900">#{certificate.id}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Issue Date</p>
                  <p className="font-medium text-gray-900">{certificate.issuedDate}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Internship Duration</p>
                  <p className="font-medium text-gray-900">
                    {certificate.internshipDuration.start} → {certificate.internshipDuration.end}
                  </p>
                </div>
              </div>

              {certificate.socials && (
                <div className="pt-6 border-t border-gray-200">
                  <h2 className="text-sm font-medium text-gray-500 mb-4">
                    {certificate.candidateName} Socials
                  </h2>
                  <div className="flex space-x-4">
                    {certificate.socials.github && (
                      <a
                        href={certificate.socials.github}
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
                    {certificate.socials.linkedin && (
                      <a
                        href={certificate.socials.linkedin}
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
                    {certificate.socials.twitter && (
                      <a
                        href={certificate.socials.twitter}
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
                    {certificate.socials.email && (
                      <a
                        href={certificate.socials.email}
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
  );
}
