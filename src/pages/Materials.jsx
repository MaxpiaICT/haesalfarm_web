import React, { useState } from 'react'
import MaterialsHero from '../components/Materials/MaterialsHero'
import MaterialsCategoryTabs from '../components/Materials/MaterialsCategoryTabs'
import MaterialsGrid from '../components/Materials/MaterialsGrid'
import MaterialsBulkCTA from '../components/Materials/MaterialsBulkCTA'

export default function Materials() {
  const [activeCategory, setActiveCategory] = useState('전체')

  return (
    <>
      <MaterialsHero />

      <MaterialsCategoryTabs
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      <MaterialsGrid activeCategory={activeCategory} />

      <MaterialsBulkCTA />
    </>
  )
}

