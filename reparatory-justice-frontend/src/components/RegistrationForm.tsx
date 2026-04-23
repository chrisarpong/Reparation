"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fetchApi } from '@/lib/apiClient';
import { Turnstile } from '@marsidev/react-turnstile';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('RegistrationForm');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Notice we extract `trigger` here to validate specific fields before moving to Step 2
  const { register, handleSubmit, trigger, formState: { errors } } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      diaspora_affiliation: false,
      consent_given: false,
    }
  });

  // Validates Step 1 before allowing the user to proceed
  const handleNextStep = async () => {
    const isStep1Valid = await trigger(['first_name', 'last_name', 'email', 'phone']);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      // API call to the Django Backend
      await fetchApi('/registrations/', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          cf_turnstile_response: captchaToken
        }),
      });

      setSuccess(true);
    } catch (error: any) {
      setServerError(error.message || 'An unexpected error occurred during registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white";
  const labelStyles = "text-sm font-semibold text-[#051121]";

  // -------------------------------------------------------------
  // SUCCESS STATE
  // -------------------------------------------------------------
  if (success) {
    return (
      <div className="p-10 mx-auto bg-green-50 border border-green-200 rounded-xl text-center">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h2 className="text-3xl font-bold text-green-800 mb-3">{t('success_title')}</h2>
        <p className="text-green-700 text-lg">{t('success_desc')}</p>
      </div>
    );
  }

  // -------------------------------------------------------------
  // FORM STATE
  // -------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
      
      {serverError && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md mb-6">
          <div className="flex">
            <svg className="h-5 w-5 text-red-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="ml-3 text-sm text-red-700 font-medium">{serverError}</p>
          </div>
        </div>
      )}

      {/* --- PROGRESS INDICATOR --- */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
          <span className={step === 1 ? "text-orange-500" : "text-slate-400"}>{t('step_1')}</span>
          <span className={step === 2 ? "text-orange-500" : "text-slate-400"}>{t('step_2')}</span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
          <div className={`h-full bg-orange-500 transition-all duration-500 ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
        </div>
      </div>

      {/* ==========================================
          STEP 1: PERSONAL INFORMATION 
          ========================================== */}
      <div className={`transition-opacity duration-300 ${step === 1 ? 'block opacity-100' : 'hidden opacity-0 absolute pointer-events-none'}`}>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className={labelStyles}>{t('first_name_label')}</label>
              <input type="text" {...register('first_name')} placeholder={t('first_name_placeholder')} className={inputStyles} />
              {errors.first_name && <p className="text-xs text-red-500 font-medium">{errors.first_name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className={labelStyles}>{t('last_name_label')}</label>
              <input type="text" {...register('last_name')} placeholder={t('last_name_placeholder')} className={inputStyles} />
              {errors.last_name && <p className="text-xs text-red-500 font-medium">{errors.last_name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className={labelStyles}>{t('email_label')}</label>
              <input type="email" {...register('email')} placeholder={t('email_placeholder')} className={inputStyles} />
              {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className={labelStyles}>{t('phone_label')}</label>
              <input type="tel" {...register('phone')} placeholder={t('phone_placeholder')} className={inputStyles} />
              {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>}
            </div>

          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="button" 
            onClick={handleNextStep}
            className="bg-[#051121] hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-lg shadow-lg transition-all flex items-center gap-2"
          >
            {t('continue_btn')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* ==========================================
          STEP 2: OFFICIAL CREDENTIALS 
          ========================================== */}
      <div className={`transition-opacity duration-300 ${step === 2 ? 'block opacity-100' : 'hidden opacity-0 absolute pointer-events-none'}`}>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-6">
          <div className="space-y-6">
            
            <div className="space-y-2">
              <label className={labelStyles}>{t('category_label')}</label>
              <select {...register('registration_type')} className={inputStyles}>
                <option value="">{t('category_placeholder')}</option>
                <option value="HEAD_OF_STATE">{t('cat_head_of_state')}</option>
                <option value="MINISTER">{t('cat_minister')}</option>
                <option value="DIPLOMATIC_MISSION">{t('cat_diplomatic')}</option>
                <option value="MULTILATERAL_ORG">{t('cat_multilateral')}</option>
                <option value="DIASPORA_ORGANISATION">{t('cat_diaspora')}</option>
                <option value="ACADEMIC">{t('cat_academic')}</option>
                <option value="MEDIA">{t('cat_media')}</option>
                <option value="OBSERVER">{t('cat_observer')}</option>
              </select>
              {errors.registration_type && <p className="text-xs text-red-500 font-medium">{errors.registration_type.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={labelStyles}>{t('country_label')}</label>
                <input type="text" {...register('country_residence')} placeholder={t('country_placeholder')} className={inputStyles} />
                {errors.country_residence && <p className="text-xs text-red-500 font-medium">{errors.country_residence.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label className={labelStyles}>{t('nationality_label')}</label>
                <input type="text" {...register('nationality')} placeholder={t('nationality_placeholder')} className={inputStyles} />
              </div>
              
              <div className="space-y-2">
                <label className={labelStyles}>{t('org_label')}</label>
                <input type="text" {...register('organisation')} placeholder={t('org_placeholder')} className={inputStyles} />
              </div>
              
              <div className="space-y-2">
                <label className={labelStyles}>{t('desig_label')}</label>
                <input type="text" {...register('designation')} placeholder={t('desig_placeholder')} className={inputStyles} />
              </div>
            </div>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="bg-blue-50/50 p-5 rounded-lg border border-blue-100 mb-8 flex items-start gap-4">
          <input type="checkbox" id="consent" {...register('consent_given')} className="mt-1 w-4 h-4 rounded border-slate-300 text-[#051121] focus:ring-[#051121] cursor-pointer" />
          <div className="text-xs text-slate-600 leading-relaxed">
            <label htmlFor="consent" className="font-bold text-[#051121] block mb-1 cursor-pointer">{t('consent_title')}</label>
            {t('consent_desc')}
            {errors.consent_given && <p className="text-xs text-red-500 font-medium mt-1">{errors.consent_given.message}</p>}
          </div>
        </div>

        {/* --- HUMAN VERIFICATION (Turnstile) --- */}
        <div className="mb-8 flex justify-center">
          <Turnstile 
            siteKey="1x00000000000000000000AA" // Cloudflare's official testing key
            onSuccess={(token) => setCaptchaToken(token)}
            onError={() => setCaptchaToken(null)}
            options={{ theme: 'light' }}
          />
        </div>

        {/* Step 2 Buttons */}
        <div className="flex justify-between items-center">
          <button 
            type="button" 
            onClick={() => setStep(1)}
            className="text-slate-500 hover:text-[#051121] font-semibold px-4 py-2 transition-colors flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {t('back_btn')}
          </button>
          
          <button 
            type="submit" 
            disabled={isSubmitting || !captchaToken} // Button locks if no captcha token!
            className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-3.5 rounded-lg shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('processing_btn')}
              </span>
            ) : (
              t('submit_btn')
            )}
          </button>
        </div>
      </div>

    </form>
  );
}