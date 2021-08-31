import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Loading, Modal, Select, SelectItem, TextArea } from 'carbon-components-react';

import { getRequestData, updateRequest } from '../../../queries/requestQueries';
import { IEditModal } from '../../../types/components/RequestTable.types';
import { StatusStates } from '../../../configs/settings';
import ValueText from '../../ValueText';
import styles from './EditModal.module.css';

interface IFormState {
  status?: string;
  store_id?: string;
  service_note?: string;
}

function EditModal({ open, show, id }: IEditModal) {
  const [formData, setFormData] = React.useState<IFormState>({});
  const [updateRequestStatus] = useMutation(updateRequest);
  const { loading, data } = useQuery(getRequestData, {
    variables: {
      request_id: id,
    },
  });

  // RHF & Yup didn't work
  const saveFormData = (inputId: string, value: any) => {
    setFormData((prevFormData) => Object.assign(prevFormData, { [inputId]: value }));
  };

  const handleClose = () => {
    show(!open);
  };

  const handleUpdate = () => {
    // Update request data then close modal
    updateRequestStatus({
      variables: {
        request_id: id,
        status: formData?.status || data?.requests?.[0].status,
        store_id: formData?.store_id || data?.requests?.[0].store_id,
        service_note: formData?.service_note || data?.requests?.[0].service_note,
      },
    }).then((requestData: any) => {
      console.log(requestData);
      // Close modal
      show(!open);
    });
  };

  if (loading) return <Loading data-testid="edit-modal-loading" />;

  return (
    <Modal
      open={open}
      modalHeading="Edit Request"
      modalLabel="Request Information"
      primaryButtonText="Update"
      secondaryButtonText="Cancel"
      onRequestClose={() => handleClose()}
      onRequestSubmit={() => handleUpdate()}
      data-testid="edit-modal"
    >
      <ValueText
        propertyText="Request ID"
        propertyWidth="105px"
        valueText={data?.requests?.[0].request_id}
        style={{ marginBottom: '10px' }}
      />
      <ValueText
        propertyText="Customer"
        propertyWidth="105px"
        valueText={data?.requests?.[0].customer.name}
        style={{ marginBottom: '10px' }}
      />
      <ValueText
        propertyText="Product"
        propertyWidth="105px"
        valueText={data?.requests?.[0].product.product_name}
        style={{ marginBottom: '10px' }}
      />
      <ValueText
        propertyText="Serial No"
        propertyWidth="105px"
        valueText={data?.requests?.[0].serial_number}
        style={{ marginBottom: '10px' }}
      />
      <ValueText
        propertyText="Created"
        propertyWidth="105px"
        valueText={data?.requests?.[0].created_At}
        style={{ marginBottom: '10px' }}
      />
      <ValueText
        propertyText="Mail"
        propertyWidth="105px"
        valueText={data?.requests?.[0].customer.email}
        style={{ marginBottom: '10px' }}
      />
      <ValueText propertyText="Images" propertyWidth="105px" style={{ marginBottom: '10px' }}>
        <span className={styles.Value}>
          {data?.requests?.[0].image_urls.map((url: string, index: number) => (
            <a key={`${index.toString()}-url`} href={url}>{`Picture-${index + 1}`}</a>
          ))}
        </span>
      </ValueText>
      <ValueText
        propertyText="Problem"
        propertyWidth="105px"
        valueText={data?.requests?.[0].problem}
        style={{ marginBottom: '10px' }}
      />
      <Select
        id="status"
        defaultValue={data?.requests?.[0].status}
        labelText="Status"
        onChange={(event: any) => saveFormData('status', event.target.value)}
        data-testid="edit-modal-status-select"
      >
        <SelectItem value="inRequest" text={StatusStates.inRequest} />
        <SelectItem value="inRepair" text={StatusStates.inRepair} />
        <SelectItem value="repaired" text={StatusStates.repaired} />
        <SelectItem value="refurbished" text={StatusStates.refurbished} />
        <SelectItem value="inTransit" text={StatusStates.inTransit} />
      </Select>
      <Select
        id="store_id"
        defaultValue={data?.requests?.[0].store_id}
        labelText="Store"
        onChange={(event: any) => saveFormData('store_id', event.target.value)}
        data-testid="edit-modal-store-id-input"
      >
        <SelectItem value="01" text="Uskudar - 01" />
        <SelectItem value="02" text="Sisli - 02" />
      </Select>
      <TextArea
        data-modal-primary-focus
        id="service_note"
        labelText="Service Note"
        defaultValue={data?.requests?.[0].service_note}
        onChange={(event: any) => saveFormData('service_note', event.target.value)}
        data-testid="edit-modal-service-note-input"
      />
    </Modal>
  );
}

export default EditModal;
