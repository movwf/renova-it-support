import React from 'react';
import { Column, FileUploader, Row, TextArea } from 'carbon-components-react';
import styles from './Problem.module.css';
import QuestionTitle from '../components/QuestionTitle';
import { FormContext } from '../../../../../contexts/FormContext';
import { uploadImage } from '../../../../../services/cloudinary';

function Problem() {
  const { forms } = React.useContext(FormContext);
  const {
    register,
    formState: { errors },
  } = forms.problem;

  return (
    <Column data-testid="problem-page">
      <QuestionTitle title="Problem" description="Plese describe your problem briefly." />
      <Row>
        <Column>
          <TextArea
            id="problem"
            labelText="Your problem"
            placeholder="Write your problem here.."
            minLength={20}
            maxLength={500}
            invalid={!!errors?.problem}
            invalidText={errors?.problem?.message}
            {...register('problem')}
          />
        </Column>
      </Row>
      <Row className={styles.Uploader}>
        <Column>
          <FileUploader
            accept={['.jpg', '.png']}
            name="image-upload"
            multiple
            buttonKind="primary"
            buttonLabel="Add files"
            filenameStatus="edit"
            iconDescription="Clear file"
            labelDescription="Only .jpg and .png files. 500kb max file size."
            labelTitle="Problem Images"
            data-testid="file-uploader"
            onChange={(e) => {
              // If only files selected
              if (e.target.files) {
                uploadImage(e.target.files).then((data) => {
                  // Register images field with image urls array
                  register('images', { value: data });
                });
              }
            }}
          />
        </Column>
      </Row>
    </Column>
  );
}

export default Problem;
