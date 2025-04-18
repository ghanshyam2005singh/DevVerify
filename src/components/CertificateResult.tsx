import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock data for demonstration - replace with actual data fetching
const mockCertificates = [
  {
      "id": "HH-31C96F",
      "candidateName": "Vedant Anand",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "https://drive.google.com/file/d/1s3bD-U0t_k7JCHVBt2YTBumJvhrBI3K_/view",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://GitHub.com/vedantanand17",
          "linkedin": "https://linkedin.com/in/vedantanand17",
          "twitter": "https://x.com/vedantsx",
          "email": "mailto:vedantanand.in@gmail.com"
      }
  },
  {
      "id": "HH-DC7DA0",
      "candidateName": "Ghanshyam Singh",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/ghanshyam2005singh",
          "linkedin": "https://www.linkedin.com/in/ghanshyam-singh-b014232b2/",
          "twitter": "https://x.com/https_ghanshyam",
          "email": "mailto:ghanshyam2005singh@gmail.com"
      }
  },
  {
      "id": "HH-ED9FF6",
      "candidateName": "Anushka Tiwari",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/anushka226",
          "linkedin": "https://www.linkedin.com/in/anushka-tiwari-a2693526b/",
          "twitter": "https://x.com/anushkat711",
          "email": "mailto:anushkat711@gmail.com"
      }
  },
  {
      "id": "HH-22A69D",
      "candidateName": "Ayushmaan Singh yadav ",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/asteriskayush007",
          "linkedin": "https://www.linkedin.com/in/ayushmaansinghyadav/",
          "twitter": "https://x.com/SinghYadav58685",
          "email": "mailto:ayushmaansinghyadav18@gmail.com"
      }
  },
  {
      "id": "HH-E18B32",
      "candidateName": "Chiranth Raju C ",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/CHIRANTH-24/",
          "linkedin": "https://www.linkedin.com/in/chiranthrajuc/",
          "twitter": "https://twitter.com/ChiranthRaju",
          "email": "mailto:chiranthrajuc@gmail.com"
      }
  },
  {
      "id": "HH-CF1AA9",
      "candidateName": "Karishma Seth",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/karishmaaa101",
          "linkedin": "https://www.linkedin.com/in/karishmaaa101/",
          "twitter": "https://x.com/karishmaseth6",
          "email": "mailto:motivatedme999@gmail.com"
      }
  },
  {
      "id": "HH-7C1A67",
      "candidateName": "Piyush Prasad",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/piyzard",
          "linkedin": "https://www.linkedin.com/in/piyzard/",
          "twitter": "https://x.com/notpiyzard",
          "email": "mailto:piyushprasad121@gmail.com"
      }
  },
  {
      "id": "HH-817F6E",
      "candidateName": "Yash Kumar Saini",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/yashksaini-coder",
          "linkedin": "https://www.linkedin.com/in/yashksaini/",
          "twitter": "https://x.com/EasycodesDev",
          "email": "mailto:ys3853428@gmail.com"
      }
  },
  {
      "id": "HH-9B3B0D",
      "candidateName": "Harshit Verma ",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/therealharshit",
          "linkedin": "https://www.linkedin.com/in/therealharshit",
          "twitter": "https://x.com/therealharshiit",
          "email": "mailto:Therealharshit014@gmail.com"
      }
  },
  {
      "id": "HH-B8F4E8",
      "candidateName": "Sayan Rakshit",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/devsayanR",
          "linkedin": "https://www.linkedin.com/in/sayandotcom",
          "twitter": "https://x.com/sayandotdev",
          "email": "mailto:sayanrakshit.hpl@gmail.com"
      }
  },
  {
      "id": "HH-3E07EE",
      "candidateName": "sneha kumari",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/Snehsk",
          "linkedin": "https://www.linkedin.com/in/sneha-kumari1/",
          "twitter": "https://x.com/SnehaKumariSk1",
          "email": "mailto:snehakumari0456@gmail.com"
      }
  },
  {
      "id": "HH-BD35EF",
      "candidateName": "Hetvi Popat",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "",
          "linkedin": "https://www.linkedin.com/in/hetvi-popat-283b49272",
          "twitter": "https://x.com/HetviP2605?t=ytiunxBerGKZKQ54IQtrVg&s=09",
          "email": "mailto:phetvi.2605@gmail.com"
      }
  },
  {
      "id": "HH-9829E6",
      "candidateName": "Manishka Asrani",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/manishka119",
          "linkedin": "https://www.linkedin.com/in/manishka-asrani/",
          "twitter": "https://x.com/manishka119",
          "email": "mailto:manishkaasrani@gmail.com"
      }
  },
  {
      "id": "HH-01BAB9",
      "candidateName": "Devaki Joshi",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/Devaki01",
          "linkedin": "www.linkedin.com/in/devaki-joshi-033b6a307",
          "twitter": "-",
          "email": "mailto:devakijoshi.2005@gmail.com"
      }
  },
  {
      "id": "HH-49EA03",
      "candidateName": "Ramakrushna Biswal",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/RamakrushnaBiswal",
          "linkedin": "https://www.linkedin.com/in/ramakrushna-biswal",
          "twitter": "https://x.com/Ramakrushna23",
          "email": "mailto:ramakrushnabunty@gmail.com"
      }
  },
  {
      "id": "HH-C40957",
      "candidateName": "Sanchit Sehgal ",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/Sanchit-aiml",
          "linkedin": "https://www.linkedin.com/in/sanchitsehgal/",
          "twitter": "https://x.com/sanchitseh38640?s=11",
          "email": "mailto:sanchitsehgal16@gmail.com"
      }
  },
  {
      "id": "HH-A88BC7",
      "candidateName": "Divyam Sharma",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/Divyamsharma-18",
          "linkedin": "https://www.linkedin.com/in/divyam-sharma-6ba700249/",
          "twitter": "https://x.com/Heydivyamsharma",
          "email": "mailto:divyamsharmaworks@gmail.com"
      }
  },
  {
      "id": "HH-396E76",
      "candidateName": "Muskan kashyap ",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/Muskankashyap12",
          "linkedin": "https://www.linkedin.com/in/muskan-kashyap-b367b5290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          "twitter": "NA",
          "email": "mailto:muskankashyap1402@gmail.com"
      }
  },
  {
      "id": "HH-2245A7",
      "candidateName": "Saumili Dutta",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/aumiidutta",
          "linkedin": "https://www.linkedin.com/in/saumilidutta/",
          "twitter": "https://x.com/aumiidutta",
          "email": "mailto:saumili.work@gmail.com"
      }
  },
  {
      "id": "HH-9E0587",
      "candidateName": "Aditya D",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/adi271001",
          "linkedin": "https://www.linkedin.com/in/aditya-d-23453a179/",
          "twitter": "https://x.com/ADITYAD29257528",
          "email": "mailto:ibetanibex@gmail.com"
      }
  },
  {
      "id": "HH-81A6AE",
      "candidateName": "Sanskriti",
      "collegeName": "",
      "certificateType": "Internship",
      "issuedDate": "February 15, 2025",
      "internshipDuration": {
          "start": "October 1, 2024",
          "end": "April 1, 2025"
      },
      "photo": "",
      "photoSource": "linkedin",
      "socials": {
          "github": "https://github.com/sanskriti2005",
          "linkedin": "https://www.linkedin.com/in/sanskriti-s/",
          "twitter": "N/a",
          "email": "mailto:sanskritisri27@gmail.com"
      }
  }
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
