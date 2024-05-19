"use client"

import { ChangeEvent } from "react"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { ProductTag } from "@medusajs/medusa"

type FilterProductsProps = {
  tagsOptions: ProductTag[]
  activeTags?: string
  setQueryParams: (name: string, value: string) => void
}

const FilterProducts = ({
  tagsOptions,
  activeTags,
  setQueryParams,
}: FilterProductsProps) => {
  const handleChange = (e: ChangeEvent<HTMLButtonElement>) => {
    const newFilterBy = e.target.value
    setQueryParams("filterBy", newFilterBy)
  }
  const filterItems = tagsOptions.map((tag) => ({
    value: tag.id,
    label: tag.value,
  }))

  return (
    <FilterRadioGroup
      title="Filter by"
      items={filterItems}
      value={activeTags}
      handleChange={handleChange}
    />
  )
}

export default FilterProducts
