import React from 'react';
import PropTypes from 'prop-types';
import { WithContext as ReactTags } from 'react-tag-input';
import { TagStyles } from '../../../../assets/styles/products/addProductStyles';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagInput = (props) => {
  const { tags, handleAddition, handleDelete } = props;
  return (
    <div
      style={TagStyles.container}
      className="tags-container"
    >
      <ReactTags
        inputFieldPosition="inline"
        name="tags"
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        delimiters={delimiters}
      />
    </div>
  );
};

TagInput.propTypes = {
  tags: PropTypes.arrayOf(Object).isRequired,
  handleAddition: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default TagInput;
