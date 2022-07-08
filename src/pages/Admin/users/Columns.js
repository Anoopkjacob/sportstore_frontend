import React from 'react'
import ActionButton from './ActionButton'
import LicenceImage from './LicenceImage'

export const CustomerCOLUMNS=[
    {
        Header:'Name',
        accessor:'name'
    },
    {
        Header:'Email',
        accessor:'email'
    },
    {
        Header:'Phone',
        accessor:'phone'
    },
    {
        Header:'Address',
        accessor:'address'
    },
    {
        Header:'usertype',
        accessor:'usetype'
    },
    {
        Header:'status',
        accessor:'status'
    },
    {
        Header: "Activate/deactivate",
        accessor: "id",
        Cell: ({ row }) => (
          <ActionButton Rows={row}/>        
        )
      }
]

export const StaffCOLUMNS=[
    {
        Header:'Name',
        accessor:'name'
    },
    {
        Header:'Email',
        accessor:'email'
    },
    {
        Header:'Phone',
        accessor:'phone'
    },
    {
        Header:'Address',
        accessor:'address'
    },
    {
        Header:'AADHAAR',
        Cell: ({ row}) => (
          <LicenceImage Rows={row} />)
    },
    {
        Header:'usertype',
        accessor:'usetype'
    },
    {
        Header:'status',
        accessor:'status'
    },
    {
        Header: "Activate/deactivate",
        accessor: "id",
        Cell: ({ row }) => (
          <ActionButton Rows={row}/>        
        )
      }
]

export const SupplierCOLUMNS=[
    {
        Header:'Name',
        accessor:'name'
    },
    {
        Header:'Email',
        accessor:'email'
    },
    {
        Header:'Phone',
        accessor:'phone'
    },
    {
        Header:'companyname',
        accessor:'companyname'
    },
    {
        Header:'badge',
        accessor:'badge'
    },
    {
        Header:'branch',
        accessor:'branch'
    },
    {
        Header:'Licence',
        Cell: ({ row}) => (
          <LicenceImage Rows={row} />)
    },
    {
        Header:'usertype',
        accessor:'usetype'
    },
    {
        Header:'status',
        accessor:'status'
    },
    {
        Header: "Activate/deactivate",
        accessor: "id",
        Cell: ({ row }) => (
          <ActionButton Rows={row}/>        
        )
      }
]

export const DeliveryCOLUMNS=[
    {
        Header:'Name',
        accessor:'name'
    },
    {
        Header:'Email',
        accessor:'email'
    },
    {
        Header:'Phone',
        accessor:'phone'
    },
    {
        Header:'Address',
        accessor:'address'
    },
    {
        Header:'AADHAAR',
        Cell: ({ row}) => (
          <LicenceImage Rows={row} />)
    },
    {
        Header:'usertype',
        accessor:'usetype'
    },
    {
        Header:'status',
        accessor:'status'
    },
    {
        Header: "Activate/deactivate",
        accessor: "id",
        Cell: ({ row }) => (
          <ActionButton Rows={row}/>        
        )
      }
]