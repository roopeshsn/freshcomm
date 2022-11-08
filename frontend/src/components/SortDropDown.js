import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sortProductsBy } from '../actions/productActions'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export const SortDropDown = () => {
  const dispatch = useDispatch()

  const [sortLabel, setSortLabel] = useState('Relevance')

  const handleSort = (e) => {
    dispatch(sortProductsBy(e))
    setSortLabel(e)
  }

  return (
    <DropdownButton
      align="end"
      size="sm"
      id="dropdown-item-button"
      title={'Sort By - ' + sortLabel}
      onSelect={handleSort}
    >
      <Dropdown.Item as="button" eventKey="A-Z">
        Sort By - A-Z
      </Dropdown.Item>
      <Dropdown.Item as="button" eventKey="Z-A">
        Sort By - Z-A
      </Dropdown.Item>
      <Dropdown.Item as="button" eventKey="Price (low to high)">
        Sort By - Price (low to high)
      </Dropdown.Item>
      <Dropdown.Item as="button" eventKey="Price (high to low)">
        Sort By - Price (high to low)
      </Dropdown.Item>
    </DropdownButton>
  )
}
