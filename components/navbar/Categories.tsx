"use client"

import { CATEGORIES } from '@/lib/categories'
import { usePathname, useSearchParams } from 'next/navigation'
import Container from '../Container'
import CategoryBox from './CategoryBox'


const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()

  const isMainPage = pathname === '/'
  if (!isMainPage) return null



  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {CATEGORIES.map((item, index) => (
          <CategoryBox key={index} label={item.label} selected={category === item.label} icon={item.icon} />
        ))}
      </div>
    </Container>
  );
}

export default Categories;