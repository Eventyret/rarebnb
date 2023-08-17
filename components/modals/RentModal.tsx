"use client"
import { useMemo, useState } from 'react';

import useRentModal from '@/hooks/useRentModal';
import { CATEGORIES } from '@/lib/categories';
import Heading from '../Heading';
import Modal from './Modal';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';

const RentModal = () => {
  enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
  }
  const rentModal = useRentModal();
  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);

  const { register, handleSubmit, setValue, watch, formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  });
  const category = watch('category');
  const location = watch('location');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location])

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return 'Create';
    return "Next"
  }, [step, STEPS.PRICE])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined
    return "Back"
  }, [STEPS.CATEGORY, step])

  const onBack = () => {
    setStep(value => value - 1)
  }
  const onNext = () => {
    setStep(value => value + 1)
  }


  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {CATEGORIES.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) =>
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title="Share some basics about your place"
          subtitle='What amenities can guests expect?'
        />
        <Counter title={"Number of guests"} subtitle={"How many guests"} />
      </div>
    )
  }


  return (
    <Modal
      title='Rarebnb your home!'
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel} secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent} />
  );
}

export default RentModal;