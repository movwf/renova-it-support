// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Column,
  DataTable,
  Row,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} from 'carbon-components-react';
import { IRequestTable } from '../../types/components/RequestTable.types';
import { APP_PORTAL_NODE, StatusColors, StatusStates } from '../../configs/settings';

import EditModal from './EditModal';
import styles from './RequestTable.module.css';

export const headerData = [
  {
    key: 'id',
    header: 'No.',
  },
  {
    key: 'product',
    header: 'Product',
  },
  {
    key: 'requestId',
    header: 'Request ID',
  },
  {
    key: 'time',
    header: 'Time',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

function RequestTable({ rowData }: IRequestTable) {
  return (
    <Row className={styles.RequestTable} data-testid="request-table">
      <Column>
        <DataTable rows={rowData} headers={headerData} isSortable>
          {({ rows, headers, getHeaderProps, getTableProps }) => (
            <TableContainer>
              <Table {...getTableProps()} useZebraStyles size="compact">
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} data-testid={`request-table-row-${row.id}`}>
                      {row.cells.map((cell) => {
                        // Colorize status text
                        if (cell.id.includes(':status')) {
                          return (
                            <TableCell
                              key={cell.id}
                              style={{
                                color: `${StatusColors[cell.value]}`,
                              }}
                            >
                              {StatusStates[cell.value]}
                            </TableCell>
                          );
                        }
                        return <TableCell key={cell.id}>{cell.value}</TableCell>;
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
      </Column>
    </Row>
  );
}

function Admin({ rowData }: IRequestTable) {
  const [open, showEditModal] = React.useState(false);
  const [selectedRequest, setSelectedRequest] = React.useState<String | null>(null);

  const handleShowRequest = (row: any = { cells: [] }) => {
    const { cells } = row;
    const requestId = cells.filter(({ id }) => id === `${row.id}:requestId`)[0].value; // Select request id

    setSelectedRequest(requestId);
    showEditModal(true);
  };

  return (
    <>
      <Row className={styles.RequestTable} data-testid="request-table">
        <Column>
          <DataTable rows={rowData} headers={headerData} isSortable>
            {({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getBatchActionProps,
              onInputChange,
            }) => (
              <TableContainer title="Support Requests">
                <TableToolbar>
                  <TableToolbarContent>
                    <TableToolbarSearch
                      tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                      onChange={onInputChange}
                      data-testid="request-table-search"
                    />
                  </TableToolbarContent>
                </TableToolbar>
                <Table useZebraStyles>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        {...getRowProps({ row })}
                        className={styles.Row}
                        onClick={() => handleShowRequest(row)}
                        data-testid={`request-table-row-${row.id}`}
                      >
                        {row.cells.map((cell) => {
                          // Colorize status text
                          if (cell.id.includes(':status')) {
                            return (
                              <TableCell
                                key={cell.id}
                                style={{
                                  color: `${StatusColors[cell.value]}`,
                                }}
                              >
                                {StatusStates[cell.value]}
                              </TableCell>
                            );
                          }
                          return <TableCell key={cell.id}>{cell.value}</TableCell>;
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
        </Column>
      </Row>
      {/* Request editing modal */}
      {open &&
        ReactDOM.createPortal(
          <EditModal {...{ open, show: showEditModal, id: selectedRequest }} />,
          document.getElementById(APP_PORTAL_NODE)
        )}
    </>
  );
}

RequestTable.Admin = Admin;

export default RequestTable;
