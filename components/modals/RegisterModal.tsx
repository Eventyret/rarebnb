"use client"
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import useRegisterModal from '@/hooks/useRegisterModal';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    try {
      const response = fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }).then(() => registerModal.onClose())
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
    setIsLoading(false)
  }
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register' actionLabel='Continue' onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} />
  );
}

export default RegisterModal;