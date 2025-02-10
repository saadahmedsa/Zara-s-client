"use client"
import React from 'react'
import { filterOptions } from '../../config'
import { Label } from '../ui/label'
import {Checkbox} from '../ui/checkbox'

const Filter = ({filter,handlefilter}) => {
  return (
    <div className='bg-background rounded-lg shadow-sm'>
      <div className='p-4 border-b'>
        <h1 className='text-xl font-bold'>Filter Products</h1>
      </div>
      <div className="p-4 space-y-4 border-b">
        {Object.keys(filterOptions).map((keyItem,index) => (
            <div className='border-b pb-2'  key={index}>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label className="flex font-medium items-center gap-2" key={option.label}>
                    <Checkbox 
                      checked={
                        filter &&
                        Object.keys(filter).length > 0 &&
                        filter[keyItem] &&
                        filter[keyItem].indexOf(option.id) > -1
                      } onCheckedChange={()=>handlefilter(keyItem,option.id)}                  />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Filter
