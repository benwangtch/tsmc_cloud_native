import React, { useState, useEffect } from 'react';
import { Container, Form, Header } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditDocument = ({ match }) => {
  const [document, setDocument] = useState({
    title: '',
    content: '',
    type: 'private',
  });
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDocument();
    // eslint-disable-next-line
  }, []);

  const getDocument = async () => {
    try {
      const res = await axios.get(`/api/documents/${id}`);
      setDocument(res.data);
      setOriginalTitle(res.data.title);
      setOriginalContent(res.data.content);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const { title, content, type } = document;

  const onChange = e => {
    console.log(e.target.value);
    if (e.target.name === 'type') {
      setDocument({ ...document, type: e.target.value });
    } else {
      setDocument({ ...document, [e.target.name]: e.target.value });
    }
  };

  const typeOnChange = (e, { value }) => {
    setDocument({ ...document, type: value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`/api/documents/${id}`, document);

      // Add history record
      await axios.post('/api/histories', {
        documentId: id,
        title: originalTitle,
        content: originalContent,
        operation: 'Edit',
      });

      navigate(`/document/${id}`);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Container>
      <Header as='h1'>更改文章</Header>
      <Form onSubmit={onSubmit}>
        <Form.Input
          type='text'
          value={title}
          name='title'
          onChange={onChange}
        />
        <Form.TextArea
          // placeholder={post.content}
          name='content'
          value={content}
          onChange={onChange}
          rows={30}
        />
        <Form.Group inline>
          <label>Document Type</label>
          <Form.Radio
            label='private'
            value='private'
            name='type'
            checked={type === 'private'}
            onChange={typeOnChange}
          />
          <Form.Radio
            label='shared'
            value='shared'
            name='type'
            checked={type === 'shared'}
            onChange={typeOnChange}
          />
        </Form.Group>
        <Form.Button type='submit' value='Update Document'>
          送出更改
        </Form.Button>
      </Form>
    </Container>
    // <form onSubmit={onSubmit}>
    //   <h2>Edit Document</h2>
    //   <input
    //     type='text'
    //     placeholder='Title'
    //     name='title'
    //     value={title}
    //     onChange={onChange}
    //   />
    //   <input
    //     type='text'
    //     placeholder='Content'
    //     name='content'
    //     value={content}
    //     onChange={onChange}
    //   />
    //   <h5>Document Type</h5>
    //   <input
    //     type='radio'
    //     name='type'
    //     value='private'
    //     checked={type === 'private'}
    //     onChange={onChange}
    //   />{' '}
    //   Private{' '}
    //   <input
    //     type='radio'
    //     name='type'
    //     value='shared'
    //     checked={type === 'shared'}
    //     onChange={onChange}
    //   />{' '}
    //   Shared
    //   <div>
    //     <input type='submit' value='Update Document' />
    //   </div>
    // </form>
  );
};

export default EditDocument;
