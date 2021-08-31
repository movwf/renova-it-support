import React from 'react';
import { Column, Row } from 'carbon-components-react';
import styles from '../Admin.module.css';
import CountsBox from '../../../components/CountsBox';
import { IAllRequests } from '../../../types/queries/requestQueries.types';
import { IListedCount, ISpreadCounts } from '../../../types/pages/Admin.types';

export interface ICountsStrip {
  data: {
    requests: IAllRequests[];
  };
}

export const listedCounts = [
  {
    id: 'totalCount',
    title: 'Total Requests',
  },
  {
    id: 'resolved',
    title: 'Requests Resolved',
  },
  {
    id: 'inRepair',
    title: 'In Repair',
  },
  {
    id: 'inRequest',
    title: 'In Request',
  },
];

function CountsStrip({ data }: ICountsStrip) {
  const getCount = (requestArr: Array<any>, statusId: string) =>
    requestArr.filter((req) => req.status === statusId).length;

  const spreadCounts: ISpreadCounts = {
    inRequest: getCount(data.requests, 'inRequest'),
    inRepair: getCount(data.requests, 'inRepair'),
    totalCount: data.requests.length,
    resolved:
      data.requests.length -
      (getCount(data.requests, 'inRequest') + getCount(data.requests, 'inRepair')),
  };

  return (
    <Row>
      <Column className={styles.CountsStrip} data-testid="counts-strip">
        {listedCounts.map((count: IListedCount) => (
          <CountsBox
            key={count.id}
            title={count.title}
            height="120px"
            width="120px"
            count={spreadCounts[count.id]}
          />
        ))}
      </Column>
    </Row>
  );
}

export default CountsStrip;
