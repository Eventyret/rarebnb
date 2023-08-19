"use client"
import useCountries from '@/hooks/useCountries';
import { SafeUser } from '@/types';
import { Listing, Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}
const ListingCard: React.FC<ListingCardProps> = ({ data, reservation, onAction, disabled, actionLabel, actionId = "", currentUser }) => {
  const router = useRouter()
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;

      onAction?.(actionId)
    },
    [onAction, disabled, actionId],
  )
  return (
    <div>

    </div>
  );
}

export default ListingCard;