import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function ProfileORCIDSetup() {
  const { user, updateProfile } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [staffId, setStaffId] = useState('');
  const [orcidId, setOrcidId] = useState('');
  const [orcidError, setOrcidError] = useState('');
  const [isOrcidValid, setIsOrcidValid] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setStaffId(user.staffId || '');
      const userOrcid = user.orcidId || '';
      setOrcidId(userOrcid);

      // Validate existing ORCID without setting errors
      if (userOrcid) {
        const cleanValue = userOrcid.replace(/-/g, '');
        const valid = cleanValue.length === 16 && /^\d+$/.test(cleanValue);
        setIsOrcidValid(valid);
      }
    }
  }, [user]);

  const checkORCIDValidity = (value: string): boolean => {
    const cleanValue = value.replace(/-/g, '');

    if (cleanValue.length !== 16) {
      setOrcidError('ORCID must be exactly 16 digits');
      setIsOrcidValid(false);
      return false;
    }

    if (!/^\d+$/.test(cleanValue)) {
      setOrcidError('ORCID must contain only numbers');
      setIsOrcidValid(false);
      return false;
    }

    setOrcidError('');
    setIsOrcidValid(true);
    return true;
  };

  const handleORCIDChange = (value: string) => {
    setOrcidId(value);
    if (value) {
      checkORCIDValidity(value);
    } else {
      setOrcidError('');
      setIsOrcidValid(false);
    }
  };

  const formatORCID = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const parts = cleaned.match(/.{1,4}/g);
    return parts ? parts.join('-') : cleaned;
  };

  const isFormValid = (): boolean => {
    if (!firstName || !lastName || !email || !staffId) return false;
    if (orcidId && orcidError) return false;
    return true;
  };

  const handleSave = () => {
    if (!isFormValid()) {
      toast.error('Please fix validation errors before saving');
      return;
    }

    updateProfile({
      firstName,
      lastName,
      email,
      staffId,
      orcidId: orcidId || undefined,
    });

    toast.success('Profile updated successfully');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Profile & ORCID Setup</h1>
        <p className="text-gray-600">
          Manage your personal information and research identification
        </p>
      </div>

      <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm max-w-2xl">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">UTM Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.name@utm.my"
              className="mt-1"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <Label htmlFor="staffId">Staff ID</Label>
            <Input
              id="staffId"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              placeholder="UTM-XXX-XXX"
              className="mt-1"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Staff ID is system-assigned</p>
          </div>

          <div className="border-2 border-[#900021] rounded-lg p-4 bg-blue-50">
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="orcidId" className="text-base font-semibold text-[#900021]">
                ORCID Identifier
              </Label>
              <span className="text-xs bg-[#900021] text-white px-2 py-0.5 rounded">
                Required for Research Activities
              </span>
            </div>

            <Input
              id="orcidId"
              value={orcidId}
              onChange={(e) => handleORCIDChange(e.target.value)}
              onBlur={(e) => {
                if (e.target.value) {
                  setOrcidId(formatORCID(e.target.value));
                }
              }}
              placeholder="0000-0002-1234-5678"
              className={`mt-2 ${
                orcidError
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : orcidId && isOrcidValid
                  ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                  : ''
              }`}
              maxLength={19}
            />

            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-600">
                Enter your 16-digit ORCID researcher identification number
              </p>

              {orcidError && (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm font-medium">{orcidError}</p>
                </div>
              )}

              {orcidId && isOrcidValid && !orcidError && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <p className="text-sm font-medium">Valid ORCID format</p>
                </div>
              )}

              <div className="mt-3 p-3 bg-white rounded border border-blue-200">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Don&apos;t have an ORCID?
                </p>
                <a
                  href="https://orcid.org/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#900021] hover:underline"
                >
                  Register for free at orcid.org →
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleSave}
              disabled={!isFormValid()}
              className={`w-full ${
                isFormValid()
                  ? 'bg-[#900021] hover:bg-[#5C001F]'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {isFormValid() ? 'Save Profile' : 'Complete Required Fields'}
            </Button>

            {!isFormValid() && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                {orcidError
                  ? 'Please fix ORCID validation errors'
                  : 'Fill in all required fields to enable saving'}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
