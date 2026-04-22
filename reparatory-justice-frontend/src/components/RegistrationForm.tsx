"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fetchApi } from '@/lib/apiClient';

// Zod Schema representing the Django Registration Model
const registrationSchema = z.object({
  registration_type: z.enum([
    "HEAD_OF_STATE", "MINISTER", "DIPLOMATIC_MISSION", 
    "MULTILATERAL_ORG", "DIASPORA_ORGANISATION", 
    "ACADEMIC", "MEDIA", "OBSERVER"
  ], { required_error: "Please select a registration type." }),
  first_name: z.string().min(1, "First name is required.").max(150),
  last_name: z.string().min(1, "Last name is required.").max(150),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(1, "Phone number is required.").max(30),
  country_residence: z.string().min(1, "Country of residence is required.").max(150),
  nationality: z.string().max(150).optional(),
  organisation: z.string().max(255).optional(),
  designation: z.string().max(255).optional(),
  organisation_country: z.string().max(150).optional(),
  diaspora_affiliation: z.boolean().default(false),
  special_needs: z.string().optional(),
  dietary_restrictions: z.string().optional(),
  notes: z.string().optional(),
  consent_given: z.boolean().refine((val) => val === true, {
    message: "You must provide consent to register.",
  }),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      diaspora_affiliation: false,
      consent_given: false,
    }
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      // API call to the Django Backend
      await fetchApi('/registrations/', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      setSuccess(true);
    } catch (error: any) {
      setServerError(error.message || 'An unexpected error occurred during registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "block w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003865] focus:border-transparent transition-all duration-200";
  const labelStyles = "block text-sm font-bold text-gray-700 mb-2";

  if (success) {
    return (
      <div className="p-10 max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-xl shadow-lg text-center">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h2 className="text-3xl font-bold text-green-800 mb-3">Registration Submitted</h2>
        <p className="text-green-700 text-lg">Thank you. Your registration has been successfully received by the Ministry of Foreign Affairs.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-white p-8 md:p-10 shadow-xl rounded-2xl border border-gray-200">
      
      {/* Header Section inside form */}
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-gray-900">Delegate Information</h2>
        <p className="text-gray-500 mt-2 text-sm">Please fill out all required fields marked with an asterisk (*).</p>
      </div>

      {serverError && (
        <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 font-medium">{serverError}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyles}>First Name *</label>
            <input {...register('first_name')} className={inputStyles} placeholder="Enter your first name" />
            {errors.first_name && <p className="mt-2 text-sm text-red-500 font-medium">{errors.first_name.message}</p>}
          </div>
          <div>
            <label className={labelStyles}>Last Name *</label>
            <input {...register('last_name')} className={inputStyles} placeholder="Enter your last name" />
            {errors.last_name && <p className="mt-2 text-sm text-red-500 font-medium">{errors.last_name.message}</p>}
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyles}>Email Address *</label>
            <input type="email" {...register('email')} className={inputStyles} placeholder="you@example.com" />
            {errors.email && <p className="mt-2 text-sm text-red-500 font-medium">{errors.email.message}</p>}
          </div>
          <div>
            <label className={labelStyles}>Phone Number *</label>
            <input type="tel" {...register('phone')} className={inputStyles} placeholder="+1 (555) 000-0000" />
            {errors.phone && <p className="mt-2 text-sm text-red-500 font-medium">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Registration Type */}
        <div>
          <label className={labelStyles}>Registration Category *</label>
          <div className="relative">
            <select {...register('registration_type')} className={`${inputStyles} appearance-none cursor-pointer`}>
              <option value="">Select an official category...</option>
              <option value="HEAD_OF_STATE">Head of State / Former Head of State</option>
              <option value="MINISTER">Minister / Deputy Minister</option>
              <option value="DIPLOMATIC_MISSION">Diplomatic Mission</option>
              <option value="MULTILATERAL_ORG">Multilateral Organisation</option>
              <option value="DIASPORA_ORGANISATION">Diaspora Organisation</option>
              <option value="ACADEMIC">Academic / Researcher</option>
              <option value="MEDIA">Media</option>
              <option value="OBSERVER">Observer / General Participant</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          {errors.registration_type && <p className="mt-2 text-sm text-red-500 font-medium">{errors.registration_type.message}</p>}
        </div>

        {/* Location Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyles}>Country of Residence *</label>
            <input {...register('country_residence')} className={inputStyles} placeholder="e.g. Ghana" />
            {errors.country_residence && <p className="mt-2 text-sm text-red-500 font-medium">{errors.country_residence.message}</p>}
          </div>
          <div>
            <label className={labelStyles}>Nationality</label>
            <input {...register('nationality')} className={inputStyles} placeholder="e.g. Ghanaian" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyles}>Organisation (Optional)</label>
            <input {...register('organisation')} className={inputStyles} placeholder="Name of your organisation" />
          </div>
          <div>
            <label className={labelStyles}>Designation (Optional)</label>
            <input {...register('designation')} className={inputStyles} placeholder="Your official title" />
          </div>
        </div>

        {/* Consent Section */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex items-start bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div className="flex h-6 items-center">
              <input 
                id="consent" 
                type="checkbox" 
                {...register('consent_given')} 
                className="h-5 w-5 rounded border-gray-300 text-[#003865] focus:ring-[#003865] cursor-pointer transition-colors" 
              />
            </div>
            <div className="ml-4 text-sm">
              <label htmlFor="consent" className="font-bold text-gray-900 cursor-pointer">Official Data Processing Consent *</label>
              <p className="text-gray-600 mt-1 leading-relaxed">By checking this box, I formally consent to the Ministry of Foreign Affairs processing my submitted data for the sole purpose of managing registration and logistics for the Global Reparatory Justice Programme.</p>
              {errors.consent_given && <p className="mt-2 text-sm text-red-500 font-medium">{errors.consent_given.message}</p>}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full flex justify-center py-4 px-6 rounded-xl shadow-lg text-lg font-bold text-white bg-[#003865] hover:bg-[#002140] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003865] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transition-all duration-300"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Registration...
              </span>
            ) : (
              'Submit Official Registration'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
