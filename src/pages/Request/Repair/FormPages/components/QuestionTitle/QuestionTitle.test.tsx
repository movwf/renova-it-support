import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuestionTitle from '.';

describe('QuestionTitle Component', () => {
  test('should be rendered', () => {
    render(<QuestionTitle title="Test Title" description="Test Description" />);

    expect(screen.getByTestId('question-title')).toBeInTheDocument();
  });
});
