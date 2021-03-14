import {FormattedMessage} from 'react-intl'

export const useHeaders = (remove) => [
    {
        // expander cell
        Header: <FormattedMessage id="table.edit" />, // No header
        id: "expander", 
        Cell: ({ row, rows }) => (
          <span
            {...row.getToggleRowExpandedProps({
              onClick: () => { //allows only one expanded row at a time
                const expandedRow = rows.find(r => r.isExpanded)
                if(expandedRow){
                  if(expandedRow.id !== row.id){
                    expandedRow.toggleRowExpanded(false)
                  }
                }
                row.toggleRowExpanded()
              },
            })}
          >
            {row.isExpanded ? "-" : "+"}
          </span>
        ),
        SubCell: () => null, 
      },
      {
        Header: <FormattedMessage id="table.delete" />,
        id: "delete",
        Cell: ({row}) => (
          <span onClick={() => remove(row.original._id)}>
            X
          </span>
        )
      }
]