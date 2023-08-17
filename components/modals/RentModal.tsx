"use client"
import { useMemo, useState } from 'react';

import useRentModal from '@/hooks/useRentModal';
import Modal from './Modal';

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

  return (
    <Modal title='Rarebnb your home!' isOpen={rentModal.isOpen} onClose={rentModal.onClose} onSubmit={rentModal.onClose} actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel} secondaryAction={step === STEP.CATEGORY ? undefined : onBack} />
  );
}

export default RentModal;