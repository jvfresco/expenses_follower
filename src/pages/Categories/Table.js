/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import {useTable, useExpanded} from 'react-table'
import React from 'react'
const Table = ({columns, data, renderRowSubComponent}) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data },useExpanded);
  
    return data.length > 0 ? (
      <table {...getTableProps()} css={{width: '100%', textAlign: 'left',  borderSpacing: '0 .5rem'}}>
        <thead>
          {
            headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} css={{fontSize: '1.6rem', paddingBottom: '2rem'}}>
                      {
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map((row) => {
              prepareRow(row);
              return (
                <React.Fragment>
                  <tr {...row.getRowProps()} css={{
      
                    '&:nth-child(even)':{
                      backgroundColor: 'var(--colors-table-row-even)',
                      color: 'var(--colors-table-dark-text)'
                    },
                    '&:nth-child(odd)':{
                      backgroundColor: 'var(--colors-table-row-odd)'
                    }
                  }}>
                    {
                      row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()} css={{
                            padding: '.5rem 1rem',
                            fontWeight: '600',
                            fontSize: '1.2rem', 
                          }}>
                            {
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                  
                  {row.isExpanded ?
                  <tr>
                    <td colSpan={columns.length}>
                      {renderRowSubComponent(row.original._id)}
                    </td>
                  </tr>
                  : null}
                </React.Fragment>
              );
            })
          }
        </tbody>
      </table>
    ) 
    : null
}

export default Table