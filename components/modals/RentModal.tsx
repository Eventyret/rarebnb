"use client"
import { useMemo, useState } from 'react';

import useRentModal from '@/hooks/useRentModal';
import { CATEGORIES } from '@/lib/categories';
import Heading from '../Heading';
import Modal from './Modal';
import CategoryInput from '../inputs/CategoryInput';

const RentModal = () => {
  enum STEP {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
  }
  const rentModal = useRentModal();
  const [step, setStep] = useState<STEP>(STEP.CATEGORY);

  const actionLabel = useMemo(() => {
    if (step === STEP.PRICE) return 'Create';
    return "Next"
  }, [step, STEP.PRICE])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEP.CATEGORY) return undefined
    return "Back"
  }, [STEP.CATEGORY, step])
  const onBack = () => {
    setStep(value => value - 1)
  }
  const onNext = () => {
    setStep(value => value + 1)
  }

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading title='Which of these best describes your place?' subtitle='Pick a category' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {CATEGORIES.map((category) => (
          <div key={category.label} className='col-span-1'>
            <CategoryInput onClick={() => { }} selected={false} label={category.label} icon={category.icon} />
          </div>
        ))
        }
      </div>
    </div>
  )

  return (
    <Modal
      title='Rarebnb your home!'
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel} secondaryAction={step === STEP.CATEGORY ? undefined : onBack}
      body={bodyContent} />
  );
}

export default RentModal;